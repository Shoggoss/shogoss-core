import { get_entity_from_coord, lookup_coords_from_side } from "./board";
import { Coordinate } from "./coordinate";
import { applyDeltaSeenFrom, coordDiffSeenFrom, Side } from "./side";
import { Board } from "./type";

function deltaEq(d: { v: number, h: number }, delta: { v: number, h: number }) {
    return d.v === delta.v && d.h === delta.h;
}

/**
 * `o.from` に駒があってその駒が `o.to` へと利いているかどうかを返す。ポーンの斜め利きは常に can_see と見なす。ポーンの2マス移動は、駒を取ることができないので「利き」ではない。
 *  Checks whether there is a piece at `o.from` which looks at `o.to`. The diagonal move of pawn is always considered. A pawn never sees two squares in the front; it can only move to there.
 * @param board 
 * @param o 
 * @returns 
 */
export function can_see(board: Readonly<Board>, o: { from: Coordinate, to: Coordinate }): boolean {
    const p = get_entity_from_coord(board, o.from);
    if (!p) {
        return false;
    }
    if (p.type === "碁") {
        return false;
    }

    const delta = coordDiffSeenFrom(p.side, o);
    if (p.prof === "成桂" || p.prof === "成銀" || p.prof === "成香" || p.prof === "金") {
        return [
            { v: 1, h: -1 }, { v: 1, h: 0 }, { v: 1, h: 1 },
            { v: 0, h: -1 }, /************/  { v: 0, h: 1 },
            /**************/ { v: -1, h: 0 } /**************/
        ].some(d => deltaEq(d, delta));
    } else if (p.prof === "銀") {
        return [
            { v: 1, h: -1 }, { v: 1, h: 0 }, { v: 1, h: 1 },
            /**********************************************/
            { v: -1, h: -1 }, /************/ { v: 1, h: 1 },
        ].some(d => deltaEq(d, delta));
    } else if (p.prof === "桂") {
        return [
            { v: 2, h: -1 }, { v: 2, h: 1 }
        ].some(d => deltaEq(d, delta));
    } else if (p.prof === "ナ") {
        return [
            { v: 2, h: -1 }, { v: 2, h: 1 },
            { v: -2, h: -1 }, { v: -2, h: 1 },
            { v: -1, h: 2 }, { v: 1, h: 2 },
            { v: -1, h: -2 }, { v: 1, h: -2 }
        ].some(d => deltaEq(d, delta));
    } else if (p.prof === "キ") {
        return [
            { v: 1, h: -1 }, { v: 1, h: 0 }, { v: 1, h: 1 },
            { v: 0, h: -1 }, /*************/  { v: 0, h: 1 },
            { v: -1, h: -1 }, { v: -1, h: 0 }, { v: -1, h: 1 },
        ].some(d => deltaEq(d, delta));
    } else if (p.prof === "と" || p.prof === "ク") {
        return long_range([
            { v: 1, h: -1 }, { v: 1, h: 0 }, { v: 1, h: 1 },
            { v: 0, h: -1 }, /*************/  { v: 0, h: 1 },
            { v: -1, h: -1 }, { v: -1, h: 0 }, { v: -1, h: 1 },
        ], board, o, p.side);
    } else if (p.prof === "ビ") {
        return long_range([
            { v: 1, h: -1 }, { v: 1, h: 1 }, { v: -1, h: -1 }, { v: -1, h: 1 },
        ], board, o, p.side);
    } else if (p.prof === "ル") {
        return long_range([
            { v: 1, h: 0 }, { v: 0, h: -1 }, { v: 0, h: 1 }, { v: -1, h: 0 },
        ], board, o, p.side);
    } else if (p.prof === "香") {
        return long_range([{ v: 1, h: 0 }], board, o, p.side);
    } else if (p.prof === "超") {
        return true;
    } else if (p.prof === "ポ") {
        if ([{ v: 1, h: -1 }, { v: 1, h: 0 }, { v: 1, h: 1 }].some(d => deltaEq(d, delta))) {
            return true;
        } else {
            // a pawn can never see two squares in front; it can only move to there
            return false;
        }
    } else {
        const _: never = p.prof;
        throw new Error("Should not reach here");
    }
}

function long_range(directions: { v: number, h: number }[], board: Readonly<Board>, o: { from: Coordinate, to: Coordinate }, side: Side): boolean {
    const delta = coordDiffSeenFrom(side, o);

    const matching_directions = directions.filter(direction =>
        delta.v * direction.v + delta.h * direction.h > 0 /* inner product is positive */
        && delta.v * direction.h - direction.v * delta.h === 0 /* cross product is zero */
    );

    if (matching_directions.length === 0) {
        return false;
    }

    const direction = matching_directions[0]!;
    for (let i = { v: direction.v, h: direction.h };
        !deltaEq(i, delta);
        i.v += direction.v, i.h += direction.h) {
        const coord = applyDeltaSeenFrom(side, o.from, i);
        if (get_entity_from_coord(board, coord)) {
            // blocked by something; cannot see
            return false;
        }
    }

    return true;
}


export function do_any_of_my_pieces_see(board: Readonly<Board>, coord: Coordinate, side: Side): boolean {
    const opponent_piece_coords = lookup_coords_from_side(board, side);
    return opponent_piece_coords.some(from => can_see(board, { from, to: coord }))
}
