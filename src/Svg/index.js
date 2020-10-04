import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const parseSinglePath = (str) => {
    let values = str.split(' ');
    let [m, startStr, c, handle1Str, handle2Str, endStr] = values;

    function strCommaStrToInts(string) {
        return string.split(',').map(e=> parseInt(e))
    }

    return {
        startPoint: strCommaStrToInts(startStr),
        handle1: strCommaStrToInts(handle1Str), 
        handle2: strCommaStrToInts(handle2Str), 
        endPoint: strCommaStrToInts(endStr),
    }
};

const constructSinglePath = (startPoint, handle1, handle2, endPoint) => {
    return `
        M ${startPoint.join(',')}
        C ${handle1.join(',')} ${handle2.join(',')} ${endPoint.join(',')}
    `;
};

const CalcCurve = (props) => {
    let path;
    if (props.path) {
        path = props.path;
    }
    if (props.startPoint && props.handle1 && props.handle2 && props.endPoint) {
        path = constructSinglePath(props.startPoint, props.handle1, props.handle2, props.endPoint);
    }
    return (
        <path
            d={path}
            fill="none"
            stroke="hotpink"
            strokeWidth={5}
        />
    );
};

export const EditCurve = (props) => {
    const path = props.path;
    const viewBoxWidth = props.viewBoxWidth;
    const viewBoxHeight = props.viewBoxHeight;
    const originXTrans = props.originXTrans;
    const originYTrans = props.originYTrans;
    
    const [startPoint, setStartPoint] = useState([0,0]);
    const [handle1, setHandle1] = useState([0,0]);
    const [handle2, setHandle2] = useState([0,0]);
    const [endPoint, setEndPoint] = useState([0,0]);
    const [draggingPointId, setDraggingPointId] = useState(null);
    const containerRef = useRef(null);

    
    useEffect(() => {
        console.log('calculating')
        let values;
        try { 
            values = parseSinglePath(path);
            
            setStartPoint(values.startPoint);
            setHandle1(values.handle1);
            setHandle2(values.handle2);
            setEndPoint(values.endPoint);
        } catch (err) {
            //dont care
        }
    }, [path]);

    // may use this instead
    // const [points, setPoints] = useState(values);
    
    const handleMouseDown = (pointId) => {
        setDraggingPointId(pointId);
    }
  
    const handleMouseUp = () => {
        setDraggingPointId(null);
    }

    const handleMouseMove = (ev) => {
        const { clientX, clientY } = ev;
        if (!draggingPointId) {
            return;
        }
        console.log(ev)
        const svgRect = containerRef.current.getBoundingClientRect();

        const svgX = clientX - svgRect.left;
        const svgY = clientY - svgRect.top;

        const viewBoxX = svgX * viewBoxWidth / svgRect.width;
        const viewBoxY = svgY * viewBoxHeight / svgRect.height;

        const transformedX = viewBoxX + originXTrans;
        const transformedY = viewBoxY + originYTrans;

        switch(draggingPointId){
            case 'startPoint':
                setStartPoint([transformedX, transformedY]);
                break;
            case 'handle1':
                setHandle1([transformedX, transformedY]);
                break;
            case 'handle2':
                setHandle2([transformedX, transformedY]);
                break;
            case 'endPoint':
                setEndPoint([transformedX, transformedY]);
                break;
            default: 
                break;
        }
        // setPoints({
        //     ...points,
        //     [draggingPointId]: { x: viewBoxX, y: viewBoxY },
        // })
    }

    // const pathSvg = (
    //     <path
    //         d={}
    //         fill="none"
    //         stroke="hotpink"
    //         strokeWidth={5}
    //     />
    // );
    return (
        <svg className="max-with-aspect-preserved"
            ref={containerRef}
            viewBox={`${originXTrans} ${originYTrans} ${viewBoxWidth} ${viewBoxHeight}`}
            onMouseMove={ev => {handleMouseMove(ev)}}
            onMouseUp={() => {handleMouseUp()}}
            onMouseLeave={() => {handleMouseUp()}}
            style={{
                overflow: 'visible',
                maxWidth: '90%',
                maxHeight: '90%',
                margin: 'auto',
                border: '1px solid',
                backgroundColor:"lightgreen",

            }}
        >
            <g>
            <ConnectingLine
                from={startPoint}
                to={handle1}
            />
            <ConnectingLine from={handle2} to={endPoint} />

            <Curve d={constructSinglePath(startPoint, handle1, handle2, endPoint)} />

            <LargeHandle
            coordinates={startPoint}
            onMouseDown={() =>{handleMouseDown('startPoint')}}
            />

            <LargeHandle
            coordinates={endPoint}
            onMouseDown={() =>{handleMouseDown('endPoint')}}
            />

            <SmallHandle
            coordinates={handle1}
            onMouseDown={() =>{handleMouseDown('handle1')}}
            />

            <SmallHandle
            coordinates={handle2}
            onMouseDown={() =>{handleMouseDown('handle2')}}
            />

            <Tee width={4} length={8} />
            <Basket x={50} y={300}/>
            </g>
        </svg>
    )
}

export default (props) => {
    const {visible, data} = props;

    // currently active point (starts with tee at 0,0), clicking adds end point for line
    const [activePoint, setActivePoint] = useState([0,0]);


    const path = (
        <path
            d={`
                M 25,25
                C 100,50 25,75 25,100
                C 25,125 300,150 25,175
            `}
            fill="none"
            stroke="hotpink"
            strokeWidth={5}
        />
    );

    return (
        
            {path}
        
    );
}
{/* <svg
    viewBox="0 0 200 200"
    style={{ maxHeight: 400 }}
></svg> */}



const ConnectingLine = ({ from, to }) => (
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

const Curve = ({ d }) => (
    <path
        d={d}
        fill="none"
        stroke="rgb(213, 0, 249)"
        strokeWidth={5}
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

const Tee = ({width, length}) => {
    return (
        <rect
          x={"-"+ width/2} y={"-"+length}
          width={width} height={length}
          fill="white"
        />
    );
};
const Basket = ({x,y}) => (
    <ellipse
        cx={x} cy={y}
        rx={4} ry={4}
        fill="black"
    />
);

const rectangle = () => (
    <rect
      x={40} y={15}
      width={30} height={65}
      fill="hotpink"
    />
  );
const circle = () => (
<ellipse
    cx={30} cy={60}
    rx={20} ry={20}
    fill="lightsalmon"
/>
);
  const triangle = () => (
    <polygon
      points="15,80 30,55 45,80"
      fill="turquoise"
    />
  );