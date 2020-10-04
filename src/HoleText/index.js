import React, { useState } from 'react';

const ClickVisibilityController = (props) => {
    const [active, setActive] = useState(false);

    const click = () => {
        if (active) {
            //props.updateVisibilty(props.visObj)
            setActive(false);
        } else {
            //props.removeVisibilty(props.visObj)
            setActive(true);
        }
    }

    return (
        <span className={`text-controller-click ${ active ? 'text-controller-click-active': ''}`}
            onClick={click}
        >
            {props.children}
        </span>
    )
}

const HoverVisibilityController = (props) => {
    const [active, setActive] = useState(false);

    return (
        <span className={`text-controller-hover ${ active ? 'text-controller-hover-active': ''}`}
            onMouseEnter={()=>{
                setActive(true);
                //props.updateVisibilty(props.visObj)
            }}
            onMouseLeave={()=>{
                setActive(false);
                //props.removeVisibilty(props.visObj)
            }}
        >
            {props.children}
        </span>
    )
}

const HoleStepper = (props) => {
    //will add a material ui stepper later
    //may need hole order with throw uid's in order for this
    //  then I could just step through a generic "show this" for the throws in order
    //otherwise it will have a props obj and onNumberX state updateVisibilty func
    
}

export default (props) => {
    //will have functions to change visible state

    return (
        <div className="hole-text">
            <HoverVisibilityController>
                Hover here
            </HoverVisibilityController> to show player 1 round 1 throw 1

            <ClickVisibilityController>
                Click here
            </ClickVisibilityController> to show player 2 round 1 throw 1
        </div>
    )
}

export const AdminHoleText = (props) => {
    //will be able to edit hole text
    //will have button to add visibility controller at cursor location
    //popup box to edit text / color / what it makes visible
}