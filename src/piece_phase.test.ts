import { play_piece_phase, can_move } from "./piece_phase"
import { get_initial_state } from "./index"
import { PiecePhasePlayed } from "./type";
import { put_entity_at_coord_and_also_adjust_flags } from "./board";
import { can_see } from "./can_see";

test('what pawn can see / how a pawn can move', () => {
	const state = get_initial_state("黒");

	// 真ん中のポーンを破壊しておく
	// destroy the pawn in the center rank
	put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "七"], null);

	put_entity_at_coord_and_also_adjust_flags(state.board, ["９", "六"], { prof: "ビ", never_moved: false, type: "ス", side: "白" })

	// ポーンの「利き」は 2 マス前進を含まない
	// cannot see two squares in front
	expect(can_see(state.board, { from: ["６", "七"], to: ["６", "六"] })).toBe(true);
	expect(can_see(state.board, { from: ["６", "七"], to: ["６", "五"] })).toBe(false);

	// 妨げがないので、前に 1 歩でも 2 歩でも進める
	// no obstruction; can move one or two steps forward
	expect(can_move(state.board, { from: ["６", "七"], to: ["６", "六"] })).toBe(true);
	expect(can_move(state.board, { from: ["６", "七"], to: ["６", "五"] })).toBe(true);

	// 妨げがあるので、前に 1 歩しか進めない
	expect(can_move(state.board, { from: ["９", "七"], to: ["９", "六"] })).toBe(true);
	expect(can_move(state.board, { from: ["９", "七"], to: ["９", "五"] })).toBe(false);


	// 「利き」はポーンの斜め移動を常に含むものとする
	// the concept of `see` always includes the diagonal movement
	expect(can_see(state.board, { from: ["６", "七"], to: ["５", "六"] })).toBe(true);

	// しかし、行き先に駒がないので、移動することはできない
	// however, there is no piece at the destination, and therefore cannot actually go there
	expect(can_move(state.board, { from: ["６", "七"], to: ["５", "六"] })).toBe(false);
});

test('fully specified', () => {
	const knight_move: PiecePhasePlayed = play_piece_phase(
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
