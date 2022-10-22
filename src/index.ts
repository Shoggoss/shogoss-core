export type Tuple9<T> = [T, T, T, T, T, T, T, T, T];
export type Hand = ShogiProfession[];
export type Phase = "piece_phase_played" | "stone_phase_played" | "resolved"
export type GameState = ResolvedGameState | PiecePhasePlayed | StonePhasePlayed;
export type GameEnd = {
    victor: Side | "KarateRPSBoxing",
    reason: "two_pawns_on_the_same_column" | "king_captured_by_stone" | "king_captured_by_piece" | "king_suicide"
}
export type ResolvedGameState = {
    phase: "resolved",
    board: Board,
    hand_of_black: Hand,
    hand_of_white: Hand,
    who_goes_next: Side,
}
export type PiecePhasePlayed = {
    phase: "piece_phase_played",
    board: Board,
    hand_of_black: Hand,
    hand_of_white: Hand,
    who_goes_next: Side,
}
export type StonePhasePlayed = {
    phase: "stone_phase_played",
    board: Board,
    hand_of_black: Hand,
    hand_of_white: Hand,
    who_goes_next: Side,
}
export type Board = Tuple9<Row>;
export type Row = Tuple9<Entity | null>;
export type Side = "黒" | "白"
type Entity =
    | { type: "しょ", side: Side, prof: ShogiProfession, can_kumal: boolean } // shogi_piece
    | { type: "碁", side: Side } // go_stone
    | { type: "ス", side: Side, prof: ChessProfession, can_castle: boolean } // chess_piece
    | { type: "王", side: Side, prof: KingProfession, can_castle: boolean, can_kumal: boolean }

type ShogiProfession =
    | "香" // lance 
    | "桂" // shogi_knight
    | "銀" // silver
    | "金" // gold
    | "成香" // promoted_lance
    | "成桂" // promoted_shogi_knight
    | "成銀" // promoted_silver;
type ChessProfession =
    | "ク" // queen
    | "ル" // rook
    | "ナ" // chess_knight
    | "ビ" // bishop
    | "ポ" // pawn
    | "と" // promoted_pawn
type KingProfession =
    | "キ" // king
    | "超" // promoted_king

type ShogiColumnName = "１" | "２" | "３" | "４" | "５" | "６" | "７" | "８" | "９";
type ShogiRowName = "一" | "二" | "三" | "四" | "五" | "六" | "七" | "八" | "九";

type Coordinate = [ShogiColumnName, ShogiRowName];

type PiecePhaseMove = {
    side: Side,
    from?: Coordinate,
    to: Coordinate,
    prof: ShogiProfession | ChessProfession | KingProfession,
    promotes?: boolean // true → 成. false → 不成. not given → cannot promote
}
type Move = { piece_phase: PiecePhaseMove, stone_to?: Coordinate }

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

function apply_piece_phase_move(old: ResolvedGameState, piece_phase: PiecePhaseMove): PiecePhasePlayed {
    throw new Error("未実装");
}
function place_stone(old: PiecePhasePlayed, side: Side, stone_to: Coordinate): StonePhasePlayed {
    throw new Error("未実装");
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

function from_resolved_to_resolved(old: ResolvedGameState, move: Move): ResolvedGameState | GameEnd {
    const after_piece_phase = apply_piece_phase_move(old, move.piece_phase);

    const after_stone_phase: StonePhasePlayed = move.stone_to ? place_stone(after_piece_phase, move.piece_phase.side, move.stone_to) : {
        phase: "stone_phase_played",
        board: after_piece_phase.board,
        hand_of_black: after_piece_phase.hand_of_black,
        hand_of_white: after_piece_phase.hand_of_white,
        who_goes_next: invertSide(after_piece_phase.who_goes_next),
    };
    return resolve(after_stone_phase)
}