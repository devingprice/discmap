import React from 'react';
import styled from '@emotion/styled';


const grid = 8;
const borderRadius = 2;
const imageSize = 40;

//const BackgroundColor = ()
const BorderColor = ({isDragging}) => isDragging ? 'black' : 'transparent';
const getStyle = ({provided, style}) => {
    if (!style) return provided.draggableProps.style;
    return {...provided.draggableProps.style, ...style}
}
const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Container = styled.a`
    border-radius: ${borderRadius}px;
    border: 2px solid transparent;
    border-color: ${(props) => BorderColor(props.isDragging)};
    background-color: lightblue;
    box-shadow: ${({ isDragging }) =>
        isDragging ? `2px 2px 1px ${"lightcoral"}` : 'none'};
    box-sizing: border-box;
    padding: ${grid}px;
    min-height: ${imageSize}px;
    margin-bottom: ${grid}px;
    user-select: none;

    /* anchor overrides */
    color: ${"grey"};

    &:hover,
    &:active {
        color: ${"lightgrey"};
        text-decoration: none;
    }

    &:focus {
        outline: none;
        border-color: ${"darkblue"};
        box-shadow: none;
    }

    /* flexbox */
    display: flex;
`;

export default ({player, provided, snapshot}) => (
    <Container
        isDragging={snapshot.isDragging}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getStyle({provided})}
    >
        <Avatar src={player.pic} alt={player.name} />
        <div>{player.nickname}</div>
    </Container>

)