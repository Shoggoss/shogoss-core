import { delete_en_passant_flag, lookup_coords_from_side_and_prof } from "./board";
import { ShogiColumnName } from "./coordinate";
import { remove_surrounded } from "./surround";
import { Board, Entity, GameEnd, opponentOf, ResolvedGameState, Side, StonePhasePlayed, unpromote } from "./type";

/** 石フェイズが終了した後、勝敗判定と囲碁検査をする。 / To be called after a stone is placed: checks the victory condition and the game-of-go condition.
 * また、相手のポ兵にアンパッサンフラグがついていたら、それを取り除く（自分が手を指したことによって、アンパッサンの権利が失われたので） 
 * Also, if the opponent's pawn has an en passant flag, delete it (since, by playing a piece unrelated to en passant, you have lost the right to capture by en passant)
 * 
 * 1. 自分の駒と石によって囲まれている相手の駒と石をすべて取り除く
 * 2. 相手の駒と石によって囲まれている自分の駒と石をすべて取り除く
 * 3. 二ポが発生しているか・キング王が盤面から除かれているかを判定。
 *   3-1. 両キング王が除かれていたら、カラテジャンケンボクシング
 *   3-2. 自分の王だけ除かれていたら、それは「王の自殺による敗北」
 *   3-3. 相手の王だけ除かれている場合、
 *       3-3-1. 二ポが発生していなければ、それは「王の排除による勝利」
 *             3-3-1-1. 相手の王を取り除いたのがステップ 1. であり、
 *                      しかも「ごっそり」（@re_hako_moon曰く、2個か3個）
 *                      に該当するときには「ショゴス！」の発声
 *       3-3-2. 二ポが発生しているなら、カラテジャンケンボクシング
 *   3-4. どちらの王も除かれていない場合、
 *       3-4-1. 二ポが発生していなければ、ゲーム続行
 *       3-4-2. 二ポが発生しているなら、それは「二ポによる敗北」
 *   
 * 1 → 2 の順番である根拠：コンビネーションアタックの存在
 * 2 → 3 の順番である根拠：公式ルール追記
 * 「石フェイズを着手した結果として自分のポーン兵が盤上から消え二ポが解決される場合も、反則をとらず進行できる。」
 * 
 * 1. Remove all the opponent's pieces and stones surrounded by your pieces and stones
 * 2. Remove all your pieces and stones surrounded by the opponent's pieces and stones
 * 3. Checks whether two pawns occupy the same column, and checks whether a king is removed from the board.
 *   3-1. If both kings are removed, that is a draw, and therefore a Karate Rock-Paper-Scissors Boxing.
 *   3-2. If your king is removed but the opponent's remains, then it's a loss by king's suicide.
 *   3-3. If the opponent's king is removed but yours remains, 
 *        3-3-1. If no two pawns occupy the same column, then it's a victory
 *             3-3-1-1. If the step that removed the opponent's king was step 1, 
 *                      and when a large number (>= 2 or 3, according to @re_hako_moon) 
 *                      of pieces/stones are removed, then "ShoGoSs!" should be shouted
 * 
 * The ordering 1 → 2 is needed to support the combination attack.
 * The ordering 2 → 3 is explicitly mentioned by the addendum to the official rule: 
 *         「石フェイズを着手した結果として自分のポーン兵が盤上から消え二ポが解決される場合も、反則をとらず進行できる。」
 **/
export function resolve_after_stone_phase(played: StonePhasePlayed): ResolvedGameState | GameEnd {
    remove_surrounded_enitities_from_board_and_add_to_hand_if_necessary(played, opponentOf(played.by_whom));

    remove_surrounded_enitities_from_board_and_add_to_hand_if_necessary(played, played.by_whom);

    renounce_en_passant(played.board, played.by_whom);

    const doubled_pawns_exist = does_doubled_pawns_exist(played.board, played.by_whom);
    const is_your_king_alive = king_is_alive(played.board, played.by_whom);
    const is_opponents_king_alive = king_is_alive(played.board, opponentOf(played.by_whom));

    const situation = {
        board: played.board,
        hand_of_black: played.hand_of_black,
        hand_of_white: played.hand_of_white,
    };

    if (!is_your_king_alive) {
        if (!is_opponents_king_alive) {
            return { phase: "game_end", reason: "both_king_dead", victor: "KarateJankenBoxing", final_situation: situation };
        } else {
            return { phase: "game_end", reason: "king_suicide", victor: opponentOf(played.by_whom), final_situation: situation };
        }
    } else {
        if (!is_opponents_king_alive) {
            if (!doubled_pawns_exist) {
                return { phase: "game_end", reason: "king_capture", victor: played.by_whom, final_situation: situation };
            } else {
                return { phase: "game_end", reason: "king_capture_and_doubled_pawns", victor: "KarateJankenBoxing", final_situation: situation };
            }
        } else {
            if (!doubled_pawns_exist) {
                return {
                    phase: "resolved",
                    board: played.board,
                    hand_of_black: played.hand_of_black,
                    hand_of_white: played.hand_of_white,
                    who_goes_next: opponentOf(played.by_whom)
                }
            } else {
                return { phase: "game_end", reason: "doubled_pawns", victor: opponentOf(played.by_whom), final_situation: situation };
            }
        }
    }
}

function renounce_en_passant(board: Board, by_whom: Side): void {
    const opponent_pawn_coords = lookup_coords_from_side_and_prof(board, opponentOf(by_whom), "ポ");
    for (const coord of opponent_pawn_coords) {
        delete_en_passant_flag(board, coord);
    }
}

function has_duplicates<T>(array: T[]): boolean {
    return new Set(array).size !== array.length;
}

function does_doubled_pawns_exist(board: Readonly<Board>, side: Side): boolean {
    const coords = lookup_coords_from_side_and_prof(board, side, "ポ");
    const columns: ShogiColumnName[] = coords.map(([col, _row]) => col);
    return has_duplicates(columns);
}

function king_is_alive(board: Readonly<Board>, side: Side) {
    return lookup_coords_from_side_and_prof(board, side, "キ").length + lookup_coords_from_side_and_prof(board, side, "超").length > 0;
}

function remove_surrounded_enitities_from_board_and_add_to_hand_if_necessary(old: StonePhasePlayed, side: Side): void {
    const black_and_white: (Side | null)[][] = old.board.map(row => row.map(sq => sq === null ? null : sq.side));
    const has_survived = remove_surrounded(side, black_and_white);

    old.board.forEach((row, i) => row.forEach((sq, j) => {
        if (!has_survived[i]?.[j]) {
            const captured_entity = sq;
            row[j] = null;
            send_captured_entity_to_opponent(old, captured_entity);
        }
    }));
}

function send_captured_entity_to_opponent(old: StonePhasePlayed, captured_entity: Entity | null): void {
    if (!captured_entity) return;
    const opponent = opponentOf(captured_entity.side);
    if (captured_entity.type === "しょ") {
        (opponent === "白" ? old.hand_of_white : old.hand_of_black).push(unpromote(captured_entity.prof));
    }
}



