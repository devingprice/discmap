import React from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { QuoteList, Title} from './primatives';
import './style.css';

export default ({title, quotes, index, isDragDisabled}) => 
{ console.log('render column')
console.log(quotes)
return (
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
}
