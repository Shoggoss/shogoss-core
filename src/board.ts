import { Board, Entity, Profession, Side } from "./type";
import { Coordinate, displayCoord, ShogiColumnName, ShogiRowName } from "./coordinate";
export function get_entity_from_coord(board: Readonly<Board>, coord: Coordinate): Entity | null {
    const [column, row] = coord;
    const row_index = "一二三四五六七八九".indexOf(row);
    const column_index = "９８７６５４３２１".indexOf(column);
    if (row_index === -1 || column_index === -1) {
        throw new Error(`座標「${displayCoord(coord)}」は不正です`)
    }
    return (board[row_index]?.[column_index]) ?? null;
}

/**
 * 駒・碁石・null を盤上の特定の位置に配置する。can_castle フラグと can_kumal フラグを適宜調整する。
 * @param board 
 * @param coord 
 * @param maybe_entity 
 * @returns 
 */
export function put_entity_at_coord_and_also_adjust_flags(board: Board, coord: Coordinate, maybe_entity: Entity | null) {
    const [column, row] = coord;
    const row_index = "一二三四五六七八九".indexOf(row);
    const column_index = "９８７６５４３２１".indexOf(column);
    if (row_index === -1 || column_index === -1) {
        throw new Error(`座標「${displayCoord(coord)}」は不正です`)
    }

    if (maybe_entity?.type === "王") {
        if (maybe_entity.never_moved) {
            maybe_entity.never_moved = false;
            maybe_entity.has_moved_only_once = true;
        } else if (maybe_entity.has_moved_only_once) {
            maybe_entity.never_moved = false;
            maybe_entity.has_moved_only_once = false;
        }
    } else if (maybe_entity?.type === "しょ" && maybe_entity.prof === "香") {
        maybe_entity.can_kumal = false;
    } else if (maybe_entity?.type === "ス") {
        maybe_entity.never_moved = false;
    }
    return board[row_index]![column_index] = maybe_entity;
}

export function lookup_coord_from_side_and_prof(board: Readonly<Board>, side: Side, prof: Profession): Coordinate[] {
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
