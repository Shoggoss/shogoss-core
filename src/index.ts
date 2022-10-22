import { Board, Coordinate, Entity, GameEnd, GameState, isShogiProfession, Move, PiecePhaseMove, PiecePhasePlayed, Profession, professionFullName, ResolvedGameState, ShogiColumnName, ShogiRowName, Side, StonePhasePlayed } from "./type"

const get_initial_state: (who_goes_first: Side) => GameState = (who_goes_first: Side) => {
    return {
        phase: "resolved",
        hand_of_black: [],
        hand_of_white: [],
        who_goes_next: who_goes_first,
        board: [
            [
                { type: "しょ", side: "白", prof: "香", can_kumal: true },
                { type: "しょ", side: "白", prof: "桂", can_kumal: false },
                { type: "しょ", side: "白", prof: "銀", can_kumal: false },
                { type: "しょ", side: "白", prof: "金", can_kumal: false },
                { type: "王", side: "白", prof: "キ", can_kumal: true, can_castle: false },
                { type: "しょ", side: "白", prof: "金", can_kumal: false },
                { type: "しょ", side: "白", prof: "銀", can_kumal: false },
                { type: "しょ", side: "白", prof: "桂", can_kumal: false },
                { type: "しょ", side: "白", prof: "香", can_kumal: true },
            ],
            [
                { type: "ス", side: "白", prof: "ル", can_castle: true },
                { type: "ス", side: "白", prof: "ナ", can_castle: false },
                { type: "ス", side: "白", prof: "ビ", can_castle: false },
                null,
                { type: "ス", side: "白", prof: "ク", can_castle: false },
                null,
                { type: "ス", side: "白", prof: "ビ", can_castle: false },
                { type: "ス", side: "白", prof: "ナ", can_castle: false },
                { type: "ス", side: "白", prof: "ル", can_castle: true },
            ],
            [
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
                { type: "ス", side: "白", prof: "ポ", can_castle: false },
            ],
            [null, null, null, null, null, null, null, null, null,],
            [null, null, null, null, null, null, null, null, null,],
            [null, null, null, null, null, null, null, null, null,],
            [
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
                { type: "ス", side: "黒", prof: "ポ", can_castle: false },
            ],
            [
                { type: "ス", side: "黒", prof: "ル", can_castle: true },
                { type: "ス", side: "黒", prof: "ナ", can_castle: false },
                { type: "ス", side: "黒", prof: "ビ", can_castle: false },
                null,
                { type: "ス", side: "黒", prof: "ク", can_castle: false },
                null,
                { type: "ス", side: "黒", prof: "ビ", can_castle: false },
                { type: "ス", side: "黒", prof: "ナ", can_castle: false },
                { type: "ス", side: "黒", prof: "ル", can_castle: true },
            ],
            [
                { type: "しょ", side: "黒", prof: "香", can_kumal: true },
                { type: "しょ", side: "黒", prof: "桂", can_kumal: false },
                { type: "しょ", side: "黒", prof: "銀", can_kumal: false },
                { type: "しょ", side: "黒", prof: "金", can_kumal: false },
                { type: "王", side: "黒", prof: "キ", can_kumal: true, can_castle: false },
                { type: "しょ", side: "黒", prof: "金", can_kumal: false },
                { type: "しょ", side: "黒", prof: "銀", can_kumal: false },
                { type: "しょ", side: "黒", prof: "桂", can_kumal: false },
                { type: "しょ", side: "黒", prof: "香", can_kumal: true },
            ],
        ]
    }
}

function get_entity_from_coord(board: Board, coord: Coordinate): Entity | null {
    const [column, row] = coord;
    const row_index = "一二三四五六七八九".indexOf(row);
    const column_index = "１２３４５６７８９".indexOf(column);
    if (row_index === -1 || column_index === -1) {
        throw new Error(`座標「${displayCoord(coord)}」は不正です`)
    }
    return (board[row_index]?.[column_index]) ?? null;
}

function set_entity_in_coord(board: Board, coord: Coordinate, maybe_entity: Entity | null) {
    const [column, row] = coord;
    const row_index = "一二三四五六七八九".indexOf(row);
    const column_index = "１２３４５６７８９".indexOf(column);
    if (row_index === -1 || column_index === -1) {
        throw new Error(`座標「${displayCoord(coord)}」は不正です`)
    }
    return board[row_index]![column_index] = maybe_entity;
}

function displayCoord(coord: Coordinate) {
    return `${coord[0]}${coord[1]}`;
}

function lookup_coord_from_side_and_prof(board: Board, side: Side, prof: Profession): Coordinate[] {
    const ans: Coordinate[] = [];
    const rows: ShogiRowName[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const cols: ShogiColumnName[] = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];
    for (const row of rows) {
        for (const col of cols) {
            const coord: Coordinate = [col, row];
            const entity = get_entity_from_coord(board, coord);
            if (entity === null || entity.type === "碁") {
                continue;
            } else if (entity.prof === prof && entity.side === side) {
                ans.push(coord)
            } else {
                continue;
            }
        }
    }
    return ans;
}

/**
 * 
 * @param old 呼び出し後に破壊されている可能性があるので、後で使いたいならディープコピーしておくこと。
 * @param o 
 */
