import React from 'react';

import {parseSinglePath} from './index';

export const Throw = React.memo( ({uid, visible, path, types, color, connectors, isActive, editing, handleMouseDown}) => {
    const pSP = parseSinglePath(path);
    if(!pSP) return (<g id={`throw-path-${uid}`}></g>)

    let ending;
    switch(true){
        case (types.inBasket === true):
            ending = (<LandingPoint coordinates={pSP.endPoint} color={'blue'}/>);
            break;
        case (types.outOfBounds === true):
            //ending = (); //red x
            break;
        default:
            console.log('adsf')
            ending = (<LandingPoint coordinates={pSP.endPoint} />)
    }

    return (
        <g id={`throw-path-${uid}`}>

            <Curve d={path} color={isActive ? "purple" : undefined} />

            { 
                !types.offTee ? 
                <LandingPoint coordinates={pSP.startPoint} /> 
                :""
            }
            { ending }

            {
                connectors.originToBasket ? 
                <ConnectingLine
                    from={pSP.startPoint}
                    to={connectors.toBasket}
                />:""
            }
            {
                connectors.originToEnd ? 
                <ConnectingLine
                    from={pSP.startPoint}
                    to={pSP.endPoint}
                />:""
            }
            {
                connectors.endToBasket ? 
                <ConnectingLine
                    from={pSP.endPoint}
                    to={connectors.toBasket}
                />:""
            }

            {
                isActive && editing 
                ? (
                <React.Fragment>
                    <SmallHandle
                        coordinates={pSP.handle1}
                        onMouseDown={() =>{handleMouseDown('handle1')}}
                    />
                    <SmallHandle
                        coordinates={pSP.handle2}
                        onMouseDown={() =>{handleMouseDown('handle2')}}
                    />
                    <ConnectingLine from={pSP.startPoint} to={pSP.handle1} />
                    <ConnectingLine from={pSP.handle2} to={pSP.endPoint} />
                </React.Fragment>
                ):""
            }

        </g>
    )
} )

export const Curve = ({ d, color="rgb(213, 0, 249)", width=3 }) => (
    <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
    />
);
export const LandingPoint = ({coordinates, color="rgb(244, 0, 137)", r=3}) => (
    <ellipse
        cx={coordinates[0]}
        cy={coordinates[1]}
        rx={r}
        ry={r}
        fill="transparent"
        stroke={color}
        strokeWidth={2}
    />
)
export const Tee = ({width, length}) => {
    return (
        <rect
          x={"-"+ width/2} y={"-"+length}
          width={width} height={length}
          fill="white"
        />
    );
};
export const Basket = ({x,y}) => (
    <ellipse
        cx={x} cy={y}
        rx={4} ry={4}
        fill="black"
    />
);
export const ConnectingLine = ({ from, to }) => (
    <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        stroke="rgb(255, 255, 255)"
        strokeDasharray="5,5"
        strokeWidth={2}
    />
);

const LargeHandle = ({ coordinates, onMouseDown }) => (
    <ellipse
        cx={coordinates[0]}
        cy={coordinates[1]}
        rx={5}
        ry={5}
        fill="rgb(244, 0, 137)"
        onMouseDown={onMouseDown}
        style={{ cursor: '-webkit-grab' }}
    />
);

const SmallHandle = ({ coordinates, onMouseDown }) => (
    <ellipse
        cx={coordinates[0]}
        cy={coordinates[1]}
        rx={4}
        ry={4}
        fill="transparent"
        stroke="rgb(244, 0, 137)"
        strokeWidth={2}
        onMouseDown={onMouseDown}
        style={{ cursor: '-webkit-grab' }}
    />
);