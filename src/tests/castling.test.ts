import { main } from "..";

test('castling', () => {
	expect(main([
		{ piece_phase: { side: "黒", to: ["４", "六"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["５", "六"], prof: "ビ" } },
		{ piece_phase: { side: "白", to: ["５", "四"], prof: "ビ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["３", "四"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["４", "七"], prof: "ク" } },
		{ piece_phase: { side: "白", to: ["４", "二"], prof: "キ" } },
		{ piece_phase: { side: "黒", to: ["６", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["２", "二"], prof: "キ" } }, // castle
		{ piece_phase: { side: "黒", to: ["４", "八"], prof: "キ" } }, // castle
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
				null,
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
				{ type: "ス", side: "白", prof: "ル", never_moved: false },
				{ type: "王", side: "白", prof: "キ", never_moved: false, has_moved_only_once: false },
				null,
			],
			[
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				null,
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
			],
			[null, null, null, null, { type: "ス", side: "白", prof: "ビ", never_moved: false }, { type: "ス", side: "白", prof: "ポ", never_moved: false }, { type: "ス", side: "白", prof: "ナ", never_moved: false }, null, null,],
			[null, null, null, null, null, null, null, null, null,],
			[null, null, null, null, { type: "ス", side: "黒", prof: "ビ", never_moved: false }, { type: "ス", side: "黒", prof: "ポ", never_moved: false }, { type: "ス", side: "黒", prof: "ナ", never_moved: false }, null, null,],
			[
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ク", never_moved: false },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
			],
			[
				{ type: "ス", side: "黒", prof: "ル", never_moved: true },
				{ type: "ス", side: "黒", prof: "ナ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ビ", never_moved: true },
				null,
				{ type: "ス", side: "黒", prof: "ル", never_moved: false },
				{ type: "王", side: "黒", prof: "キ", never_moved: false, has_moved_only_once: false },
				null,
				null,
				null
			],
			[
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				null,
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		]
	});
});

test('castling to the left', () => {
	expect(main([
		{ piece_phase: { side: "黒", to: ["６", "六"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["６", "四"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["５", "六"], prof: "ビ" } },
		{ piece_phase: { side: "白", to: ["５", "四"], prof: "ビ" } },
		{ piece_phase: { side: "黒", to: ["７", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["７", "四"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["６", "七"], prof: "ク" } },
		{ piece_phase: { side: "白", to: ["６", "二"], prof: "キ" } },
		{ piece_phase: { side: "黒", to: ["４", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["８", "二"], prof: "キ" } }, // castle
		{ piece_phase: { side: "黒", to: ["６", "八"], prof: "キ" } }, // castle
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
				null,
				{ type: "しょ", side: "白", prof: "金", can_kumal: false },
				{ type: "しょ", side: "白", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "白", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "白", prof: "香", can_kumal: true },
			],
			[
				null,
				{ type: "王", side: "白", prof: "キ", never_moved: false, has_moved_only_once: false },
				{ type: "ス", side: "白", prof: "ル", never_moved: false },
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
				null,
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
				{ type: "ス", side: "白", prof: "ポ", never_moved: true },
			],
			[
				null,
				null, 
				{ type: "ス", side: "白", prof: "ナ", never_moved: false }, 
				{ type: "ス", side: "白", prof: "ポ", never_moved: false }, 
				{ type: "ス", side: "白", prof: "ビ", never_moved: false }, 
				null,
				null,
				null,
				null,
			],
			[null, null, null, null, null, null, null, null, null,],
			[
				null,
				null, 
				{ type: "ス", side: "黒", prof: "ナ", never_moved: false }, 
				{ type: "ス", side: "黒", prof: "ポ", never_moved: false }, 
				{ type: "ス", side: "黒", prof: "ビ", never_moved: false }, 
				null,
				null,
				null,
				null, 
			],
			[
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ク", never_moved: false },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
				{ type: "ス", side: "黒", prof: "ポ", never_moved: true },
			],
			[
				null,
				null,
				null,
				{ type: "王", side: "黒", prof: "キ", never_moved: false, has_moved_only_once: false },
				{ type: "ス", side: "黒", prof: "ル", never_moved: false },
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
				null,
				{ type: "しょ", side: "黒", prof: "金", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "銀", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "桂", can_kumal: false },
				{ type: "しょ", side: "黒", prof: "香", can_kumal: true },
			],
		]
	});
});

test('castling failure by piece', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["４", "六"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["４", "二"], prof: "キ" } },
		{ piece_phase: { side: "黒", to: ["６", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["２", "二"], prof: "キ" } }, // castle
	])).toThrowError("白が４二から２二へとキング王をキャスリングしようとしていますが、キング王とルークの間に駒があるのでキャスリングできません")
});

test('not a castling', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["４", "六"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["４", "二"], prof: "キ" } },
		{ piece_phase: { side: "黒", to: ["６", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["５", "五"], prof: "キ" } }, 
	])).toThrowError("白が５五キとのことですが、そのような移動ができる白のキング王は盤上にありません")
});

