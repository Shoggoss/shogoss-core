export type Tuple9<T> = [T, T, T, T, T, T, T, T, T];

export type Board = Tuple9<Row>;
export type Row = Tuple9<Entity | null>;
export type Side = "☗" | "☖"
type Entity =
    | { type: "しょ", side: Side, prof: ShogiProfession, can_kumal: boolean } // shogi_piece
    | { type: "碁", side: Side } // go_stone
    | { type: "ス", side: Side, prof: ChessProfession, can_castle: boolean } // chess_piece

type ShogiProfession =
    | "香" // lance 
    | "桂" // shogi_knight
    | "銀" // silver
    | "金" // gold
    | "成香" // promoted_lance
    | "成桂" // promoted_shogi_knight
    | "成銀" // promoted_silver;
type ChessProfession =
    | "キ" // king
    | "超" // promoted_king
    | "ク" // queen
    | "ル" // rook
    | "ナ" // chess_knight
    | "ビ" // bishop
    | "ポ" // pawn
    | "と" // promoted_pawn

type ShogiColumnName = "１" | "２" | "３" | "４" | "５" | "６" | "７" | "８" | "９";
type ShogiRowName = "一" | "二" | "三" | "四" | "五" | "六" | "七" | "八" | "九";

type Coordinate = [ShogiColumnName, ShogiRowName];

type PiecePhaseMove = { side: Side, from: Coordinate, to: Coordinate }
type StonePhaseMove = { side: Side, stone_to: Coordinate }