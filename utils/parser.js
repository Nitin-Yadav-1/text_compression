import {Blob} from "buffer";


export function createBlob( root, compressedString ){
    /*
        Given root of Huffman tree and string of 0 and 1,
        creates a blob according to storage format.

        Modifies the given tree.
    */ 

    //HEADER BUFFER
    makeTreeStorable(root);
    let preorder = root.getValuesInPreorder();
    let inorder = root.getValuesInInorder();
    let nodeCount = preorder.length;

    const headerBufferLength = Math.floor(2 + ( 2 * nodeCount));
	const headerBuffer = new Uint16Array(headerBufferLength);

    headerBuffer[0] = 43690; //checksum
    headerBuffer[1] = nodeCount;

    let i = 2;
    for( let num of preorder )
        headerBuffer[i++] = num;

    for( let num of inorder )
        headerBuffer[i++] = num;

    //DATA BUFFER
	let dataBufferLength = Math.floor(compressedString.length / 16);
	if( compressedString.length % 16 !== 0 ) dataBufferLength++;

	const significantBitsInLastNumber = compressedString.length % 16;
	dataBufferLength++; // to store last number's significant bit

	const dataBuffer = new Uint16Array(dataBufferLength);
	dataBuffer[dataBufferLength - 1] = significantBitsInLastNumber;

	for( let i = 0, j = 0; i < compressedString.length; i += 16, j++ )
		dataBuffer[j] = parseInt(compressedString.slice(i, i+16), 2);

    //CREATE BLOB
    let blob = new Blob([headerBuffer, dataBuffer], 
        {type : "application/octet-stream"}
    );

    return blob;
}

function makeTreeStorable( root ){

	const stack = [];
	stack.push(root);
	let ctr = 1;

	while( stack.length !== 0 ){
		let node = stack.pop();

		//handle leaf nodes - store character's UTF-16 code as val
		if( node.left === null && node.right === null )
			node.val = node.char.charCodeAt();

		//handle non-leaf nodes
		else{
			node.val = ctr++;
			//store 1 at MSB(16th bit) to signify non-leaf
			node.val = node.val | 32768; 
		}

		if( node.left !== null )
			stack.push(node.left);
		if( node.right !== null )
			stack.push(node.right);
	}
}