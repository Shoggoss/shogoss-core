import { main } from "..";

test('左くまりんぐ', () => {
	expect(main([
		{ piece_phase: { side: "黒", to: ["９", "九"], prof: "キ" } }, // kumaling
	])).toEqual({
		phase: "resolved",
		hand_of_black: [],
		hand_of_white: [],
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
				{ type: "ス", side: "黒", prof: "ク", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
			],
			[
				{ type: "王", side: "黒", prof: "キ", never_moved: false, has_moved_only_once: true },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		]
	})
});

test('右くまりんぐ', () => {
	expect(main([
		{ piece_phase: { side: "黒", to: ["１", "九"], prof: "キ" } }, // kumaling
	])).toEqual({
		phase: "resolved",
		hand_of_black: [],
		hand_of_white: [],
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
				{ type: "しょ", side: "黒", prof: "香", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "王", side: "黒", prof: "キ", never_moved: false, has_moved_only_once: true },
			],
		]
	})
});

test('香車がなくてくまりんぐができない', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["１", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["４", "五"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["２", "八"], prof: "ル" } },
		{ piece_phase: { side: "白", to: ["５", "四"], prof: "ビ" } },
		{ piece_phase: { side: "黒", to: ["１", "八"], prof: "香" } },
		{ piece_phase: { side: "白", to: ["１", "六"], prof: "ク" } },
		{ piece_phase: { side: "黒", to: ["１", "九"], prof: "キ" } }, // kumaling
	])).toThrowError("キング王が５九から１九へ動くくまりんぐを黒が試みていますが、１九には駒がありません")
});

test('香車じゃなくて碁石があるのでくまりんぐができない', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["１", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["４", "五"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["２", "八"], prof: "ル" } },
		{ piece_phase: { side: "白", to: ["５", "四"], prof: "ビ" } },
		{ piece_phase: { side: "黒", to: ["１", "八"], prof: "香" }, stone_to: ["１", "九"] },
		{ piece_phase: { side: "白", to: ["１", "六"], prof: "ク" } },
		{ piece_phase: { side: "黒", to: ["１", "九"], prof: "キ" } }, // kumaling
	])).toThrowError("キング王が５九から１九へ動くくまりんぐを黒が試みていますが、１九にあるのは香車ではなく碁石です")
});