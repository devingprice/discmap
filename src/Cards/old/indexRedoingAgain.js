import React, { useState, useRef, useEffect } from 'react';
//import Column from './column';
import reorder, { reorderQuoteMap } from './reorder';
import { QuoteList, Title} from './primatives';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';

import './style.css';
const grid = 8;
const borderRadius = 2;

const ParentContainer = styled.div`
    height: ${({ height }) => height};
    overflow-x: hidden;
    overflow-y: auto;
`;

const ContainerBoard = styled.div`
    background-color: lightcoral;
    min-height: 100vh;
    /* like display:flex but will allow bleeding over the window width */
    min-width: 100vw;
    display: inline-flex;
`;

const ContainerAllPlayers = styled.div`
    background: ${({ isDraggingOver }) => isDraggingOver ? 'lightblue' : 'grey'};
    padding: 8,
    border: 5px solid pink,
    width: 250,
    maxHeight: 50vh,
    overflow: auto,
`;
const TitleStyle = styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid ${colors.P100};
    outline-offset: 2px;
  }
`;

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

const Board = ({cards, players, containerHeight}) => {
    console.log(cards)
    const [columns, setColumns] = useState({});
    const [ordered, setOrdered] = useState([]);
    const [unaddedPlayers, setUnaddedPlayers] = useState([]);
    
    useEffect(()=>{
        setColumns(cards);
        setOrdered(Object.keys(cards));
        let usedPlayers = Object.values(cards).map(e=>e.players).flat();
        let unusedPlayers = Object.values(players).filter(p=>!usedPlayers.includes(p.id))
        setUnaddedPlayers(unusedPlayers)
    }, [cards]);

    const onDragStart = () => {}
    const onDragEnd = () => {}
    const addList = () => {}

    const AddCardButton = (
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
    const AllPlayers = (
        <React.Fragment>
            
        <Droppable droppableId="AllPlayers" isDropDisabled={true}>
          {(provided, snapshot) => (
            <ContainerAllPlayers
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                //style={AllPlayersStyle(snapshot.isDraggingOver)}
                onScroll={(e) => {console.log('current scrolltop', e.currentTarget.scrollTop)}}
            >
              {unaddedPlayers.map((item, index) => (
                <Draggable key={"All"+item.id} draggableId={"All"+item.id} index={index}>
                  {(provided, snapshot) => (
                    <React.Fragment>
                      <div
                        className="player-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        //isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        {item.nickname}
                      </div>
                      {snapshot.isDragging && (
                        <div className="clone">{item.nickname}</div>
                      )}
                    </React.Fragment>
                  )}
                </Draggable>
              ))}
            </ContainerAllPlayers>
          )
        
        }
        </Droppable>
        </React.Fragment>
    )

    const ItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        padding: 8 * 2,
        margin: `0 0 ${8}px 0`,
        border: '5px solid yellow',
        height: 30,
        background: isDragging ? 'lightgreen' : 'red',
        ...draggableStyle,// styles we need to apply on draggables
    });


    const boardTemp = (
        <React.Fragment>
            {ordered.map((key, i) => (
                <Droppable 
                    key={""+key} 
                    droppableId={""+key}
                    type="COLUMN"
                    direction="horizontal"
                >
                {(provided, snapshot) => (
                    <div className="card"
                        ref={provided.innerRef}
                    >
                    {columns[key].players.map((pId) => players[pId]).map((playerObj, index) => (
                        <Draggable key={"POnC"+playerObj.id} draggableId={"POnC"+playerObj.id} index={index}>
                        {(provided, snapshot) => (
                          <React.Fragment>
                            <div
                              className="player-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={ItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                              {playerObj.nickname}
                            </div>
                            {snapshot.isDragging && (
                              <div className="clone">{playerObj.nickname}</div>
                            )}
                          </React.Fragment>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                )}
              </Droppable>
            ))}
        </React.Fragment>
    );

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            {AllPlayers}
            {containerHeight 
                ? (<ParentContainer height={containerHeight}>{boardTemp}</ParentContainer>) 
                : (boardTemp)
            }
            {AddCardButton}
        </DragDropContext>
    )
}
export default ({players, cards}) => {
    return (
        <div className="card-container" style={{minHeight: '100px'}}>
            <Board cards={cards} players={players} />
        </div>
    )
}
//<Board initial={authorQuoteMap} />
/*
Style
    dragging: container item came from
    dragging: container currently hovering
Function
    new list
    drag from list
OnDragStart
    turn players list into trashcan
Make sure cant drop on cards with 4 players
*/