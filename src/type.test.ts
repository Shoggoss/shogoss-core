import { clone_entity } from "./type";

test('clone_entity', () => {
    expect(clone_entity({ type: "しょ", side: "白", prof: "香", can_kumal: true })).toEqual({ type: "しょ", side: "白", prof: "香", can_kumal: true })
});