import { Board, clone_entity, Entity, Profession } from "./type";
import { Coordinate, displayCoord, ShogiColumnName, ShogiRowName } from "./coordinate";
import { Side } from "./side";
export function get_entity_from_coord<T>(board: Readonly<(T | null)[][]>, coord: Coordinate): T | null {
    const [column, row] = coord;
    const row_index = "一二三四五六七八九".indexOf(row);
    const column_index = "９８７６５４３２１".indexOf(column);
    if (row_index === -1 || column_index === -1) {
        throw new Error(`座標「${displayCoord(coord)}」は不正です`)
    }
    return (board[row_index]?.[column_index]) ?? null;
}

export function clone_board(board: Readonly<Board>): Board {
    return board.map(row => row.map(sq => sq === null ? null : clone_entity(sq))) as Board
}

export function delete_en_passant_flag(board: Board, coord: Coordinate): void {
    const [column, row] = coord;
    const row_index = "一二三四五六七八九".indexOf(row);
    const column_index = "９８７６５４３２１".indexOf(column);
    if (row_index === -1 || column_index === -1) {
        throw new Error(`座標「${displayCoord(coord)}」は不正です`)
    }

    const pawn = board[row_index]![column_index];
    if (pawn?.type !== "ス" || pawn.prof !== "ポ") {
        throw new Error(`ポーンのない座標「${displayCoord(coord)}」に対して \`delete_en_passant_flag()\` が呼ばれました`);
    }
    delete pawn.subject_to_en_passant;
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

export function lookup_coords_from_side_and_prof(board: Readonly<Board>, side: Side, prof: Profession): Coordinate[] {
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

export function lookup_coords_from_side(board: Readonly<Board>, side: Side): Coordinate[] {
    const ans: Coordinate[] = [];
    const rows: ShogiRowName[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const cols: ShogiColumnName[] = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];
    for (const row of rows) {
        for (const col of cols) {
            const coord: Coordinate = [col, row];
            const entity = get_entity_from_coord(board, coord);
            if (entity === null || entity.type === "碁") {
                continue;
            } else if (entity.side === side) {
                ans.push(coord)
            } else {
                continue;
            }
        }
    }
    return ans;
}