test('not a castling', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["４", "六"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["４", "二"], prof: "キ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["５", "一"], prof: "キ" } },
		{ piece_phase: { side: "黒", to: ["６", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["５", "五"], prof: "キ" } },
	])).toThrowError("白が５五キとのことですが、そのような移動ができる白のキング王は盤上にありません")
});


test('castling failure by rook not being there', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["４", "六"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["５", "六"], prof: "ビ" } },
		{ piece_phase: { side: "白", to: ["５", "四"], prof: "ビ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["３", "四"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["４", "七"], prof: "ク" } },
		{ piece_phase: { side: "白", to: ["４", "二"], prof: "キ" } },
		{ piece_phase: { side: "黒", to: ["２", "八"], prof: "ル" } },
		{ piece_phase: { side: "白", to: ["２", "二"], prof: "ル" } },
		{ piece_phase: { side: "黒", to: ["６", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["２", "二"], prof: "キ" } }, // castle
	])).toThrowError("白が４二から２二へとキング王をキャスリングしようとしていますが、１二にルークがないのでキャスリングできません");
});

test('castling failure by rook having moved', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["４", "六"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["５", "六"], prof: "ビ" } },
		{ piece_phase: { side: "白", to: ["５", "四"], prof: "ビ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["３", "四"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["４", "七"], prof: "ク" } },
		{ piece_phase: { side: "白", to: ["４", "二"], prof: "キ" } },
		{ piece_phase: { side: "黒", to: ["２", "八"], prof: "ル" } },
		{ piece_phase: { side: "白", to: ["２", "二"], prof: "ル" } },
		{ piece_phase: { side: "黒", to: ["１", "八"], prof: "ル" } },
		{ piece_phase: { side: "白", to: ["１", "二"], prof: "ル" } },
		{ piece_phase: { side: "黒", to: ["６", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["２", "二"], prof: "キ" } }, // castle
	])).toThrowError("白が４二から２二へとキング王をキャスリングしようとしていますが、１二にあるルークは既に動いたことがあるルークなのでキャスリングできません");
});

test('castling failure by being in check', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["４", "五"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["３", "四"], prof: "ク" } },
		{ piece_phase: { side: "黒", to: ["４", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["４", "五"], prof: "ク" } },
		{ piece_phase: { side: "黒", to: ["２", "八"], prof: "キ" } }, // castle
	])).toThrowError("黒が４八から２八へとキング王をキャスリングしようとしていますが、相手からの王手（チェック）が掛かっているのでキャスリングできません")
});

test('castling failure by enemy seeing the square that the king moves through', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["４", "六"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["３", "四"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["２", "六"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["４", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["７", "四"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["２", "八"], prof: "キ" } }, // castle
	])).toThrowError("黒が４八から２八へとキング王をキャスリングしようとしていますが、通過点のマスに敵の駒の利きがあるのでキャスリングできません")
});

test('castling failure by enemy seeing the square that the king ends up in', () => {
	expect(() => main([
		{ piece_phase: { side: "黒", to: ["４", "五"], prof: "ポ" } },
		{ piece_phase: { side: "白", to: ["７", "四"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["３", "六"], prof: "ナ" } },
		{ piece_phase: { side: "白", to: ["６", "六"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["４", "八"], prof: "キ" } },
		{ piece_phase: { side: "白", to: ["４", "七"], prof: "ナ" } },
		{ piece_phase: { side: "黒", to: ["２", "八"], prof: "キ" } }, // castle
	])).toThrowError("黒が４八から２八へとキング王をキャスリングしようとしていますが、移動先のマスに敵の駒の利きがあるのでキャスリングできません")
});