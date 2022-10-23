import { remove_surrounded } from "./surround";


test("surround", () => {
    expect(remove_surrounded("白", [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
    ])).toEqual([
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
    ]);
});


test("surround", () => {
    expect(remove_surrounded("白", [
        ["白", "黒", null, null, null, null, null, null, null],
        ["黒", null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, "黒", "黒", null, null, null],
        [null, null, null, "黒", "白", "白", "黒", null, null],
        [null, null, null, null, "黒", "黒", null, null, null],
        [null, null, null, null, null, null, null, null, null],
        ["白", "白", null, null, null, null, null, null, null],
    ])).toEqual([
        [null, "黒", null, null, null, null, null, null, null],
        ["黒", null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, "黒", "黒", null, null, null],
        [null, null, null, "黒", null, null, "黒", null, null],
        [null, null, null, null, "黒", "黒", null, null, null],
        [null, null, null, null, null, null, null, null, null],
        ["白", "白", null, null, null, null, null, null, null],
    ]);
});
