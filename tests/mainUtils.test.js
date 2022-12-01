import test from 'ava';
import {getCountOfCharacters, buildHuffmanTree} from "../utils/mainUtils.js";

test("test function getCountOfCharacters()", t => {
    //invalid arguments
    t.deepEqual( getCountOfCharacters(), [] );
    t.deepEqual( getCountOfCharacters(3), [] );
    t.deepEqual( getCountOfCharacters(2,"abc"), [] );
    //valid arguments
    t.deepEqual( getCountOfCharacters("a"), [["a",1]] );
    t.deepEqual( getCountOfCharacters("ab"), [["a",1], ["b",1]] );
    t.deepEqual( getCountOfCharacters("abc"), [["a",1], ["b",1], ["c",1]]);

    t.deepEqual( getCountOfCharacters("aaabbccccd"), 
        [   ["a",3],
            ["b",2],
            ["c",4],
            ["d",1]     
        ]
    );
});

test("test function buildHuffmanTree", t => {
    //invalid arguments
    let root1 = buildHuffmanTree();
    t.is(root1, undefined);

    let root2 = buildHuffmanTree( getCountOfCharacters("") );
    t.is(root2, undefined);

    let root3 = buildHuffmanTree( [] );
    t.is( root3, undefined);

    //valid arguments
    let root4 = buildHuffmanTree( getCountOfCharacters("abbcccdddd"));
    t.deepEqual(root4.getValuesInPreorder(), [10, 4, 6, 3, 3, 1, 2]);

    let root5 = buildHuffmanTree( getCountOfCharacters("a") );
    t.deepEqual( root5.getValuesInPreorder(), [1] );

    let root6 = buildHuffmanTree( getCountOfCharacters("ab") );
    t.deepEqual( root6.getValuesInPreorder(), [2,1,1] );
});