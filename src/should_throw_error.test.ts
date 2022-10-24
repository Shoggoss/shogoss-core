import { from_custom_state, get_initial_state, main } from ".";
import { put_entity_at_coord_and_also_adjust_flags } from "./board";

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

test('en passant fails', () => {
    const state = get_initial_state("黒");

    // destroy the pawn at ５七 to avoid 二ポ
    put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "七"], null);

    // Cannot do en passant, since there are intervening moves
    expect(() => from_custom_state([
        { piece_phase: { side: "黒", to: ["６", "五"], prof: "ポ" } },
        { piece_phase: { side: "白", to: ["５", "五"], prof: "ポ" } },
        { piece_phase: { side: "黒", to: ["７", "六"], prof: "ナ" } },
        { piece_phase: { side: "白", to: ["７", "四"], prof: "ナ" } },
        { piece_phase: { side: "黒", to: ["５", "四"], prof: "ポ" } },
    ], state)).toThrowError("黒が５四ポとのことですが、そのような移動ができる黒のポーン兵は盤上にありません");
});

test("行きどころのない桂馬", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["７", "六"], "prof": "ポ" }, },
        { "piece_phase": { "side": "白", "to": ["７", "四"], "prof": "ポ" }, },
        { "piece_phase": { "side": "黒", "to": ["７", "七"], "prof": "桂" }, },
        { "piece_phase": { "side": "白", "to": ["７", "三"], "prof": "桂" }, },
        { "piece_phase": { "side": "黒", "to": ["８", "五"], "prof": "桂" }, },
        { "piece_phase": { "side": "白", "to": ["８", "五"], "prof": "桂" }, },
        { "piece_phase": { "side": "黒", "to": ["８", "九"], "prof": "ビ" }, },
        { "piece_phase": { "side": "白", "to": ["６", "八"], "prof": "桂" }, },
    ])).toThrowError(`白が６八桂打とのことですが、行きどころのない桂馬は打てません`);
});

test("行きどころのない香車", () => {
    const state = get_initial_state("黒");
    put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "六"],
        { prof: "香", type: "しょ", side: "白", can_kumal: false }
    );
    expect(() =>
        from_custom_state([
            { "piece_phase": { "side": "黒", "to": ["５", "六"], "prof": "ポ" }, },
            { "piece_phase": { "side": "白", "to": ["４", "二"], "prof": "銀" }, },
            { "piece_phase": { "side": "黒", "to": ["３", "一"], "prof": "香" }, },
    ], state)).toThrowError(`黒が３一香打とのことですが、行きどころのない香車は打てません`)
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