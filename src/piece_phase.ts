import { get_entity_from_coord, lookup_coord_from_side_and_prof, set_entity_in_coord } from "./board";
import { Coordinate, displayCoord, GameEnd, GameState, isShogiProfession, Move, PiecePhaseMove, PiecePhasePlayed, professionFullName, ResolvedGameState, Side, StonePhasePlayed } from "./type"

/**
 * 
 * @param old 呼び出し後に破壊されている可能性があるので、後で使いたいならディープコピーしておくこと。
 * @param o 
 */
export function apply_piece_phase_move(old: ResolvedGameState, o: Readonly<PiecePhaseMove>): PiecePhasePlayed {
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