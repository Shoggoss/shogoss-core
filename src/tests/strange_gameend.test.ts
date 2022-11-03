import { main } from "..";

test("王の自殺", () => {
    const king_suicide = main([
        { piece_phase: { side: "黒", to: ["４", "五"], prof: "ポ" } },
        { piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" }, stone_to: ["３", "四"] },
        { piece_phase: { side: "黒", to: ["４", "八"], prof: "キ" } },
        { piece_phase: { side: "白", to: ["４", "五"], prof: "ポ" } },
        { piece_phase: { side: "黒", to: ["４", "七"], prof: "キ" } },
        { piece_phase: { side: "白", to: ["２", "五"], prof: "ポ" } },
        { piece_phase: { side: "黒", to: ["４", "六"], prof: "キ" } },
        { piece_phase: { side: "白", to: ["１", "四"], prof: "ナ" }, stone_to: ["３", "六"] },
        { piece_phase: { side: "黒", to: ["３", "五"], prof: "キ" } }
    ]);
    if (king_suicide.phase === "resolved") { throw new Error(""); }
    expect(king_suicide.victor).toEqual("白");
    expect(king_suicide.reason).toEqual("king_suicide")
});

test("王を取ってニポ", () => {

    const 王取りニポ = main([
        { piece_phase: { side: "黒", to: ["４", "五"], prof: "ポ" } },
        { piece_phase: { side: "白", to: ["３", "四"], prof: "ポ" } },
        { piece_phase: { side: "黒", to: ["４", "八"], prof: "キ" } },
        { piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" } },
        { piece_phase: { side: "黒", to: ["４", "七"], prof: "キ" } },
        { piece_phase: { side: "白", to: ["４", "五"], prof: "ポ" } },
        { piece_phase: { side: "黒", to: ["３", "六"], prof: "キ" } },
        { piece_phase: { side: "白", to: ["３", "六"], prof: "ポ", from: ["４", "五"] } },
    ]);
    if (王取りニポ.phase === "resolved") { throw new Error(""); }
    expect(王取りニポ.victor).toEqual("KarateJankenBoxing");
    expect(王取りニポ.reason).toEqual("king_capture_and_doubled_pawns")
});


test("王が敵陣に突っ込んでKJB", () => {

    const 王が敵陣に突っ込む = main([
        { piece_phase: { side: "白", to: ["４", "二"], prof: "キ" } },
        { piece_phase: { side: "黒", to: ["４", "八"], prof: "キ" }, stone_to: ["３", "五"] },
        { piece_phase: { side: "白", to: ["４", "四"], prof: "ポ" } },
        { piece_phase: { side: "黒", to: ["４", "六"], prof: "ポ" }, stone_to: ["２", "六"] },
        { piece_phase: { side: "白", to: ["４", "三"], prof: "キ" } },
        { piece_phase: { side: "黒", to: ["４", "七"], prof: "キ" } },
        { piece_phase: { side: "白", to: ["３", "四"], prof: "キ" } },
        { piece_phase: { side: "黒", to: ["３", "六"], prof: "キ" } },
        { piece_phase: { side: "白", to: ["２", "五"], prof: "キ" } },
        { piece_phase: { side: "黒", to: ["４", "八"], prof: "ク" } },
        { piece_phase: { side: "白", to: ["３", "六"], prof: "キ" } },

    ]);
    if (王が敵陣に突っ込む.phase === "resolved") { throw new Error(""); }
    expect(王が敵陣に突っ込む.victor).toEqual("KarateJankenBoxing");
    expect(王が敵陣に突っ込む.reason).toEqual("both_king_dead")
});

test("アンパッサンニポ", () => {
    const king_suicide = main([
        { piece_phase: { side: "黒", to: ["４", "五"], prof: "ポ" } },
        { piece_phase: { side: "白", to: ["３", "五"], prof: "ポ" } },
        { piece_phase: { side: "黒", to: ["３", "四"], prof: "ポ" } },
    ]);
    if (king_suicide.phase === "resolved") { throw new Error(""); }
    expect(king_suicide.victor).toEqual("白");
    expect(king_suicide.reason).toEqual("doubled_pawns")
});
