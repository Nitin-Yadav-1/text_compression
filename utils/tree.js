"use strict"

class TreeNode{
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
