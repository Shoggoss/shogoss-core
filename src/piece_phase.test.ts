import { is_reachable } from "./piece_phase"
import { get_initial_state } from "./index"

test('is_reachable_queen', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["５", "八"], to: ["４", "八"] })).toBe(true);
}); 
test('is_reachable_gold', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["４", "九"], to: ["４", "八"] })).toBe(true);
}); 
test('is_reachable_gold_overlapping', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["４", "九"], to: ["３", "九"] })).toBe(true);
}); 
test('is_reachable_silver', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["３", "九"], to: ["４", "八"] })).toBe(true);
}); 
test('is_reachable_silver_not', () => {
	expect(is_reachable(get_initial_state("白").board, { from: ["３", "九"], to: ["４", "九"] })).toBe(false);
});