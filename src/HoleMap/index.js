import React, { useState, useRef, useEffect } from 'react';

import {Tee, Basket, Throw} from '../helper/svgComponents';

export default ({holeNum, visibility, map, entries, extras, activeThrow, editing}) => {
    const containerRef = useRef(null);
    const [draggingPointId, setDraggingPointId] = useState(null);

    const viewBox = map.viewBox.trim().split(' ').map(e=>e.trim());

    const [originXTrans, originYTrans, viewBoxWidth, viewBoxHeight] = viewBox.length === 4 ? viewBox : ['0','0','100','100'];
    
    //this is really inefficient, activeThrowPath should be beside activeThrow on parent
    let activeThrowPath;
    // useEffect(() => {
        entries.forEach(entry => {
            entry.throws.forEach(t => {
                if (t.uid === activeThrow) {
                    activeThrowPath = t.svg
                }
            })
        })
    // }, [activeThrow]);

    const handleMouseDown = (pointId) => {
        setDraggingPointId(pointId);
    }
  
    const handleMouseUp = () => {
        setDraggingPointId(null);
    }

    const handleMouseMove = ({ clientX, clientY }) => {
        if (!activeThrow) {
            return;
        }
        console.log(activeThrowPath, activeThrow)
        const svgRect = containerRef.current.getBoundingClientRect();

        const svgX = clientX - svgRect.left;
        const svgY = clientY - svgRect.top;

        const viewBoxX = svgX * viewBoxWidth / svgRect.width;
        const viewBoxY = svgY * viewBoxHeight / svgRect.height;

        const transformedX = Math.round(parseInt(viewBoxX) + parseInt(originXTrans));
        const transformedY = Math.round(parseInt(viewBoxY) + parseInt(originYTrans));

        if(activeThrowPath) {
            let str = `${transformedX},${transformedY}`;
            let regex;
            switch(draggingPointId){
                case 'startPoint':
                    regex = /(?<=^(M ))(-*\d+,-*\d*)/g;
                    console.log(activeThrowPath.replace(regex, str))
                    break;
                case 'handle1':
                    regex = /(?<=^(M )(-*\d+,-*\d* )(C ))(-*\d+,-*\d*)/g;
                    console.log(activeThrowPath.replace(regex, str))
                    break;
                case 'handle2':
                    regex = /(?<=^(M )(-*\d+,-*\d* )(C )(-*\d+,-*\d* ))(-*\d+,-*\d*)/g;
                    console.log(activeThrowPath.replace(regex, str))
                    break;
                case 'endPoint':
                    regex = /(?<=^(M )(-*\d+,-*\d* )(C )(-*\d+,-*\d* )(-*\d+,-*\d* ))(-*\d+,-*\d*)/g;
                    console.log(activeThrowPath.replace(regex, str))
                    break;
                default: 
                    break;
            }
        }
        
        // setPoints({
        //     ...points,
        //     [draggingPointId]: { x: viewBoxX, y: viewBoxY },
        // })
    }

    return (
        <div className="hole-map">
            <svg className="max-with-aspect-preserved"
                ref={containerRef}
                viewBox={`${originXTrans} ${originYTrans} ${viewBoxWidth} ${viewBoxHeight}`}
                onMouseMove={editing? (ev) => {handleMouseMove(ev)}: ()=>{}}
                onMouseUp={editing? () => {handleMouseUp()}: ()=>{}}
                onMouseLeave={editing? () => {handleMouseUp()}: ()=>{}}
                style={{
                    overflow: 'visible',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    margin: 'auto',
                    border: '1px solid',
                    backgroundColor:"lightgreen",
                }}
            >
                <g className="svg-map-details">
                    <Tee width={map.tee.width} length={map.tee.height} />
                    <Basket x={map.basket.x} y={map.basket.y}/>
                </g>

                {
                    entries.flatMap(entry => 
                        entry.throws.map((t)=>(
                            <Throw key={`${holeNum}-${t.uid}`}
                                uid={t.uid} 
                                path={t.svg}
                                types={{
                                    offTee: t.offTee,
                                    circle1: t.circle1,
                                    inBasket: t.inBasket,
                                    outOfBounds: t.outOfBounds,
                                }}
                                connectors={{}}
                                isActive={t.uid === activeThrow}
                                handleMouseDown={
                                    t.uid === activeThrow ?
                                    handleMouseDown : undefined
                                }
                                editing={editing}
                            />
                        ))
                    )
                }
            </svg>
        </div>
    )
}

//<EditCurve path={'M 0,0 C 50,75 75,50 50,300'} originXTrans={-100} originYTrans={ -50} viewBoxWidth={200} viewBoxHeight={400}/>

/*
map: { //wont change after initial set
    tee: { height: 8, width: 4 },
    basket: { x: -30, y: 300 },
    trees: [
        { x: -40, y: 150 },
    ],
    viewBox: '-200 -50 400 400',
    zones: [
        {
            //id name type(color/fill with color or lines/etc) shape z-index(if needed)
        }
    ]
},

{
    uid: '1-1-1',
    throw: 1,
    svg: 'path',
    offTee: true,
    circle1: true
},

*/