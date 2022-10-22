import { get_entity_from_coord, lookup_coord_from_side_and_prof, set_entity_in_coord } from "./board";
import { coordEq, Coordinate, displayCoord, isShogiProfession, LeftmostWhenSeenFrom, PiecePhaseMove, PiecePhasePlayed, professionFullName, ResolvedGameState, RightmostWhenSeenFrom, ShogiProfession, Side } from "./type"

/** 駒を打つ。手駒から将棋駒を盤上に移動させる。
 * 
 */
function parachute(old: ResolvedGameState, o: { side: Side, prof: ShogiProfession, to: Coordinate }): PiecePhasePlayed {
    if (get_entity_from_coord(old.board, o.to)) {
        throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}打とのことですが、${displayCoord(o.to)}マスは既に埋まっています`);
    }
    const hand = old[o.side === "白" ? "hand_of_white" : "hand_of_black"];
    set_entity_in_coord(old.board, o.to, { type: "しょ", side: o.side, prof: o.prof, can_kumal: false });
    const index = hand.findIndex(prof => prof === o.prof);
    hand.splice(index, 1);
    return {
        phase: "piece_phase_played",
        hand_of_black: old.hand_of_black,
        hand_of_white: old.hand_of_white,
        by_whom: old.who_goes_next,
        board: old.board
    }
}

/**
 * Resolved な状態に駒フェイズを適用。省略された情報を復元しながら適用しなきゃいけないので、かなりしんどい。
 * @param old 呼び出し後に破壊されている可能性があるので、後で使いたいならディープコピーしておくこと。
 * @param o 
 */
export function disambiguate_piece_phase_and_apply(old: ResolvedGameState, o: Readonly<PiecePhaseMove>): PiecePhasePlayed {
    // The thing is that we have to infer which piece has moved, since the usual notation does not signify
    // where the piece comes from.
    // 面倒なのは、具体的にどの駒が動いたのかを、棋譜の情報から復元してやらないといけないという点である（普通始点は書かないので）。

    // first, use the `side` field and the `prof` field to list up the possible points of origin 
    // (note that "in hand" is a possibility).
    const possible_points_of_origin = lookup_coord_from_side_and_prof(old.board, o.side, o.prof);
    const hand = old[o.side === "白" ? "hand_of_white" : "hand_of_black"];
    const exists_in_hand: boolean = hand.some(prof => prof === o.prof);

    if (typeof o.from === "string") {
        if (o.from === "打") {
            if (exists_in_hand) {
                if (isShogiProfession(o.prof)) {
                    return parachute(old, { side: o.side, prof: o.prof, to: o.to });
                } else {
                    // ShogiProfession 以外は手駒に入っているはずがないので、
                    // exists_in_hand が満たされている時点で ShogiProfession であることは既に確定している
                    throw new Error("should not reach here")
                }
            } else {
                throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}打とのことですが、${o.side}の手駒に${professionFullName(o.prof)}はありません`);
            }
        } else if (o.from === "右") {
            const pruned = possible_points_of_origin.filter(from => is_within_reach(old, from, o.to));
            if (pruned.length === 0) {
                throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}右とのことですが、そのような移動ができる${o.side}の${professionFullName(o.prof)}は盤上にありません`);
            }
            const rightmost = RightmostWhenSeenFrom(o.side, pruned);
            if (rightmost.length === 1) {
                return move_piece(old, { from: rightmost[0]!, to: o.to, side: o.side });
            } else {
                throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}とのことですが、そのような移動ができる${o.side}の${professionFullName(o.prof)}が盤上に複数あります`);
            }
        } else if (o.from === "左") {
            const pruned = possible_points_of_origin.filter(from => is_within_reach(old, from, o.to));
            if (pruned.length === 0) {
                throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}左とのことですが、そのような移動ができる${o.side}の${professionFullName(o.prof)}は盤上にありません`);
            }
            const leftmost = LeftmostWhenSeenFrom(o.side, pruned);
            if (leftmost.length === 1) {
                return move_piece(old, { from: leftmost[0]!, to: o.to, side: o.side });
            } else {
                throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}とのことですが、そのような移動ができる${o.side}の${professionFullName(o.prof)}が盤上に複数あります`);
            }
        } else {
            throw new Error("「打」「右」「左」「成」「不成」以外の接尾辞は未実装です。７六金（７五）などと書いて下さい。");
        }
    } else if (typeof o.from === "undefined") {
        // 駒がどこから来たかが分からない。
        // このようなときには、
        // ・打つしかないなら打つ
        // ・そうでなくて、目的地に行ける駒が盤上に 1 種類しかないなら、それをする
        // という解決をすることになる。
        //
        // しかし、このゲームにおいて、二ポは「着手できない手」ではなくて、「着手した後に、石フェイズ解消後にもそれが残ってしまっていたら、反則負け」となるものである。
        // この前提のもとで、ポが横並びしているときに、片方のポの前にある駒を取ろうとしている状況を考えてほしい。
        // すると、常識的にはそんなあからさまな二ポは指さないので、1マス前進して取るのが当たり前であり、
        // それを棋譜に起こすときにわざわざ「直」を付けるなどバカバカしい。
        // よって、出発点推論においては、最初は二ポは排除して推論することとする。

        // We have no info on where the piece came from.
        // In such cases, the rational way of inference is
        // * Parachute a piece if you have to.
        // * Otherwise, if there is only one piece on board that can go to the specified destination, take that move.
        // 
        // However, in this game, doubled pawns are not an impossible move, but rather a move that cause you to lose if it remained even after the removal-by-go.
        // Under such an assumption, consider the situation where there are two pawns next to each other and there is an enemy piece right in front of one of it.
        // In such a case, it is very easy to see that taking the piece diagonally results in doubled pawns.
        // Hence, when writing that move down, you don't want to explicitly annotate such a case with 直.
        // Therefore, when inferring the point of origin, I first ignore the doubled pawns.

        const pruned = possible_points_of_origin.filter(from => is_within_reach_and_not_doubled_pawns(old, from, o.to));

        if (pruned.length === 0) {
            if (exists_in_hand) {
                if (isShogiProfession(o.prof)) {
                    return parachute(old, { side: o.side, prof: o.prof, to: o.to });
                } else {
                    // ShogiProfession 以外は手駒に入っているはずがないので、
                    // exists_in_hand が満たされている時点で ShogiProfession であることは既に確定している
                    throw new Error("should not reach here")
                }
            } else {
                const pruned_allowing_doubled_pawns = possible_points_of_origin.filter(from => is_within_reach(old, from, o.to));
                if (pruned_allowing_doubled_pawns.length === 0) {
                    throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}とのことですが、そのような移動ができる${o.side}の${professionFullName(o.prof)}は盤上にありません`);
                } else if (pruned_allowing_doubled_pawns.length === 1) {
                    const from = pruned_allowing_doubled_pawns[0]!;
                    return move_piece(old, { from, to: o.to, side: o.side });
                } else {
                    throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}とのことですが、そのような移動ができる${o.side}の${professionFullName(o.prof)}が盤上に複数あり、しかもどれを指しても二ポです`);
                }
            }
        } else if (pruned.length === 1) {
            const from = pruned[0]!;
            return move_piece(old, { from, to: o.to, side: o.side });
        } else {
            throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}とのことですが、そのような移動ができる${o.side}の${professionFullName(o.prof)}が盤上に複数あり、どれを採用するべきか分かりません`);
        }
    } else {
        const from: Coordinate = o.from;
        if (!possible_points_of_origin.some(c => coordEq(c, from))) {
            throw new Error(`${o.side}が${displayCoord(from)}から${displayCoord(o.to)}へと${professionFullName(o.prof)}を動かそうとしていますが、${displayCoord(from)}には${o.side}の${professionFullName(o.prof)}はありません`);
        }
        if (is_within_reach(old, from, o.to)) {
            return move_piece(old, { from, to: o.to, side: o.side });
        } else {
            throw new Error(`${o.side}が${displayCoord(from)}から${displayCoord(o.to)}へと${professionFullName(o.prof)}を動かそうとしていますが、${professionFullName(o.prof)}は${displayCoord(from)}から${displayCoord(o.to)}へ動ける駒ではありません`);
        }
    }
}

function move_piece(old: ResolvedGameState, o: { from: Coordinate, to: Coordinate, side: Side }): PiecePhasePlayed {
    const piece_that_moves = get_entity_from_coord(old.board, o.from);
    if (!piece_that_moves) {
        throw new Error(`${o.side}が${displayCoord(o.from)}から${displayCoord(o.to)}への移動を試みていますが、${displayCoord(o.from)}には駒がありません`);
    } else if (piece_that_moves.type === "碁") {
        throw new Error(`${o.side}が${displayCoord(o.from)}から${displayCoord(o.to)}への移動を試みていますが、${displayCoord(o.from)}にあるのは碁石であり、駒ではありません`);
    }
    const occupier = get_entity_from_coord(old.board, o.to);
    if (!occupier) {
        set_entity_in_coord(old.board, o.to, piece_that_moves);
        set_entity_in_coord(old.board, o.from, null);
        return {
            phase: "piece_phase_played",
            board: old.board,
            hand_of_black: old.hand_of_black,
            hand_of_white: old.hand_of_white,
            by_whom: old.who_goes_next
        }
    } else if (occupier.type === "碁") {
        if (occupier.side === o.side) {
            throw new Error(`${o.side}が${displayCoord(o.from)}から${displayCoord(o.to)}への移動を試みていますが、${displayCoord(o.to)}に自分の碁石があるので、移動できません`);
        } else {
            set_entity_in_coord(old.board, o.to, piece_that_moves);
            set_entity_in_coord(old.board, o.from, null);
            return {
                phase: "piece_phase_played",
                board: old.board,
                hand_of_black: old.hand_of_black,
                hand_of_white: old.hand_of_white,
                by_whom: old.who_goes_next
            }
        }
    } else {
        if (occupier.side === o.side) {
            throw new Error(`${o.side}が${displayCoord(o.from)}から${displayCoord(o.to)}への移動を試みていますが、${displayCoord(o.to)}に自分の駒があるので、移動できません`);
        } else if (occupier.type === "しょ") {
            (o.side === "白" ? old.hand_of_white : old.hand_of_black).push(occupier.prof);
            set_entity_in_coord(old.board, o.to, piece_that_moves);
            set_entity_in_coord(old.board, o.from, null);
            return {
                phase: "piece_phase_played",
                board: old.board,
                hand_of_black: old.hand_of_black,
                hand_of_white: old.hand_of_white,
                by_whom: old.who_goes_next
            };
        } else {
            set_entity_in_coord(old.board, o.to, piece_that_moves);
            set_entity_in_coord(old.board, o.from, null);
            return {
                phase: "piece_phase_played",
                board: old.board,
                hand_of_black: old.hand_of_black,
                hand_of_white: old.hand_of_white,
                by_whom: old.who_goes_next
            };
        }
    }
}
function is_within_reach(old: Readonly<ResolvedGameState>, from: Coordinate, to: Coordinate): boolean {
    throw new Error("Function not implemented.");
}
function is_within_reach_and_not_doubled_pawns(old: Readonly<ResolvedGameState>, from: Coordinate, to: Coordinate): boolean {
    throw new Error("Function not implemented.");
}

