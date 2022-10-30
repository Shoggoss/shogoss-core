import { Coordinate } from "./coordinate";
import { Side } from "./side";

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

export type Entity =
    | ShogiEntity
    | StoneEntity
    | ChessEntity
    | KingEntity
    ;

export type StoneEntity = { type: "碁", side: Side }
export type ShogiEntity = {
    type: "しょ";
    side: Side;
    prof: ShogiProfession;
    can_kumal: boolean;
};
export type ChessEntity = {
    type: "ス";
    side: Side;
    prof: ChessProfession;
    never_moved: boolean;
    subject_to_en_passant?: true;
};
export type KingEntity = {
    type: "王";
    side: Side;
    prof: KingProfession;
    has_moved_only_once: boolean;
    never_moved: boolean;
};

export function clone_entity(entity: Readonly<Entity>): Entity {
    return JSON.parse(JSON.stringify(entity)) as Entity;
}

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
    else if (a === "桂") { return "桂馬"; }
    else if (a === "香") { return "香車"; }
    else if (a === "銀") { return "銀将"; }
    else if (a === "金") { return "金将"; }
    else { return a; }
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

export function is_promotable(prof: Profession): boolean {
    return prof === "桂" || prof === "銀" || prof === "香" || prof === "キ" || prof === "ポ";
}

export type PiecePhaseMove = {
    side: Side,
    from?: Coordinate | "打" | "右" | "左",
    to: Coordinate,
    prof: ShogiProfession | ChessProfession | KingProfession,
    promotes?: boolean // true → 成. false → 不成. not given → cannot promote
}
export type Move = { piece_phase: PiecePhaseMove, stone_to?: Coordinate }