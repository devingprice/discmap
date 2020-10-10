import React from 'react';
import styled from '@emotion/styled';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PlayerItem from './PlayerItem';

const grid = 8;
const borderRadius = 2;

export const Title = styled.h4`
    padding: ${grid}px;
    transition: background-color ease 0.2s;
    flex-grow: 1;
    user-select: none;
    position: relative;
    margin: 0;
    &:focus {
        outline: 2px solid ${"darkgrey"};
        outline-offset: 2px;
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 4px;
`;

const BackgroundColor = ({isDraggingOver, isDraggingFrom}) => {
    if(isDraggingOver) return "lightred";
    if(isDraggingFrom) return "lightblue";
    return 'white';
}
const Wrapper = styled.div`
    background-color: ${(props) =>
        BackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
    display: flex;
    flex-direction: column;
    opacity: ${({ isDragging, noDisableStyle, isDropDisabled }) => (isDragging && !noDisableStyle && isDropDisabled ? 0.5 : 'inherit')};
    padding: ${grid}px;
    border: ${grid}px;
    padding-bottom: 0;
    transition: background-color 0.2s ease, opacity 0.1s ease;
    user-select: none;
    width: 250px;
`;

const scrollContainerHeight = 250;
const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;
const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

const PlayerList = React.memo(({players}) => {
    return players.map((player, index) => (
        <Draggable key={player.id} draggableId={`${player.id}`} index={index}>
        {(provided, snapshot) => (
            <PlayerItem
                key={player.id}
                player={player}
                snapshot={snapshot}
                provided={provided}
            />
        )}
        </Draggable>
    ))
})
const CardInterior = ({players, provided, title, deleteFunc}) => (
    <div>
        <TitleWrapper>
            {title ? <Title>{title}</Title> : null}
            {deleteFunc ? <button onClick={()=>{deleteFunc(title)}}>X</button> : null}
        </TitleWrapper>
        
        <DropZone ref={provided.innerRef}>
            <PlayerList players={players} />
            {provided.placeholder}
      </DropZone>
    </div>
)
const Card = ({uid, round, players, style, holding, deleteFunc, useClone, isDropDisabled, noDisableStyle, ignoreContainerClipping=true, internalScroll}) => (
    <Droppable
        droppableId={uid}
        type="Card"
        ignoreContainerClipping={ignoreContainerClipping}
        isDropDisabled={isDropDisabled}
        renderClone={
            useClone
            ? (provided, snapshot, descriptor) => (
                <PlayerItem
                players={players[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
                />
            )
            : null
        }
    >
      {(provided, snapshot) => (
        <Wrapper
            style={style}
            isDropDisabled={isDropDisabled}
            noDisableStyle={noDisableStyle}
            isDragging={holding}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(provided.draggingFromThisWith)}
            {...provided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer>
                <CardInterior
                    players={players}
                    title={uid}
                    provided={provided}
                    deleteFunc={deleteFunc}
                />
            </ScrollContainer>
          ) : (
                <CardInterior
                    players={players}
                    title={uid}
                    provided={provided}
                    deleteFunc={deleteFunc}
                />
          )}
        </Wrapper>
      )}
    </Droppable>
)
export default Card;