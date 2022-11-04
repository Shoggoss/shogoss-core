import { get_initial_state } from ".";
import { can_see } from "./can_see";

test('what the queen can see', () => {
	expect(can_see(get_initial_state("白").board, { from: ["５", "八"], to: ["４", "八"] })).toBe(true);
});
test('what the gold can see', () => {
	expect(can_see(get_initial_state("白").board, { from: ["４", "九"], to: ["４", "八"] })).toBe(true);
});
test('gold can see an occupied square', () => {
	expect(can_see(get_initial_state("白").board, { from: ["４", "九"], to: ["３", "九"] })).toBe(true);
});
test('what silver can see', () => {
	expect(can_see(get_initial_state("白").board, { from: ["３", "九"], to: ["４", "八"] })).toBe(true);
});
test('what silver cannot see', () => {
	expect(can_see(get_initial_state("白").board, { from: ["３", "九"], to: ["４", "九"] })).toBe(false);
});
test('an empy square cannot see another square', () => {
	expect(can_see(get_initial_state("白").board, { from: ["５", "五"], to: ["４", "九"] })).toBe(false);
});