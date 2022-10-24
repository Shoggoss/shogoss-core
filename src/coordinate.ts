export type ShogiColumnName = "１" | "２" | "３" | "４" | "５" | "６" | "７" | "８" | "９";
export type ShogiRowName = "一" | "二" | "三" | "四" | "五" | "六" | "七" | "八" | "九";

export type Coordinate = Readonly<[ShogiColumnName, ShogiRowName]>;
export function displayCoord(coord: Coordinate) {
	return `${coord[0]}${coord[1]}`;
}

export function coordEq([col1, row1]: Coordinate, [col2, row2]: Coordinate) {
	return col1 === col2 && row1 === row2;
}

export function columnsBetween(a: ShogiColumnName, b: ShogiColumnName): ShogiColumnName[] {
	const a_index = "９８７６５４３２１".indexOf(a);
	const b_index = "９８７６５４３２１".indexOf(b);
	if (a_index >= b_index) return columnsBetween(b, a);

	const ans: ShogiColumnName[] = [];
	for (let i = a_index + 1; i < b_index; i++) {
		ans.push("９８７６５４３２１"[i] as ShogiColumnName);
	}
	return ans;
}

export function coordDiff(o: { from: Coordinate, to: Coordinate }) {
	const [from_column, from_row] = o.from;
	const from_row_index = "一二三四五六七八九".indexOf(from_row);
	const from_column_index = "９８７６５４３２１".indexOf(from_column);

	const [to_column, to_row] = o.to;
	const to_row_index = "一二三四五六七八九".indexOf(to_row);
	const to_column_index = "９８７６５４３２１".indexOf(to_column);

	return {
		h: to_column_index - from_column_index,
		v: to_row_index - from_row_index
	};
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
