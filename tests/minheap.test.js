import test from "ava";
import MinHeap from "../utils/minheap.js";
import TreeNode from "../utils/tree.js";

test("Empty minheap", t => {
    let h = new MinHeap();
    t.deepEqual(h.heap, []);
    t.is(h.size, 0);
});

test("Non empty minheap", t => {
    let h = new MinHeap();

    let one = new TreeNode(1);
    h.add(one);
    t.is(h.size, 1);
    t.is(h.isEmpty(), false);
    t.is(h.peek(), one);

    let two = new TreeNode(2);
    h.add(two);
    t.is(h.size, 2);
    t.is(h.isEmpty(), false);
    t.is(h.peek(), one);

    let zero = new TreeNode(0);
    h.add(zero);
    t.is(h.size, 3);
    t.is(h.isEmpty(), false);
    t.is(h.peek(), zero);

    //deletion 1
    h.remove();
    t.is(h.size, 2);
    t.is(h.isEmpty(), false);
    t.is(h.peek(), one);

    //deletion 2
    h.remove();
    t.is(h.size, 1);
    t.is(h.isEmpty(), false);
    t.is(h.peek(), two);

    //deletion 3
    h.remove();
    t.is(h.size, 0);
    t.is(h.isEmpty(), true);
    t.is(h.peek(), undefined);
    t.deepEqual(h.heap, []);

    //deletion 4
    h.remove();
    t.is(h.size, 0);
    t.is(h.isEmpty(), true);
    t.is(h.peek(), undefined);
    t.deepEqual(h.heap, []);
});