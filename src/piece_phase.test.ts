import { disambiguate_piece_phase_and_apply, is_reachable } from "./piece_phase"
import { get_initial_state } from "./index"
import { PiecePhasePlayed } from "./type";
import { put_entity_at_coord_and_also_adjust_flags } from "./board";

test('is_reachable_queen', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["５", "八"], to: ["４", "八"] })).toBe(true);
});
test('is_reachable_gold', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["４", "九"], to: ["４", "八"] })).toBe(true);
});
test('is_reachable_gold_overlapping', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["４", "九"], to: ["３", "九"] })).toBe(true);
});
test('is_reachable_silver', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["３", "九"], to: ["４", "八"] })).toBe(true);
});
test('is_reachable_silver_not', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["３", "九"], to: ["４", "九"] })).toBe(false);
});
test('fully specified', () => {
	const knight_move: PiecePhasePlayed = disambiguate_piece_phase_and_apply(
		get_initial_state("黒"), 
		{ side: "黒", to: ["１", "六"], from: ["２", "八"], prof: "ナ" }
	);
	expect(knight_move).toEqual({
		phase: "piece_phase_played",
		board: [
			[
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "王", side: "白", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
			],
			[
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
			],
			[
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
			],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, { type: "ス", side: "黒", prof: "ナ", never_moved: false },],
			[
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
			],
			[
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null, 
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
			],
			[
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "王", side: "黒", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		],
		hand_of_black: [],
		hand_of_white: [],
		by_whom: "黒"
	})
});


test('５八金右', () => {
	const state = get_initial_state("黒");

	// First, destroy the queen
	put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "八"], null);
	
	const gold_move: PiecePhasePlayed = disambiguate_piece_phase_and_apply(
		state, 
		{ side: "黒", to: ["５", "八"], from: "右", prof: "金" }
	);
	expect(gold_move).toEqual({
		phase: "piece_phase_played",
		board: [
			[
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "王", side: "白", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
			],
			[
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
			],
			[
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
			],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
			],
			[
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null,
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				null,
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
			],
			[
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "王", side: "黒", prof: "キ", never_moved: true, has_moved_only_once: false },
				null,
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		],
		hand_of_black: [],
		hand_of_white: [],
		by_whom: "黒"
	})
});

test('５八金左', () => {
	const state = get_initial_state("黒");

	// First, destroy the queen
	put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "八"], null);
	
	const gold_move: PiecePhasePlayed = disambiguate_piece_phase_and_apply(
		state, 
		{ side: "黒", to: ["５", "八"], from: "左", prof: "金" }
	);
	expect(gold_move).toEqual({
		phase: "piece_phase_played",
		board: [
			[
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "王", side: "白", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
			],
			[
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
			],
			[
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
			],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
			],
			[
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null,
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				null,
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
			],
			[
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				null,
				{ type: "王", side: "黒", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		],
		hand_of_black: [],
		hand_of_white: [],
		by_whom: "黒"
	})
});

test('５二金右', () => {
	const state = get_initial_state("白");

	// First, destroy the queen
	put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "二"], null);
	
	const gold_move: PiecePhasePlayed = disambiguate_piece_phase_and_apply(
		state, 
		{ side: "白", to: ["５", "二"], from: "右", prof: "金" }
	);
	expect(gold_move).toEqual({
		phase: "piece_phase_played",
		board: [
			[
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				null,
				{ type: "王", side: "白", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
			],
			[
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				null,
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				null,
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
			],
			[
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
			],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
			],
			[
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
			],
			[
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "王", side: "黒", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		],
		hand_of_black: [],
		hand_of_white: [],
		by_whom: "白"
	})
});

test('５二金左', () => {
	const state = get_initial_state("白");

	// First, destroy the queen
	put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "二"], null);
	
	const gold_move: PiecePhasePlayed = disambiguate_piece_phase_and_apply(
		state, 
		{ side: "白", to: ["５", "二"], from: "左", prof: "金" }
	);
	expect(gold_move).toEqual({
		phase: "piece_phase_played",
		board: [
			[
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "王", side: "白", prof: "キ", never_moved: true, has_moved_only_once: false },
				null,
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
			],
			[
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				null,
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				null,
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
			],
			[
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
			],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
			],
			[
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
			],
			[
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "王", side: "黒", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		],
		hand_of_black: [],
		hand_of_white: [],
		by_whom: "白"
	})
});

/*
test('disambiguate', () => {
	const knight_move: PiecePhasePlayed = disambiguate_piece_phase_and_apply(get_initial_state("黒"), { side: "黒", to: ["１", "六"], prof: "ナ" });
	expect(knight_move).toEqual({
		phase: "piece_phase_played",
		board: [
			[
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "王", side: "白", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
			],
			[
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ビ", never_moved: true },
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
			],
			[
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
			],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, null, null, null, null, { type: "ス", side: "黒", prof: "ナ", never_moved: true },],
			[
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
			],
			[
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null, 
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
			],
			[
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "王", side: "黒", prof: "キ", never_moved: true, has_moved_only_once: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		],
		hand_of_black: [],
		hand_of_white: [],
		by_whom: "黒"
	})
})
*/