

function getCountOfCharacters( str ){
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
