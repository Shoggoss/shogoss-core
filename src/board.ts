import { Board, Coordinate, displayCoord, Entity, GameEnd, GameState, isShogiProfession, Move, PiecePhaseMove, PiecePhasePlayed, Profession, professionFullName, ResolvedGameState, ShogiColumnName, ShogiRowName, Side, StonePhasePlayed } from "./type"
export function get_entity_from_coord(board: Board, coord: Coordinate): Entity | null {
    const [column, row] = coord;
    const row_index = "一二三四五六七八九".indexOf(row);
    const column_index = "１２３４５６７８９".indexOf(column);
    if (row_index === -1 || column_index === -1) {
        throw new Error(`座標「${displayCoord(coord)}」は不正です`)
    }
    return (board[row_index]?.[column_index]) ?? null;
}

export function set_entity_in_coord(board: Board, coord: Coordinate, maybe_entity: Entity | null) {
    const [column, row] = coord;
    const row_index = "一二三四五六七八九".indexOf(row);
    const column_index = "１２３４５６７８９".indexOf(column);
    if (row_index === -1 || column_index === -1) {
        throw new Error(`座標「${displayCoord(coord)}」は不正です`)
    }
    return board[row_index]![column_index] = maybe_entity;
}

export function lookup_coord_from_side_and_prof(board: Board, side: Side, prof: Profession): Coordinate[] {
    const ans: Coordinate[] = [];
    const rows: ShogiRowName[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const cols: ShogiColumnName[] = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];
    for (const row of rows) {
        for (const col of cols) {
            const coord: Coordinate = [col, row];
            const entity = get_entity_from_coord(board, coord);
            if (entity === null || entity.type === "碁") {
                continue;
            } else if (entity.prof === prof && entity.side === side) {
                ans.push(coord)
            } else {
                continue;
            }
        }
    }
    return ans;
}
