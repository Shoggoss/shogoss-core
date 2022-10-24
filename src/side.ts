import { coordDiff, Coordinate, LeftmostWhenSeenFromBlack, RightmostWhenSeenFromBlack, ShogiColumnName, ShogiRowName } from "./coordinate";

export type Side = "黒" | "白";
export function opponentOf(side: Side): Side {
    if (side === "黒") return "白";
    else return "黒";
}

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

export function is_within_nth_furthest_rows(n: number, side: Side, coord: Coordinate): boolean {
    const row: ShogiRowName = coord[1];
    if (side === "黒") {
        return "一二三四五六七八九".indexOf(row) < n;
    } else {
        return "九八七六五四三二一".indexOf(row) < n;
    }
}

// since this function is only used to interpolate between two valid points, there is no need to perform and out-of-bounds check.
export function applyDeltaSeenFrom(side: Side, from: Coordinate, delta: { v: number, h: number }): Coordinate {
    if (side === "白") {
        const [from_column, from_row] = from;
        const from_row_index = "一二三四五六七八九".indexOf(from_row);
        const from_column_index = "９８７６５４３２１".indexOf(from_column);
        const to_column_index = from_column_index + delta.h;
        const to_row_index = from_row_index + delta.v;
        const columns: ShogiColumnName[] = ["９", "８", "７", "６", "５", "４", "３", "２", "１"];
        const rows: ShogiRowName[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
        return [columns[to_column_index]!, rows[to_row_index]!];
    } else {
        const [from_column, from_row] = from;
        const from_row_index = "一二三四五六七八九".indexOf(from_row);
        const from_column_index = "９８７６５４３２１".indexOf(from_column);
        const to_column_index = from_column_index - delta.h;
        const to_row_index = from_row_index - delta.v;
        const columns: ShogiColumnName[] = ["９", "８", "７", "６", "５", "４", "３", "２", "１"];
        const rows: ShogiRowName[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
        return [columns[to_column_index]!, rows[to_row_index]!];
    }
}