import { RightmostWhenSeenFrom } from "./type";

test("maximum_of_empty", () => {
    expect(() => RightmostWhenSeenFrom("白", [])).toThrow("tried to take the maximum of an empty array");
    expect(() => RightmostWhenSeenFrom("黒", [])).toThrow("tried to take the maximum of an empty array");
});