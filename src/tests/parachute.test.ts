import { from_custom_state, get_initial_state } from "..";
import { put_entity_at_coord_and_also_adjust_flags } from "../board";


test("既に埋まっている", () => {
    const state = get_initial_state("黒");
    put_entity_at_coord_and_also_adjust_flags(state.board, ["３", "六"], { type: "しょ", prof: "香", can_kumal: false, side: "白" })
    expect(() => from_custom_state([
        { "piece_phase": { "side": "黒", "to": ["３", "六"], "prof": "ポ" } },
        { "piece_phase": { "side": "白", "to": ["３", "四"], "prof": "ポ" } },
        { "piece_phase": { "side": "黒", "to": ["１", "三"], "prof": "香" } },
    ], state)).toThrowError(`黒が１三香打とのことですが、１三マスは既に埋まっています`);
});
