import { from_custom_state, get_initial_state, main } from "..";
import { put_entity_at_coord_and_also_adjust_flags } from "../board";

test('promotion', () => {
	const state = get_initial_state("黒");

	put_entity_at_coord_and_also_adjust_flags(state.board, ["４", "四"], { type: "しょ", prof: "香", side: "黒", can_kumal: false });
	put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "四"], { type: "しょ", prof: "桂", side: "黒", can_kumal: false });
	put_entity_at_coord_and_also_adjust_flags(state.board, ["６", "四"], { type: "しょ", prof: "銀", side: "黒", can_kumal: false });

	expect(from_custom_state([
		{ piece_phase: { side: "黒", to: ["４", "三"], prof: "香", promotes: true } },
		{ piece_phase: { side: "白", to: ["４", "三"], prof: "ビ" } },
		{ piece_phase: { side: "黒", to: ["４", "二"], prof: "桂", promotes: true } },
		{ piece_phase: { side: "白", to: ["４", "二"], prof: "ク" } },
		{ piece_phase: { side: "黒", to: ["５", "三"], prof: "銀", promotes: true } },
	], state)).toEqual({
		phase: "resolved",
		hand_of_black: [],
		hand_of_white: ["香", "桂"],
		who_goes_next: "白",
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
				null,
				{ type: "ス", side: "白", prof: "ク", never_moved: false },
				null,
				{ type: "ス", side: "白", prof: "ナ", never_moved: true },
				{ type: "ス", side: "白", prof: "ル", never_moved: true },
			],
			[
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "しょ", side: "黒", prof: "成銀", can_kumal: false },
				{ type: "ス", side: "白", prof: "ビ", never_moved: false },
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
		]
	})
});

test("成れないときに「成」", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["７", "六"], "prof": "ポ", promotes: true }, },
    ])).toThrowError(`黒が７六ポ成とのことですが、この移動は成りを発生させないので「成」表記はできません`);
});

test("そもそも成れないときに「不成」", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["７", "六"], "prof": "ポ", promotes: false }, },
    ])).toThrowError(`黒が７六ポ不成とのことですが、この移動は成りを発生させないので「不成」表記はできません`);
});