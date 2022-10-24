import { from_custom_state, get_initial_state, main } from "..";
import { put_entity_at_coord_and_also_adjust_flags } from "../board";

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
