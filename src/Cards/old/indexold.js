import React, { useState, useRef, useEffect } from 'react';
import Column from './column';
import reorder, { reorderQuoteMap } from './reorder';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import './style.css';

// const ParentContainer = styled.div`
//   height: ${({ height }) => height};
//   overflow-x: hidden;
//   overflow-y: auto;
// `;

// const Container = styled.div`
//   min-height: 100vh;
//   /* like display:flex but will allow bleeding over the window width */
//   min-width: 100vw;
//   display: inline-flex;
// `;

export const Board = ({cards, players, containerHeight}) => {
    console.log(cards)
    const [columns, setColumns] = useState({});
    const [ordered, setOrdered] = useState([]);
    const [unaddedPlayers, setUnaddedPlayers] = useState([]);
    
    //const boardRef = useRef(null);
    useEffect(()=>{
        setColumns(cards);
        createOrdered(cards)
        //setOrdered(Object.keys(cards));
        let usedPlayers = Object.values(cards).map(e=>e.players).flat();
        let unusedPlayers = Object.values(players).filter(p=>!usedPlayers.includes(p.id))
        setUnaddedPlayers(unusedPlayers)
    }, [cards]);

    const onDragStart = (initial) => {
        //publishOnDragStart(initial);
    };

    const onDragEnd = (result) => {
        if (result.combine) {
            if (result.type === "COLUMN") {
              const shallow = [...ordered];
              shallow.splice(result.source.index, 1);
              setOrdered(shallow);
              return;
            }
      
            const column = columns[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columnsTemp = {
              ...columns,
              [result.source.droppableId]: withQuoteRemoved
            };
            setColumns(columnsTemp)
            return;
        }

        // dropped nowhere
        if (!result.destination) return;

        const source = result.source;
        const destination = result.destination;

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            const orderedTemp = reorder(
                ordered,
                source.index,
                destination.index,
            );

            setOrdered(orderedTemp)

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination,
        });

        setColumns(data.quoteMap);
    };
    
    const addColumn = () => {
        const uuid = uuidv4();
        const newCol = {
            ...columns,
            [uuid]: {
                round: 1,
                uid: uuid,
                players: []
            }
        };
        setColumns(newCol);
        createOrdered(newCol);
    }

    const createOrdered = (columns) => {
        let addedPlayers = Object.keys(columns);
        addedPlayers.unshift('AllPlayers');
        //addedPlayers.push('AddColumn')
        setOrdered(addedPlayers);
    }

    const AllPlayers = (
        <Column
            key={'AllPlayers'}
            index={999}
            title={'All Players Available'}
            quotes={unaddedPlayers}
            isDragDisabled={true}
        />
    )
    const AddColumnComponent = (
        <div 
            style={{backgroundColor: 'grey'}}
            onClick={addColumn}
        >Add Column</div>
    )
    console.log(ordered)

    const boardTemp = (
        <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={Boolean(containerHeight)}
        >
            {(provided) => (
                <div className="board" 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    {ordered.map((key, index) => {
                        if (key==="AllPlayers"){
                            return AllPlayers;
                        }//  else if (key==="AddColumn"){
                        //     return AddColumnComponent;
                        // }
                        return (
                            <Column
                                key={key}
                                index={index}
                                title={key}
                                quotes={columns[key].players.map(e=>players[e])}
                            />
                        )
                    })}
                    {AddColumnComponent}
                </div>
                
            )}
            
        </Droppable>
    );

    console.log('rendered dnd')

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            {containerHeight 
                ? (<div style={{
                    height: `${containerHeight}`,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }} height={containerHeight}>{boardTemp}</div>) 
                : (boardTemp)
            }
        </DragDropContext>
    );
    
}

export default ({players, cards}) => {
    return (
        <div style={{minHeight: '100px'}}>
            <Board cards={cards} players={players} />
        </div>
    )
}
//<Board initial={authorQuoteMap} />
/*


export const Column =  ({title, quotes, index, isDragDisabled}) => (
    <Draggable draggableId={""+title} index={index} isDragDisabled={isDragDisabled}>
    {(provided, snapshot) => (
        <div className="column" 
            ref={provided.innerRef} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
        <div className="Header" 
            //isDragging={snapshot.isDragging}
        > 
            <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
            >
                {title}
            </Title>
        </div>
        <QuoteList listId={title} listType="QUOTE" quotes={quotes} />
        </div>
    )}
    </Draggable>
);

export const Board = ({cards, players, containerHeight}) => {
    console.log(cards)
    const [columns, setColumns] = useState({});
    const [ordered, setOrdered] = useState([]);
    const [unaddedPlayers, setUnaddedPlayers] = useState([]);
    
    //const boardRef = useRef(null);
    useEffect(()=>{
        setColumns(cards);
        createOrdered(cards)
        //setOrdered(Object.keys(cards));
        let usedPlayers = Object.values(cards).map(e=>e.players).flat();
        let unusedPlayers = Object.values(players).filter(p=>!usedPlayers.includes(p.id))
        setUnaddedPlayers(unusedPlayers)
    }, [cards]);

    const onDragStart = (initial) => {
        //publishOnDragStart(initial);
    };

    const onDragEnd = (result) => {
        if (result.combine) {
            if (result.type === "COLUMN") {
              const shallow = [...ordered];
              shallow.splice(result.source.index, 1);
              setOrdered(shallow);
              return;
            }
      
            const column = columns[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columnsTemp = {
              ...columns,
              [result.source.droppableId]: withQuoteRemoved
            };
            setColumns(columnsTemp)
            return;
        }

        // dropped nowhere
        if (!result.destination) return;

        const source = result.source;
        const destination = result.destination;

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            const orderedTemp = reorder(
                ordered,
                source.index,
                destination.index,
            );

            setOrdered(orderedTemp)

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination,
        });

        setColumns(data.quoteMap);
    };
    
    const addColumn = () => {
        const uuid = uuidv4();
        const newCol = {
            ...columns,
            [uuid]: {
                round: 1,
                uid: uuid,
                players: []
            }
        };
        setColumns(newCol);
        createOrdered(newCol);
    }

    const createOrdered = (columns) => {
        let addedPlayers = Object.keys(columns);
        //addedPlayers.unshift('AllPlayers');
        //addedPlayers.push('AddColumn')
        setOrdered(addedPlayers);
    }

    const AllPlayers = (
        <Column
            key={'AllPlayers'}
            index={999}
            title={'All Players Available'}
            quotes={unaddedPlayers}
            isDragDisabled={true}
        />
    )
    const AddColumnComponent = (
        <div 
            style={{backgroundColor: 'grey'}}
            onClick={addColumn}
        >Add Column</div>
    )
    console.log(ordered)

    const boardTemp = (
        <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            ignoreContainerClipping={Boolean(containerHeight)}
        >
            {(provided) => (
                <div className="board" 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    {ordered.map((key, index) => {
                        // if (key==="AllPlayers"){
                        //     return AllPlayers;
                        //}  else if (key==="AddColumn"){
                        //     return AddColumnComponent;
                        // }
                        return (
                            <Column
                                key={key}
                                index={index}
                                title={key}
                                quotes={columns[key].players.map(e=>players[e])}
                            />
                        )
                    })}
                    {AddColumnComponent}
                </div>
                
            )}
            
        </Droppable>
    );

    console.log('rendered dnd')

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            {AllPlayers}
            {containerHeight 
                ? (<div style={{
                    height: `${containerHeight}`,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }} height={containerHeight}>{boardTemp}</div>) 
                : (boardTemp)
            }
        </DragDropContext>
    );
    
}
*/