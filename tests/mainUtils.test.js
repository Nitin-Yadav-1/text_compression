import test from 'ava';
import {getCountOfCharacters} from "../utils/mainUtils.js";

test("test function getCountOfCharacters()", t => {
    t.deepEqual( getCountOfCharacters(), [] );
    t.deepEqual( getCountOfCharacters(3), [] );
    t.deepEqual( getCountOfCharacters(2,"abc"), [] );
    t.deepEqual( getCountOfCharacters("a"), [["a",1]] );
});