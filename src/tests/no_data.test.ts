import { from_custom_state, get_initial_state, main } from "..";
import { put_entity_at_coord_and_also_adjust_flags } from "../board";

test("main は空の棋譜を許さない（どちらサイドを先手にすべきか判定できないので）", () => {
    expect(() => main([
    ])).toThrowError(`棋譜が空です`);
});

test("from_custom_state は空の棋譜を許す（どちらを先手にするかは initial_state 引数で分かるので）", () => {
    const state = get_initial_state("黒");
    put_entity_at_coord_and_also_adjust_flags(state.board, ["５", "七"], null);
    expect(from_custom_state([
    ], state)).toEqual({
        phase: "resolved",
        hand_of_black: [],
        hand_of_white: [],
        who_goes_next: "黒",
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
                null,
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
    });
});