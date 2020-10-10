import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './style.css';

export default (props) => {
    const [activeEntry, setActiveEntry] = useState(null);
    const activeThrow = props.activeThrow;
    const setActiveThrow = props.setActiveThrow;
    //const [activeThrow, setActiveThrow] = useState(null);

    const clickRoundButton = (newEntryKey) => {
        if (newEntryKey === activeEntry) {
            setActiveEntry(null);
            props.setVisibility(null);
        } else {
            setActiveEntry(newEntryKey);
            props.setVisibility(newEntryKey);
        }
    }

    const clickThrowButton = (newThrowKey) => {
        if (newThrowKey === activeThrow) {
            setActiveThrow(null)
        } else {
            setActiveThrow(newThrowKey)
        }
    }

    return (
        <div>
            <div>
                {props.name}
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    {
                        Object.values(props.rounds).map(round => 
                            <Button onClick={()=>{
                                    clickRoundButton(`${props.id}-${round.roundNum}`)
                                }}
                                key={`player-row-round-${props.id}-${round.roundNum}`}
                                className={
                                    `${props.id}-${round.roundNum}` === activeEntry
                                    ? 'by-player-row-button-active' : ''
                                }
                            >
                                {`R${round.roundNum}`}
                                {`${round.score}`}
                            </Button>
                        )
                    }
                </ButtonGroup>
            </div>
            <div className={`byplayerrow-collapsable byplayerrow-${activeEntry ? 'expanded': 'hidden'}`}
                style={activeEntry 
                    ? {'minHeight': '0px','height': 'auto','transitionDuration': '253ms'}
                    : {'minHeight': '0px','height': '0','transitionDuration': '253ms'}
                }
            >
                Throws: 
                { activeEntry && props.rounds[ activeEntry.split('-')[1] ]
                ?   <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        {
                            Object.values(props.rounds[ activeEntry.split('-')[1] ])
                            .filter(e=> typeof e === 'object')
                            .map(singleThrow => (
                                    <Button onClick={()=>{
                                            clickThrowButton(`${activeEntry}-${singleThrow.throw}`)
                                        }}
                                        key={`player-row-throw-${activeEntry}-${singleThrow.throw}`}
                                        className={
                                            `${activeEntry}-${singleThrow.throw}` === activeThrow
                                            ? 'by-player-row-button-active' : ''
                                        }
                                    >
                                        {`T${singleThrow.throw}`}
                                    </Button>
                                )
                            )
                        }
                    </ButtonGroup>
                : 'error'
            }
            </div>
        </div>
    )

}
