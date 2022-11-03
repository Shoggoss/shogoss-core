import { from_custom_state, get_initial_state, main } from "..";
import { put_entity_at_coord_and_also_adjust_flags } from "../board";

test("ナイトの範囲外", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["３", "五"], "prof": "ナ" }, },
    ])).toThrowError(`黒が３五ナとのことですが、そのような移動ができる黒のナイトは盤上にありません`);
});

test("クィーンの範囲外", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["３", "五"], "prof": "ク" }, },
    ])).toThrowError(`黒が３五クとのことですが、そのような移動ができる黒のクィーンは盤上にありません`);
});

test("キングの範囲外", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["３", "五"], "prof": "キ" }, },
    ])).toThrowError(`黒が３五キとのことですが、そのような移動ができる黒のキング王は盤上にありません`);
});

test("ビショップの範囲外", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["３", "五"], "prof": "ビ" }, },
    ])).toThrowError(`黒が３五ビとのことですが、そのような移動ができる黒のビショップは盤上にありません`);
});

test("ルークの範囲外", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["３", "五"], "prof": "ル" }, },
    ])).toThrowError(`黒が３五ルとのことですが、そのような移動ができる黒のルークは盤上にありません`);
});

test("とクィーンの範囲外", () => {
    const state = get_initial_state("黒");
    put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "五"], { type: "ス", prof: "と", side: "黒", never_moved: true });
    expect(() => from_custom_state([
        { piece_phase: { side: "黒", to: ["７", "六"], prof: "と" } }
    ], state)).toThrowError(`黒が７六ととのことですが、そのような移動ができる黒のとクィーンは盤上にありません`);
});

test("成桂の範囲外", () => {
    const state = get_initial_state("黒");
    put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "五"], { type: "しょ", prof: "成桂", side: "黒", can_kumal: false });
    expect(() => from_custom_state([
        { piece_phase: { side: "黒", to: ["７", "六"], prof: "成桂" } }
    ], state)).toThrowError(`黒が７六成桂とのことですが、そのような移動ができる黒の成桂は盤上にありません`);
});

test("ない駒の移動", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["３", "五"], from: ["５", "五"], "prof": "ポ" }, },
    ])).toThrowError(`黒が５五から３五へとポーン兵を動かそうとしていますが、５五には黒のポーン兵はありません`);
});

test("碁石の移動", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["７", "五"], "prof": "ポ" }, "stone_to": ["５", "五"] },
        { "piece_phase": { "side": "白", "to": ["３", "四"], "prof": "ナ" }, "stone_to": ["１", "四"] },
        { "piece_phase": { "side": "黒", "to": ["３", "五"], from: ["５", "五"], "prof": "ポ" }, },
    ])).toThrowError(`黒が５五から３五へとポーン兵を動かそうとしていますが、５五には黒のポーン兵はありません`);
});
