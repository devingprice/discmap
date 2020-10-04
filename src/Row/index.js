import React, { useState } from 'react';
import './style.css';

import HoleMap from '../HoleMap';
import HoleText from '../HoleText';
import Controls from '../Controls';

function constructVisibleState (rowData) {
    return {};
}

export default ({players, singleRowData, holeText, editing}) => {
    //this will hold the state and functions to change state
    const [visibility, setVisibility] = useState(constructVisibleState(singleRowData)); //could also do in an effect
    // const [count, setCount] = useState(0);
    const [activeThrow, setActiveThrow] = useState(null);

    const updateVisibility = (inputData) => {
        let newVisibility = visibility;
        //edit newVisibility
        setVisibility(newVisibility);
    }

    //holetext from above
    //players from above
    //data from above
    //visible state HERE

    //functions to edit data in admin from above
    //functions to edit holetext in admin from above

    //will edit some data for hole/course outside of rows

    if (!singleRowData.map) {
        return (<div className="disc-row"></div>)
    }

    return (
        <React.Fragment>
        <div className="disc-row">
                <HoleMap 
                    holeNum={singleRowData.details.number}
                    visibility={visibility} 
                    map={singleRowData.map} 
                    entries={singleRowData.entries} 
                    extras={singleRowData.extras}
                    activeThrow={activeThrow}
                    editing={editing}
                />
                <div className="controls">
                    Controls {editing? "WITH EDITING" : ""}
                    <Controls 
                        data={singleRowData} 
                        players={players} 
                        activeThrow={activeThrow}
                        setActiveThrow={setActiveThrow}
                        setVisibility={setVisibility /* for making the player-round visible on button click*/} 
                        editing={editing}
                    />
                </div>
                {/* <HoleText /> */}
            {
                //map (viewer)
                //controls (viewer)
                //text to hover/click to show different things
            }
        </div>
        </React.Fragment>
    )
}