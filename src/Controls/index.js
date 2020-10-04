import React, { useState, useEffect } from 'react';
import GroupBy from './GroupBy';
import ByPlayerRow from './ByPlayerRow';
import { sortByPlayer } from '../helper';

import './style.css';

// for single hole
export default (props) => {
    const [groupBy, setGroupBy] = useState('player');

    let sortedEntries;
    if (props.data) {
        sortedEntries = sortByPlayer(props.data.entries, props.players);
    }
    console.log(sortedEntries)

    return (
        <div className="hole-controls">
            <div className="hole-details">
                <div className="hole-details-num">Hole #: {props.data.details.number}</div>
                <div className="hole-details-stroke-avg">Stroke AVG: {props.data.details.strokeAvg}</div>
                <div className="hole-details-distance">Distance: {props.data.details.distance} ft</div>
            </div>

            <GroupBy setGroupBy={setGroupBy}/>

            <div>
                {
                    Object.values(sortedEntries).map(entry => 
                        <ByPlayerRow {...entry}
                            key={`player-row-${entry.id}`} 
                            activeThrow={props.activeThrow}
                            setActiveThrow={props.setActiveThrow} 
                        />
                    )
                }
            </div>
        </div>
    )
}
//<Bookcase  />
//entries={entriesSorted}