import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import HoleMap from '../HoleMap';
import HoleText from '../HoleText';
import Controls from '../Controls';

function constructVisibleState (rowData) {
    console.log('construct')
    let initial = {
        trees: true,
        tee: true,
        basket: true,
        circle1: false,
        circle2: false,
        zones: {},
        throws: {},
        extras: {},
    };

    rowData.zones.forEach(zone => {
        initial.zones[zone.uid] = false;
    });
    rowData.entries.forEach(entry => {
        let throws = {};
        entry.throws.forEach(thr=> throws[thr.uid] = false)
        initial.throws[entry.uid] = {
            ...throws
        };
    });
    rowData.extras.forEach(extra => {
        initial.extras[extra.uid] = false;
    });

    //console.log(initial)
    return initial;
}

export default ({players, singleRowData, holeText, editing, updateActiveThrowPath}) => {
    //this will hold the state and functions to change state
    const [visibility, setVisibility] = useState(constructVisibleState(singleRowData)); //could also do in an effect
    const [activeThrow, setActiveThrow] = useState(null);


    const updateVisibility = (inputData) => {
        let newVisibility = constructVisibleState(singleRowData);
        let isRound = inputData.split('-').length === 2;
        if(isRound && newVisibility.throws[inputData]) {
            Object.keys(newVisibility.throws[inputData]).forEach(k => {
                newVisibility.throws[inputData][k] = true;
            })
        }
        
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
                    updateActiveThrowPath={updateActiveThrowPath}
                />
                <div className="controls">
                    Controls {editing? "WITH EDITING" : ""}
                    <Controls 
                        data={singleRowData} 
                        players={players} 
                        activeThrow={activeThrow}
                        setActiveThrow={setActiveThrow}
                        setVisibility={updateVisibility /* for making the player-round visible on button click*/} 
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