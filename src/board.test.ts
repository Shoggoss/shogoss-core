import { get_initial_state } from "./index"
import { get_entity_from_coord, lookup_coord_from_side_and_prof, put_entity_at_coord_and_also_adjust_flags } from "./board"
import { ShogiColumnName, ShogiRowName } from "./coordinate";

test('get_entity_from_coord_gold', () => {
	expect(get_entity_from_coord(get_initial_state("黒").board, ["４", "九"]))
		.toEqual({ type: "しょ", side: "黒", prof: "金", can_kumal: false });
});

test('get_entity_from_coord_queen', () => {
	expect(get_entity_from_coord(get_initial_state("黒").board, ["５", "八"]))
		.toEqual({ type: "ス", side: "黒", prof: "ク", never_moved: true });
});

test('get_entity_from_coord_gold', () => {
	expect(get_entity_from_coord(get_initial_state("黒").board, ["５", "九"]))
		.toEqual({ type: "王", side: "黒", prof: "キ", never_moved: true, has_moved_only_once: false });
});

test('get_entity_from_coord_throw', () => {
	expect(() => get_entity_from_coord(get_initial_state("黒").board, ["ク" as ShogiColumnName, "トゥ" as ShogiRowName]))
		.toThrow("座標「クトゥ」は不正です");
});

test('get_entity_from_coord_throw', () => {
	expect(() => get_entity_from_coord(get_initial_state("黒").board, ["５", "百" as ShogiRowName]))
		.toThrow("座標「５百」は不正です");
});

test('lookup_coord', () => {
	expect(lookup_coord_from_side_and_prof(get_initial_state("黒").board, "黒", "ビ")).toEqual([
		["３", "八"],
		["７", "八"],
	])
})

test('piece_move', () => {
	const board = get_initial_state("黒").board;
	const king = get_entity_from_coord(board, ["５", "九"]);
	put_entity_at_coord_and_also_adjust_flags(board, ["５", "九"], null);
	put_entity_at_coord_and_also_adjust_flags(board, ["４", "八"], king);
	const king2 = get_entity_from_coord(board, ["４", "八"]);
	expect(king2).toEqual({
		type: "王", side: "黒", prof: "キ",
		never_moved: false, has_moved_only_once: true
	});
	put_entity_at_coord_and_also_adjust_flags(board, ["４", "八"], null);
	put_entity_at_coord_and_also_adjust_flags(board, ["５", "九"], king2);
	expect(get_entity_from_coord(board, ["５", "九"])).toEqual({
		type: "王", side: "黒", prof: "キ",
		never_moved: false, has_moved_only_once: false
	});

	const lance = get_entity_from_coord(board, ["１", "九"]);
	put_entity_at_coord_and_also_adjust_flags(board, ["１", "九"], null);
	put_entity_at_coord_and_also_adjust_flags(board, ["５", "四"], lance);
	expect(get_entity_from_coord(board, ["５", "四"])).toEqual({ type: "しょ", side: "黒", prof: "香", can_kumal: false });

	const queen = get_entity_from_coord(board, ["５", "八"]);
	put_entity_at_coord_and_also_adjust_flags(board, ["５", "八"], null);
	put_entity_at_coord_and_also_adjust_flags(board, ["５", "五"], queen);
	expect(get_entity_from_coord(board, ["５", "五"])).toEqual( { type: "ス", side: "黒", prof: "ク", never_moved: false });

});
