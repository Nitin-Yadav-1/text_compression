import test from "ava";
import TreeNode from "../utils/tree.js";

test("TreeNode constructor zero argument", (t) => {
    let node = new TreeNode();
    t.is(node.val, 0);
    t.is(node.char, "");
});