import { Side } from "./type";

type GoSquare = "empty" | { side: Side, visited: boolean, connected_component_index: number };

export function remove_surrounded(color_to_be_removed: Side, board: (Side | null)[][]): (Side | null)[][] {
    const board_: GoSquare[][] = board.map(
        row => row.map(
            side => side === null ? "empty" : { side, visited: false, connected_component_index: -1 }
        )
    );

    // Depth-first search to assign a unique index to each connected component
    // 各連結成分に一意なインデックスをふるための深さ優先探索
    const dfs_stack: { i: number, j: number }[] = [];
    const indices_that_survive: number[] = [];
    let index = 0;
    for (let I = 0; I < board_.length; I++) {
        for (let J = 0; J < board_[I]!.length; J++) {
            const sq = board_[I]![J]!;
            if (sq !== "empty" && sq.side === color_to_be_removed && !sq.visited) {
                dfs_stack.push({ i: I, j: J });
            }
            while (dfs_stack.length > 0) {
                const vertex_coord = dfs_stack.pop()!;
                const vertex = board_[vertex_coord.i]![vertex_coord.j]!;
                if (vertex === "empty") {
                    // `dfs_stack` に空のマスはプッシュされていないはず
                    // an empty square should not be pushed to `dfs_stack`
                    throw new Error("should not reach here");
                }
                vertex.visited = true;
                vertex.connected_component_index = index;
                [
                    { i: vertex_coord.i, j: vertex_coord.j + 1 },
                    { i: vertex_coord.i, j: vertex_coord.j - 1 },
                    { i: vertex_coord.i + 1, j: vertex_coord.j },
                    { i: vertex_coord.i - 1, j: vertex_coord.j },
                ].filter(
                    ({ i, j }) => { const row = board_[i]; return row && 0 <= j && j < row.length; }
                ).forEach(
                    ({ i, j }) => {
                        const neighbor = board_[i]![j]!;
                        if (neighbor === "empty") {
                            // next to an empty square (a liberty); survives.
                            // 呼吸点が隣接しているので、この index が振られている連結成分は丸々生き延びる
                            indices_that_survive.push(index);
                        } else if (neighbor.side === color_to_be_removed && !neighbor.visited) {
                            dfs_stack.push({ i, j });
                        }
                    }
                );
            }
            index++;
        }
    }

    // indices_that_survive に記載のない index のやつらを削除して ans へと転記
    // Copy the content to `ans` while deleting the connected components whose index is not in `indices_that_survive`
    const ans: (Side | null)[][] = [];
    for (let I = 0; I < board_.length; I++) {
        const row: (Side | null)[] = [];
        for (let J = 0; J < board_[I]!.length; J++) {
            const sq = board_[I]![J]!;
            if (sq === "empty") {
                row.push(null);
            } else if (sq.side === color_to_be_removed
                && !indices_that_survive.includes(sq.connected_component_index)) {
                    // does not survive
                row.push(null);
            } else {
                row.push(sq.side);
            }
        }
        ans.push(row);
    }
    return ans;
}

