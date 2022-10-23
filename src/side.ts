import { coordDiff, Coordinate, LeftmostWhenSeenFromBlack, RightmostWhenSeenFromBlack, ShogiRowName } from "./coordinate";

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