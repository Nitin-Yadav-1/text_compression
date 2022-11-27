import TreeNode from "../utils/tree.js";
import MinHeap from "../utils/minheap.js";

export function getCountOfCharacters( str ){
    /*
        Given a string, retuns a 2D array of format :
        [ [char1, count], [char2, count], ........[charN, count] ]
        where [char1, count] = [string, number]

        For argument of type not equal to 'string' returns empty array.

        For empty string returns empty array.
    */
    if( (typeof str !== "string") || (str.length === 0) )
        return [];

    let map = new Map();

    for( let ch of str ){
        //if character is in map, then increment its count
        if( map.has(ch) )
            map.set( ch, map.get(ch)+1 );
        //if character not in map, then add to map
        else
            map.set(ch,1);
    }

    let counts = [];
    for( let [key,value] of map )
        counts.push( [key, value] );

    return counts;
}

export function buildHuffmanTree( charCounts ){
    /*
        Given a 2D array of characters and their counts, builds huffman tree.
        Returns the root of huffman tree.

        For empty array returns undefined.
        For non-array arguments returns undefined.
    */ 

    if( !Array.isArray(charCounts) ) return;

    let minheap = new MinHeap();

    //add all characters as nodes in heap
    charCounts.forEach( item => {
        let char = item[0];
        let count = item[1];
        let node = new TreeNode(count, char );
        minheap.add(node);
    });

    //get two minimum nodes, build new node as their sum and put back in minheap
    while( minheap.size > 1 ){
        let node1 = minheap.peek();
        minheap.remove();

        let node2 = minheap.peek();
        minheap.remove();

        let newNode = new TreeNode( node1.val + node2.val );
        newNode.left = node1;
        newNode.right = node2;
        minheap.add(newNode);
    }

    return minheap.peek();
}

