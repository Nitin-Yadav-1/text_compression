
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
	/*
		Assign unique values to each nodes.
		Leaf Nodes have their UTF-16 code as their value.
		Non-leaf nodes are assigned unique values level order.
	*/
	const queue = [];
	queue.push(root);
	let ctr = 1;

	while( queue.length !== 0 ){
		let node = queue.shift();

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
			queue.push(node.left);
		if( node.right !== null )
			queue.push(node.right);
	}
}

export function readBlob( buffer ){
	/*
		Given a binary buffer parses it as Uint16Array.
		
		If checksum doesn't matches returns;

		Returns an object containing preorder array, inorder array and 
		compressedString.
	*/
	let view = new Uint16Array(buffer);

	// HEADER
	if( view[0] !== 43690 ) return;

	let nodeCount = view[1];
	let preorder = Array.from(view.slice( 2, nodeCount+2 ));
	let inorder = Array.from(view.slice(nodeCount+2, (2*nodeCount)+2 ));

	// BODY
	let dataArray = Array.from(view.slice( (2*nodeCount)+2, view.length ));
	let compressedString = createCompressedString(dataArray);

	return { preorder, inorder, compressedString };
}

function createCompressedString( dataArray ){
	/*
		Given an array of numbers creates a compressed string according
		to format.

		Length of array should be greater than or equal to 2.
	*/
	if( !Array.isArray(dataArray) ) return;
	if( dataArray.length < 2 ) return;

	let significantBitsInLastNumber = dataArray.pop();

	//create array of strings containing 16 bit binary strings
	let arr = [];
	for( let val of dataArray )
		arr.push( numberTo16BitBinaryString(val) );

	//read only significantBitsInLastNumber
	if( significantBitsInLastNumber !== 0 ){
		let last = arr[arr.length-1];
		last = last.slice( 16-significantBitsInLastNumber, 16 );
		arr[arr.length - 1] = last;
	}

	return arr.join("");
}

function numberTo16BitBinaryString( num ){
	if( typeof num !== 'number' ) return;
	if( num > 65535 ) return;

	let string = num.toString(2);
	let remainingBitsString = "0".repeat(16 - string.length);
	
	return remainingBitsString + string;
}