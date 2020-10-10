import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import reorder, { handlePlayerMove, reorderQuoteMap } from "./reorder";

//import PlayerItem from './PlayerItem';
import Card from './Card';

//import './style.css';
const grid = 8;
const borderRadius = 2;


const ContainerAllPlayers = styled.div`
    background: ${({ isDraggingOver }) => isDraggingOver ? 'lightblue' : 'grey'};
    padding: 8,
    border: 5px solid pink,
    width: 250,
    maxHeight: 50vh,
    overflow: auto,
`;

const ParentContainer = styled.div`
    height: ${({ height }) => height};
    overflow-x: hidden;
    overflow-y: auto;
`;

const AddCardButton = (addList) => (
    <Button onClick={addList}>
        <svg width="24" height="24" viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
        />
        </svg>
        Add Card
    </Button>
);

const AllPlayers = (unaddedPlayers) => (
    <Container>
        <Card 
            uid={"All Unadded Players"}
            players={unaddedPlayers}
            isDropDisabled
            noDisableStyle
        />
    </Container>
)
const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  min-height: 100px;
`;
const Wrapper = styled.div`
    margin: ${grid}px;
    display: flex;
    flex-direction: row;
    max-width: 100vW;
    overflow-x: auto;
`;

const Board = ({cards, players, containerHeight}) => {
    const [columns, setColumns] = useState({});
    const [holding, setHolding] = useState(false);
    const [unaddedPlayers, setUnaddedPlayers] = useState([]);
    
    useEffect(()=>{
        setColumns(cards);
        let usedPlayers = Object.values(cards).map(e=>e.players).flat();
        let unusedPlayers = Object.values(players).filter(p=>!usedPlayers.includes(p.id))
        console.log(usedPlayers, unusedPlayers)
        setUnaddedPlayers(unusedPlayers);
    }, [cards]);

    const onDragStart = () => {}
    const onDragEnd = (result) => {
        setHolding(false);
        //cancel if dropped nowhere
        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;
        //bail out dropped in place
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const data = handlePlayerMove({unaddedPlayers, columns, source, destination});
        setColumns(data);
        let usedPlayers = Object.values(data).map(e=>e.players).flat();
        let unusedPlayers = Object.values(players).filter(p=>!usedPlayers.includes(p.id))
        setUnaddedPlayers(unusedPlayers);
    }
    const addCard = () => {
        console.log('add card')
        let uid = uuidv4();
        setColumns({...columns, [uid]: {uid: uid, players: [], round: 0}})
    }
    const deleteCard = (cardUid) => {
        console.log('delete card')
        let newCols = columns;
        delete newCols[cardUid];
        setColumns(newCols);
        let usedPlayers = Object.values(newCols).map(e=>e.players).flat();
        let unusedPlayers = Object.values(players).filter(p=>!usedPlayers.includes(p.id))
        setUnaddedPlayers(unusedPlayers);
    }

    const parsePlayers = (playerIds) => {
        return playerIds.map((id) => players[id])
    }

    const boardTemp = (
        <React.Fragment>
            {Object.values(columns).map((card, i) => (
                <Container key={i}>
                    <Card 
                        uid={card.uid}
                        round={card.round}
                        players={parsePlayers(card.players)}
                        isDropDisabled={card.players.length >= 4 ? true : false}
                        holding={holding}
                        deleteFunc={deleteCard}
                    />
                </Container>
            ))}
        </React.Fragment>
    );
    
    return (
        <Wrapper>
        <DragDropContext
            onBeforeCapture={()=>{setHolding(true)}}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            {unaddedPlayers? AllPlayers(unaddedPlayers) : null}
            {containerHeight 
                ? (<ParentContainer height={containerHeight}>{boardTemp}</ParentContainer>) 
                : (boardTemp)
            }
            {AddCardButton(addCard)}
        </DragDropContext>
        </Wrapper>
    )
}
export default Board;
