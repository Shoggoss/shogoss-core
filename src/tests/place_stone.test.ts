import { main } from ".."

test("既に埋まっている", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["３", "五"], "prof": "ポ" }, "stone_to": ["１", "九"] },

    ])).toThrowError(`黒が１九に碁石を置こうとしていますが、１九のマスは既に埋まっています`);
});

test("自殺", () => {
    expect(() => main([
        { "piece_phase": { "side": "黒", "to": ["３", "五"], "prof": "ポ" }, "stone_to": ["４", "二"] },
        
    ])).toThrowError(`黒が４二に碁石を置こうとしていますが、打った瞬間に取られてしまうのでここは着手禁止点です`);
});