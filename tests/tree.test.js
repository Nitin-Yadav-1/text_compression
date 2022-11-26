import test from "ava";
import TreeNode from "../utils/tree.js";

test("Invalid constructor arguments", t => {
    //no arguments
    try{
        let node = new TreeNode();
    }
    catch( e ){
        t.is( e.name, "InvalidConstructorArguments");
    }
    
    //invalid args
    let args = [
        [null, null], 
        [undefined, undefined], 
        [true, true], 
        [false, false],
        [true, false],
        [false, true],
        ["",""],
        [1, 1],
        ["", 1]
    ];
    args.forEach( arg => {
        try{
            let node = new TreeNode(arg[0], arg[1]);
        }
        catch(e){
            t.is(e.name, "InvalidConstructorArguments");
        }
    });
});

test("Valid constructor arguments", t => {
    let node1 = new TreeNode(1);
    t.is(node1.val, 1);
    t.is(node1.char, "");

    let node2 = new TreeNode(2, "a");
    t.is(node2.val, 2);
    t.is(node2.char, "a");
});