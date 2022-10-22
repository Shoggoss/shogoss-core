export type ShogiColumnName = "１" | "２" | "３" | "４" | "５" | "６" | "７" | "８" | "９";
export type ShogiRowName = "一" | "二" | "三" | "四" | "五" | "六" | "七" | "八" | "九";

export type Coordinate = Readonly<[ShogiColumnName, ShogiRowName]>;
export function displayCoord(coord: Coordinate) {
    return `${coord[0]}${coord[1]}`;
}

export function coordEq([col1, row1]: Coordinate, [col2, row2]: Coordinate) {
    return col1 === col2 && row1 === row2;
}

export function RightmostWhenSeenFromBlack(coords: ReadonlyArray<Coordinate>): Coordinate[] {
    if (coords.length === 0) { throw new Error("tried to take the maximum of an empty array"); }

    // Since "１" to "９" are consecutive in Unicode, we can just sort it as UTF-16 string
    const columns = coords.map(([col, _row]) => col);
    columns.sort();

    const rightmost_column = columns[0]!;

    return coords.filter(([col, _row]) => col === rightmost_column);
}

export function LeftmostWhenSeenFromBlack(coords: ReadonlyArray<Coordinate>): Coordinate[] {
    if (coords.length === 0) { throw new Error("tried to take the maximum of an empty array"); }

    // Since "１" to "９" are consecutive in Unicode, we can just sort it as UTF-16 string
    const columns = coords.map(([col, _row]) => col);
    columns.sort();

    const leftmost_column = columns[columns.length - 1]!;

    return coords.filter(([col, _row]) => col === leftmost_column);
}
