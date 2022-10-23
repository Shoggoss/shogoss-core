import { coordDiffSeenFrom, opponentOf } from "./type";

test("invertSide", () => {
	expect(opponentOf("白")).toBe("黒");
	expect(opponentOf("黒")).toBe("白");
})

test('coordDiffSeenFrom', () => {
	const diff = coordDiffSeenFrom("黒", { from: ["３", "五"], to: ["２", "五"] });
	expect(diff.v).toBeCloseTo(0);
	expect(diff.h).toBeCloseTo(-1);
});

test('coordDiffSeenFrom', () => {
	const diff = coordDiffSeenFrom("黒", { from: ["３", "五"], to: ["３", "四"] })
	expect(diff.v).toBeCloseTo(1);
	expect(diff.h).toBeCloseTo(0);
});