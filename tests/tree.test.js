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
    t.is(node1.left, null);
    t.is(node1.right, null);

    let node2 = new TreeNode(2, "a");
    t.is(node2.val, 2);
    t.is(node2.char, "a");
    t.is(node2.left, null);
    t.is(node2.right, null);
});

test("Preorder Traversal for 2-nodes", t => {
    /* all possilbe trees
            1       1
           /         \
          2           2
    */
    let root1 = new TreeNode(1);
    root1.left = new TreeNode(2);
    t.deepEqual( root1.getValuesInPreorder(), [1,2] );
    t.deepEqual( root1.left.getValuesInPreorder(), [2] );

    let root2 = new TreeNode(1);
    root2.right = new TreeNode(2);
    t.deepEqual( root2.getValuesInPreorder(), [1,2] );
    t.deepEqual( root2.right.getValuesInPreorder(), [2] );
});

test("Preorder Traversal for 3-nodes", t => {
    /*  all possible trees
          1             1        1               1          1
         / \           /          \             /            \
        2   3         2            2           2              2
                     /              \           \            /
                    3                3           3          3  
          
        (1)           (2)         (3)         (4)         (5)

        for all trees preorder is = [1,2,3]
    */
    let rootNodes = [];
    let preorder = [1,2,3];

    let root1 = new TreeNode(1);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(3);
    rootNodes.push(root1);

    let root2 = new TreeNode(1);
    root2.left = new TreeNode(2);
    root2.left.left = new TreeNode(3);
    rootNodes.push(root2);

    let root3 = new TreeNode(1);
    root3.right = new TreeNode(2);
    root3.right.right = new TreeNode(3);
    rootNodes.push(root3);

    let root4 = new TreeNode(1);
    root4.left = new TreeNode(2);
    root4.left.right = new TreeNode(3);
    rootNodes.push(root4);

    let root5 = new TreeNode(1);
    root5.right = new TreeNode(2);
    root5.right.left = new TreeNode(3);
    rootNodes.push(root5);

    rootNodes.forEach( root => {
        t.deepEqual( root.getValuesInPreorder(), preorder);
    });
});

test("Node count", t => {
    /*
                1
               / \
              2   3
             / \   \
            4   5   6
    */ 
    let root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);

    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);

    root.right.right = new TreeNode(6);

    t.is( root.getNodeCount(), 6 );
    t.is( root.left.getNodeCount(), 3 );
    t.is( root.right.getNodeCount(), 2 );
    t.is( root.right.right.getNodeCount(), 1 );
});