"use strict"

export default class TreeNode{
    constructor (val = 0, char = ""){
        //type check
        if( typeof val !== "number" )
            val = 0;
        if( typeof char !== "string" )
            char = "";

        //create data members
        this.val = val;
        this.char = char;
        this.left = null;
        this.right = null;
    }

    //generates preorder array of TreeNode objects from caller node's subtree
    getValuesInPreorder(){
        
        let preorderTraversal = [];

        let stack = [];
        stack.push(this);

        while( stack.length !== 0 ){
            let node = stack.pop();
            preorderTraversal.push(node.val);

            if( node.right !== null )
                stack.push(node.right);
            if( node.left !== null )
                stack.push(node.left);
        }

        return preorderTraversal;
    }

    getValuesInInorder(){
        let inorderTraversal = [];

        let stack = [];
        let node = this;

        while( true ){
            if( node === null ){
                if( stack.length === 0) break;
                node = stack.pop();
                inorderTraversal.push(node.val);
                node = node.right;
            }
            else{
                stack.push(node);
                node = node.left;
            }	
        }

        return inorderTraversal;
    }
}


function buildTreeRecursive( preorder , inorder, preIndex, inStart, inEnd ){

    //base condition
    if( inStart > inEnd || preIndex > preorder.length )
        return null;

    //create root
    const rootValue = preorder[preIndex];
    let root = new TreeNode(rootValue, "");

    //find in inorder
    let mid = -1;
    for( let i = inStart; i <= inEnd; i++ ){
        if( inorder[i] === rootValue ){
            mid = i;
            break;
        }
    }

    //build left and right subtree
    root.left = buildTreeRecursive(preorder, inorder, preIndex+1, inStart, mid-1);

    const preIndexRight = (mid - inStart) + preIndex + 1;
    root.right = buildTreeRecursive(preorder, inorder, preIndexRight, mid+1, inEnd);

    return root;
    
}

export function buildTree( preorder = [], inorder = [] ){

    //error check
    if( !Array.isArray(preorder) || !Array.isArray(inorder) )
        return null;
    if( preorder.length !== inorder.length )
        return null;

    //build tree recursively
    let root = buildTreeRecursive(preorder, inorder, 0, 0, preorder.length - 1);

    return root;
}
