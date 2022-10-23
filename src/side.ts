import { coordDiff, Coordinate, LeftmostWhenSeenFromBlack, RightmostWhenSeenFromBlack } from "./coordinate";

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