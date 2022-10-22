import { is_reachable } from "./piece_phase"
import { get_initial_state } from "./index"

test('is_reachable', () => {
	expect(is_reachable(get_initial_state("白").board, {from: ["５", "八"], to: ["４", "八"]})).toBe(true);
});