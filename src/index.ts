export type Tuple9<T> = [T, T, T, T, T, T, T, T, T];
export type Hand = ShogiProfession[];
export type Phase = "piece_phase_completed" | "stone_phase_completed" | "resolved"
export type GameState = {
    phase: Phase,
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