import { coordDiff, Coordinate, LeftmostWhenSeenFromBlack, RightmostWhenSeenFromBlack } from "./coordinate";

export type Tuple9<T> = [T, T, T, T, T, T, T, T, T];
export type Hand = UnpromotedShogiProfession[];
export type Phase = "piece_phase_played" | "stone_phase_played" | "resolved"
export type GameState = ResolvedGameState | PiecePhasePlayed | StonePhasePlayed;
export type Situation = {
    board: Board,
    hand_of_black: Hand,
    hand_of_white: Hand,
};
export type GameEnd = {
    phase: "game_end",
    victor: Side,
    reason: "doubled_pawns" | "king_capture" | "king_suicide",
    final_situation: Situation
} | {
    phase: "game_end",
    victor: "KarateJankenBoxing",
    reason: "both_king_dead" | "king_capture_and_doubled_pawns",
    final_situation: Situation
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
    by_whom: Side,
}
export type StonePhasePlayed = {
    phase: "stone_phase_played",
    board: Board,
    hand_of_black: Hand,
    hand_of_white: Hand,
    by_whom: Side,
}
export type Board = Tuple9<Row>;
export type Row = Tuple9<Entity | null>;
export type Side = "黒" | "白";
export function opponentOf(side: Side): Side {
    if (side === "黒") return "白";
    else return "黒";
}
export type Entity =
    | { type: "しょ", side: Side, prof: ShogiProfession, can_kumal: boolean } // shogi_piece
    | { type: "碁", side: Side } // go_stone
    | { type: "ス", side: Side, prof: ChessProfession, never_moved: boolean, subject_to_en_passant?: true } // chess_piece
    | { type: "王", side: Side, prof: KingProfession, has_moved_only_once: boolean, never_moved: boolean }
export type Profession = KingProfession | ShogiProfession | ChessProfession;
export type UnpromotedShogiProfession =
    | "香" // lance 
    | "桂" // shogi_knight
    | "銀" // silver
    | "金" // gold
    ;
export type ShogiProfession =
    UnpromotedShogiProfession
    | "成香" // promoted_lance
    | "成桂" // promoted_shogi_knight
    | "成銀" // promoted_silver;
    ;

export function unpromote(a: ShogiProfession): UnpromotedShogiProfession {
    if (a === "成桂") return "桂";
    if (a === "成銀") return "銀";
    if (a === "成香") return "香";
    return a;
}

export function professionFullName(a: Profession): string {
    if (a === "と") { return "とクィーン"; }
    else if (a === "キ") { return "キング王"; }
    else if (a === "ク") { return "クィーン"; }
    else if (a === "ナ") { return "ナイト"; }
    else if (a === "ビ") { return "ビショップ"; }
    else if (a === "ポ") { return "ポーン兵"; }
    else if (a === "ル") { return "ルーク"; }
    else if (a === "超") { return "スーパーキング王"; }
    else { return a; }
}

export function isShogiProfession(a: unknown): a is ShogiProfession {
    return a === "香" ||
        a === "桂" ||
        a === "銀" ||
        a === "金" ||
        a === "成香" ||
        a === "成桂" ||
        a === "成銀";
}

export function isUnpromotedShogiProfession(a: unknown): a is UnpromotedShogiProfession {
    return a === "香" ||
        a === "桂" ||
        a === "銀" ||
        a === "金";
}
export type ChessProfession =
    | "ク" // queen
    | "ル" // rook
    | "ナ" // chess_knight
    | "ビ" // bishop
    | "ポ" // pawn
    | "と" // promoted_pawn
export type KingProfession =
    | "キ" // king
    | "超" // promoted_king


export function RightmostWhenSeenFrom(side: Side, coords: ReadonlyArray<Coordinate>): Coordinate[] {
    if (side === "黒") {
        return RightmostWhenSeenFromBlack(coords);
    } else {
        return LeftmostWhenSeenFromBlack(coords);
    }
}

export function LeftmostWhenSeenFrom(side: Side, coords: ReadonlyArray<Coordinate>): Coordinate[] {
    if (side === "黒") {
        return LeftmostWhenSeenFromBlack(coords);
    } else {
        return RightmostWhenSeenFromBlack(coords);
    }
}

/** vertical が +1 = 前進　　horizontal が +1 = 左
 */
export function coordDiffSeenFrom(side: Side, o: { from: Coordinate, to: Coordinate }) {
    if (side === "白") {
        return coordDiff(o);
    } else {
        const { h, v } = coordDiff(o);
        return { h: -h, v: -v };
    }
}

export type PiecePhaseMove = {
    side: Side,
    from?: Coordinate | "打" | "右" | "左",
    to: Coordinate,
    prof: ShogiProfession | ChessProfession | KingProfession,
    promotes?: boolean // true → 成. false → 不成. not given → cannot promote
}
export type Move = { piece_phase: PiecePhaseMove, stone_to?: Coordinate }