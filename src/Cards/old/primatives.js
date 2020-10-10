import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";

export const Title = (props) => (
    <div className={props.isDragging ? 'isDragging' : ''}>
        {props.children}
    </div>
)
const QuoteItem = React.memo(({quote, isDragging, provided}) => (
    <div className="player-item"
        //href={quote.author.url}
        //isDragging={isDragging}/
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >
        <div>{quote.name}</div>
        <div>{quote.nickname}</div>
        <div>({quote.id})</div>
    </div>
));

const InnerQuoteList = React.memo(({quotes}) => {
    console.log(quotes)
return (
    <React.Fragment>
        {
        quotes.map((quote, index) => (
            <Draggable 
                key={quote.id} 
                draggableId={""+quote.id} 
                index={index}
            >
            {(dragProvided,dragSnapshot) => (
                <QuoteItem
                    key={quote.id}
                    quote={quote}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                />
            )}
            </Draggable>
        ))
        }
    </React.Fragment>
)})

const InnerList = ({dropProvided, quotes, title}) => (
    <div className="Container">
        {title ? <Title>{title}</Title> : null}
        <div className="DropZone" ref={dropProvided.innerRef}>
          <InnerQuoteList quotes={quotes} />
          {dropProvided.placeholder}
        </div>
    </div>
)
export const QuoteList = ({listId = 'LIST', listType, quotes, title, internalScroll, isDropDisabled, style, ignoreContainerClipping}) => (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      //isDropDisabled={isDropDisabled}
    >
      {(dropProvided,dropSnapshot) => (
        <div className="Wrapper"
            style={style}
            //isDraggingOver={dropSnapshot.isDraggingOver} //
            //isDropDisabled={isDropDisabled} //
            {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <div className="ScrollContainer">
              <InnerList
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
              />
            </div>
          ) : (
            <InnerList
              quotes={quotes}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </div>
      )}
    </Droppable>
)