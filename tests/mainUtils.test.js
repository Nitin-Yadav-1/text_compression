import test from 'ava';
import {getCountOfCharacters, buildHuffmanTree} from "../utils/mainUtils.js";

test("test function getCountOfCharacters()", t => {
    t.deepEqual( getCountOfCharacters(), [] );
    t.deepEqual( getCountOfCharacters(3), [] );
    t.deepEqual( getCountOfCharacters(2,"abc"), [] );
    t.deepEqual( getCountOfCharacters("a"), [["a",1]] );
});

test("test function buildHuffmanTree", t => {
    let root1 = buildHuffmanTree();
    t.is(root1, undefined);

    let root2 = buildHuffmanTree( getCountOfCharacters("") );
    t.is(root2, undefined);

    let root3 = buildHuffmanTree( [] );
    t.is( root3, undefined);

    let root4 = buildHuffmanTree( getCountOfCharacters("abbcccdddd"));
    t.deepEqual(root4.getValuesInPreorder(), [10, 4, 6, 3, 3, 1, 2]);
});