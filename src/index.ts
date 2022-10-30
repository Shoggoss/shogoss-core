import { get_entity_from_coord, put_entity_at_coord_and_also_adjust_flags } from "./board";
import { play_piece_phase } from "./piece_phase";
import { GameEnd, Move, PiecePhasePlayed, ResolvedGameState, StonePhasePlayed } from "./type"
import { Coordinate, displayCoord } from "./coordinate";
import { resolve_after_stone_phase } from "./after_stone_phase";
import { opponentOf, Side } from "./side";
import { remove_surrounded } from "./surround";

export { Side, opponentOf } from "./side";
export * from "./type";
export { can_see } from "./can_see";
export { can_move, throws_if_uncastlable, throws_if_unkumalable } from "./piece_phase";
export { displayCoord, ShogiColumnName, ShogiRowName, Coordinate, coordEq } from "./coordinate"

export const get_initial_state: (who_goes_first: Side) => ResolvedGameState = (who_goes_first: Side) => {
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
                { type: "王", side: "白", prof: "キ", never_moved: true, has_moved_only_once: false },
                { type: "しょ", side: "白", prof: "金", can_kumal: false },
                { type: "しょ", side: "白", prof: "銀", can_kumal: false },
                { type: "しょ", side: "白", prof: "桂", can_kumal: false },
                { type: "しょ", side: "白", prof: "香", can_kumal: true },
            ],
            [
                { type: "ス", side: "白", prof: "ル", never_moved: true },
                { type: "ス", side: "白", prof: "ナ", never_moved: true },
                { type: "ス", side: "白", prof: "ビ", never_moved: true },
                null,
                { type: "ス", side: "白", prof: "ク", never_moved: true },
                null,
                { type: "ス", side: "白", prof: "ビ", never_moved: true },
                { type: "ス", side: "白", prof: "ナ", never_moved: true },
                { type: "ス", side: "白", prof: "ル", never_moved: true },
            ],
            [
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
                { type: "ス", side: "白", prof: "ポ", never_moved: true },
            ],
            [null, null, null, null, null, null, null, null, null,],
            [null, null, null, null, null, null, null, null, null,],
            [null, null, null, null, null, null, null, null, null,],
            [
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
                { type: "ス", side: "黒", prof: "ポ", never_moved: true },
            ],
            [
                { type: "ス", side: "黒", prof: "ル", never_moved: true },
                { type: "ス", side: "黒", prof: "ナ", never_moved: true },
                { type: "ス", side: "黒", prof: "ビ", never_moved: true },
                null,
                { type: "ス", side: "黒", prof: "ク", never_moved: true },
                null,
                { type: "ス", side: "黒", prof: "ビ", never_moved: true },
                { type: "ス", side: "黒", prof: "ナ", never_moved: true },
                { type: "ス", side: "黒", prof: "ル", never_moved: true },
            ],
            [
                { type: "しょ", side: "黒", prof: "香", can_kumal: true },
                { type: "しょ", side: "黒", prof: "桂", can_kumal: false },
                { type: "しょ", side: "黒", prof: "銀", can_kumal: false },
                { type: "しょ", side: "黒", prof: "金", can_kumal: false },
                { type: "王", side: "黒", prof: "キ", never_moved: true, has_moved_only_once: false },
                { type: "しょ", side: "黒", prof: "金", can_kumal: false },
                { type: "しょ", side: "黒", prof: "銀", can_kumal: false },
                { type: "しょ", side: "黒", prof: "桂", can_kumal: false },
                { type: "しょ", side: "黒", prof: "香", can_kumal: true },
            ],
        ]
    }
}


/** 碁石を置く。自殺手になるような碁石の置き方はできない（公式ルール「打った瞬間に取られてしまうマスには石は打てない」）
 * 
 * @param old 
 * @param side 
 * @param stone_to 
 * @returns 
 */
function place_stone(old: PiecePhasePlayed, side: Side, stone_to: Coordinate): StonePhasePlayed {
    if (get_entity_from_coord(old.board, stone_to)) { // if the square is already occupied
        throw new Error(`${side}が${displayCoord(stone_to)}に碁石を置こうとしていますが、${displayCoord(stone_to)}のマスは既に埋まっています`);
    }

    // まず置く
    put_entity_at_coord_and_also_adjust_flags(old.board, stone_to, { type: "碁", side });

    // 置いた後で、着手禁止かどうかを判断するために、
    //『囲まれている相手の駒/石を取る』→『囲まれている自分の駒/石を取る』をシミュレーションして、置いた位置の石が死んでいたら
    const black_and_white: (Side | null)[][] = old.board.map(row => row.map(sq => sq === null ? null : sq.side));
    const opponent_removed = remove_surrounded(opponentOf(side), black_and_white);
    const result = remove_surrounded(side, opponent_removed);

    if (get_entity_from_coord(result, stone_to)) {
        return {
            phase: "stone_phase_played",
            board: old.board,
            hand_of_black: old.hand_of_black,
            hand_of_white: old.hand_of_white,
            by_whom: old.by_whom,
        };
    } else {
        throw new Error(`${side}が${displayCoord(stone_to)}に碁石を置こうとしていますが、打った瞬間に取られてしまうのでここは着手禁止点です`);
    }
}

function one_turn(old: ResolvedGameState, move: Move): ResolvedGameState | GameEnd {
    const after_piece_phase = play_piece_phase(old, move.piece_phase);

    const after_stone_phase: StonePhasePlayed = move.stone_to ? place_stone(after_piece_phase, move.piece_phase.side, move.stone_to) : {
        phase: "stone_phase_played",
        board: after_piece_phase.board,
        hand_of_black: after_piece_phase.hand_of_black,
        hand_of_white: after_piece_phase.hand_of_white,
        by_whom: after_piece_phase.by_whom,
    };
    return resolve_after_stone_phase(after_stone_phase)
}

export function main(moves: Move[]): ResolvedGameState | GameEnd {
    if (moves.length === 0) {
        throw new Error("棋譜が空です");
    }
    return from_custom_state(moves, get_initial_state(moves[0]!.piece_phase.side));
}

export function from_custom_state(moves: Move[], initial_state: ResolvedGameState): ResolvedGameState | GameEnd {
    let state = initial_state;
    for (const move of moves) {
        const next = one_turn(state, move);
        if (next.phase === "game_end") {
            return next;
        }
        state = next;
    }
    return state;
}
