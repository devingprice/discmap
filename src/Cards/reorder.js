// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};
  
export default reorder;
  
export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
    // const current = [...quoteMap[source.droppableId]];
    // const next = [...quoteMap[destination.droppableId]];
    const current = {...quoteMap[source.droppableId]};
    const next = {...quoteMap[destination.droppableId]};
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        console.log(quoteMap)
        console.log(current, source.index, destination.index)
        const reordered = reorder(current.players, source.index, destination.index);
        const result = {
            ...quoteMap,
            [source.droppableId]: {
                ...current,
                players: reordered
            }
        };
        console.log("9999999999999999999resul11t")
        console.log(result)
        console.log(reordered)
        return {
            quoteMap: result
        };
    }

    // moving to different list

    // remove from original
    current.players.splice(source.index, 1);
    // insert into next
    next.players.splice(destination.index, 0, target);

    const result = {
        ...quoteMap,
        [source.droppableId]: current,
        [destination.droppableId]: next
    };
    console.log("7777777777777777777result")
    console.log(result)
    return {
        quoteMap: result
    };
};

export const handlePlayerMove = ({unaddedPlayers, columns, source, destination}) => {
    //all players move from (shouldnt need to check for destination)
    if (source.droppableId === "All Unadded Players"){
        let result = columns;
        result[destination.droppableId].players.splice(destination.index, 0, unaddedPlayers[source.index].id);
        return result;
    }

    const current = [...columns[source.droppableId].players];
    const next = [...columns[destination.droppableId].players];
    const target = current[source.index];
    //same list move
    if (source.droppableId === destination.droppableId ){
        const reordered = reorder(current, source.index, destination.index);
        const result = {
            ...columns,
            [source.droppableId]: {
                ...columns[source.droppableId],
                players: reordered
            }
        }
        return result;
    }
    //move different list
    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);
    const result = {
        ...columns,
        [source.droppableId]: {
            ...columns[source.droppableId],
            players: current
        },
        [destination.droppableId]: {
            ...columns[destination.droppableId],
            players: next
        },
    }
    return result;

    //default
    //return columns;
}