function apply_piece_phase_move(old: ResolvedGameState, o: Readonly<PiecePhaseMove>): PiecePhasePlayed {
    // The thing is that we have to infer which piece has moved, since the usual notation does not signify
    // where the piece comes from.
    // 面倒なのは、具体的にどの駒が動いたのかを、棋譜の情報から復元してやらないといけないという点である（普通始点は書かないので）。

    // first, use the `side` field and the `prof` field to list up the possible points of origin 
    // (note that "in hand" is a possibility).
    const possible_points_of_origin = lookup_coord_from_side_and_prof(old.board, o.side, o.prof);
    const hand = old[o.side === "白" ? "hand_of_white" : "hand_of_black"]
    const exists_in_hand: boolean = hand.some(prof => prof === o.prof);

    if (typeof o.from === "string") {
        if (o.from === "打") {
            if (exists_in_hand) {
                if (get_entity_from_coord(old.board, o.to)) {
                    throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}打とのことですが、${displayCoord(o.to)}マスは既に埋まっています`);
                }

                if (isShogiProfession(o.prof)) {
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
                } else {
                    // ShogiProfession 以外は手駒に入っているはずがないので、
                    // exists_in_hand が満たされている時点で ShogiProfession であることは既に確定している
                    throw new Error("should not reach here")
                }
            } else {
                throw new Error(`${o.side}が${displayCoord(o.to)}${o.prof}打とのことですが、${o.side}の手駒に${professionFullName(o.prof)}はありません`);
            }
        } else if (o.from === "右") {
            throw new Error("未実装");
        } else if (o.from === "左") {
            throw new Error("未実装");
        } else {
            throw new Error("「打」「右」「左」「成」「不成」以外の接尾辞は未実装です");
        }
    } else if (typeof o.from === "undefined") {
        // no info on where the piece came from
        throw new Error("未実装");
    } else {
        const from: Coordinate = o.from;
        throw new Error("未実装");
    }
}

function place_stone(old: PiecePhasePlayed, side: Side, stone_to: Coordinate): StonePhasePlayed {
    if (get_entity_from_coord(old.board, stone_to)) { // if the square is already occupied
        throw new Error(`${displayCoord(stone_to)}のマスは既に埋まっています / the square ${displayCoord(stone_to)} is already occupied`);
    }
    set_entity_in_coord(old.board, stone_to, { type: "碁", side });

    return {
        phase: "stone_phase_played",
        board: old.board,
        hand_of_black: old.hand_of_black,
        hand_of_white: old.hand_of_white,
        by_whom: old.by_whom,
    };
}

function invertSide(side: Side): Side {
    if (side === "黒") return "白";
    else return "黒";
}

/** 石フェーズが終了した後、勝敗判定と囲碁検査をする。 / To be called after a stone is placed: checks the victory condition and the game-of-go condition.
 * 
 * 1. キング王が盤面から除かれているかを判定。除かれていたら、それは「駒による勝利」
 * 2. 囲碁の判定をする。以下 2-1. と 2-2. の順番を逆にするとコンビネーションアタックが失敗する
 *   2-1. 自分の駒と石によって囲まれている相手の駒と石をすべて取り除く
 *   2-2. 相手の駒と石によって囲まれている自分の駒と石をすべて取り除く
 * 3. 二ポが発生しているかを判断。発生していた場合、反則負け
 * 4. キング王が盤面から除かれているかを判定。
 *   4-1. 両者が除かれていたら、@re_hako_moon曰く引き分けとなり、カラテジャンケンボクシング
 *   4-2. 相手の王だけ除かれていたら、それは「石による勝利」
 *   4-3. 自分の王だけ除かれていたら、それは「王の自殺による敗北」
 *   4-4. 「ごっそり」（@re_hako_moon曰く、2個か3個）に該当するときには「ショゴス！」の発声
 * 
 * 1. Checks whether a king is removed from the board. If removed, then it is a victory by a piece.
 * 2. Checks the conditions pertaining to the game of go. (Note that the order of 2-1. and 2-2. is crucial; otherwise the "combination attack" cannot happen)
 *   2-1. Remove all the opponent's pieces and stones surrounded by your pieces and stones
 *   2-2. Remove all your pieces and stones surrounded by the opponent's pieces and stones
 * 3. Checks whether two pawns occupy the same column. If so, the player loses.
 * 4. Checks whether a king is removed from the board.
 *   4-1. If both kings are removed, that is a draw (according to @re_hako_moon), and therefore a Karate Rock-Paper-Scissors Boxing
 *   4-2. If the opponent's king is removed but yours remains, then it's a victory by stones.
 *   4-3. If your king is removed but the opponent's remains, then it's a king's suicide.
 *   4-4. When a large number (>= 2 or 3, according to @re_hako_moon) is removed, then "ShoGoSs!" should be shouted
 **/
function resolve(after_stone_phase: StonePhasePlayed): ResolvedGameState | GameEnd {
    throw new Error("未実装");
}

export function from_resolved_to_resolved(old: ResolvedGameState, move: Move): ResolvedGameState | GameEnd {
    const after_piece_phase = apply_piece_phase_move(old, move.piece_phase);

    const after_stone_phase: StonePhasePlayed = move.stone_to ? place_stone(after_piece_phase, move.piece_phase.side, move.stone_to) : {
        phase: "stone_phase_played",
        board: after_piece_phase.board,
        hand_of_black: after_piece_phase.hand_of_black,
        hand_of_white: after_piece_phase.hand_of_white,
        by_whom: after_piece_phase.by_whom,
    };
    return resolve(after_stone_phase)
}