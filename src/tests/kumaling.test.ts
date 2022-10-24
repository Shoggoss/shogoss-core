import { main } from "..";

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