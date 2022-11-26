/*
    defines MinHeap class to implement minheap for TreeNode class
*/

import TreeNode from "../utils/tree.js";

export default class MinHeap{
    constructor(){
        this.heap = [];
        this.size = 0;
    }

    peek(){
        if( this.size === 0 ) return;
        return this.heap[0];
    }

    isEmpty(){
        return ( this.size === 0 );
    }

    add( node ){
        if( !(node instanceof TreeNode) )
            return;

        this.heap.push(node);
        this.size++;

        if( this.size === 1 ) return;
        else this._upHeapify( this.size-1 );        
    }

    remove(){
        //zero element
        if( this.size === 0 ) return;

        //swap root with last element
        let temp = this.heap[0];
        this.heap[0] = this.heap[this.size-1];
        this.heap[this.size-1] = temp;

        //remove from last
        this.heap.pop();
        this.size--;

        if( this.size === 0 ) return;
        this._downHeapify(0);
    }

    _upHeapify( index ){

        let parentIndex = Math.floor( (index - 1) / 2 );

        //move node up in heap as long as it smaller than parent
        while( parentIndex >= 0 ){

            if( this.heap[parentIndex].val > this.heap[index].val ){
                //swap
                let temp = this.heap[parentIndex];
                this.heap[parentIndex] = this.heap[index];
                this.heap[index] = temp;
                
                //update index to its parent
                index = parentIndex;
            }
            else break;

            parentIndex = Math.floor( (index - 1) / 2 );
        }
    }

    _downHeapify( index ){
        if( index < 0 ) return;

        let left = (2 * index) + 1;
        let right = left + 1;

        while( (left < this.size ) || (right < this.size) ){
            let minIndex;

            //set minIndex to minimum child node
            if( left >= this.size && right < this.size )
                minIndex = right;
            else if( left < this.size && right >= this.size )
                minIndex = left;
            else if( left >= this.size && right >= this.size )
                break;
            else
                minIndex = ( this.heap[left].val <= this.heap[right].val ) ? left : right;

            //if current node is greater, then swap with minIndex node
            if( this.heap[index].val > this.heap[minIndex].val ){
                let temp = this.heap[index];
                this.heap[index] = this.heap[minIndex];
                this.heap[minIndex] = temp;
            }
            else break;

            //update index, left and right
            index = minIndex;
            left = ( 2 * index ) + 1;
            right = left + 1;
        }
    }
}