import React, { useState, useEffect } from 'react';
import './App.css';

// import Bezier from '../Bezier';
import EditingToggle from './EditingToggle';
import { EditCurve } from '../Svg';
import Controls from '../Controls';
import Row from '../Row';
import AppBar from '../AppBar';
import CourseDetails from '../CourseDetails';

import { createVisibleState } from '../helper';
import { dataSample, playersSample } from '../sampleData';

// const MyContext = React.createContext();
// const MyComponent = () => {
//     const { count, increment } = useContext(MyContext)
//     return (
//         <div onClick={increment}>price: {count}</div>
// 	)
// }

const App = () => {
    const [editing, setEditing] = useState(true);
    const [data, setData] = useState({});
    const [players, setPlayers] = useState([]);

    useEffect(()=>{
        //will fetch data from json
        //parse data
        //contruct visible state
        //set states
        setData(dataSample);
        setPlayers(playersSample);
    }, []);

    let singleRowData; 
    if(data.holes && data.holes.length > 0) singleRowData = data.holes[0];

    const upsertCard = () => {}; //creates holetext, details/map from template
    const removeCard = () => {};
    const upsertHole = () => {};
    const removeHole = () => {};
    const upsertPlayer = () => {};
    const removePlayer = () => {};
    const upsertHoleText = () => {};

    const updateDetails = () => {};
    const updateMap = () => {};
    const updateEntries = () => {};
    const updateExtras = () => {};

    return (
        <React.Fragment>
        <AppBar>
            <EditingToggle editing={editing} setEditing={setEditing} />
        </AppBar>
        <main>
            <CourseDetails courseData={data.course || {}} courseText={''} editing={editing}/>
            
            {   data && data.holes && 
                data.holes.map(hole => (
                    <Row 
                        key={hole.details.number}
                        players={players} 
                        singleRowData={hole} 
                        holeText={''} 
                        editing={editing}
                    />
                ))
            }
            
            <div className="sample-row">
                <div className="svg">
                    <EditCurve path={'M 0,0 C 50,75 75,50 50,300'} originXTrans={-100} originYTrans={ -50} viewBoxWidth={200} viewBoxHeight={400}/>
                </div>
                <div className="controls">
                    Controls
                    {
                        data && data.holes
                        ? (<Controls data={singleRowData} players={players} />)
                        :""
                    }
                </div>
            </div>
        </main>
        </React.Fragment>
	)
}

export default App;

/*

<Row players={players} singleRowData={singleRowData} holeText={''} editing={true}/>
            <Row players={players} singleRowData={singleRowData} holeText={''} />


const [count, updateCount] = useState(0)
function increment() {
    updateCount(count + 1)
}

<MyContext.Provider value={{ count, increment }}>
<div className="App">
    <header className="App-header">
        <div>
            Context test clicks
            <MyComponent />
            <MyComponent />
        </div>
    </header>
</div>	
</MyContext.Provider>

<Bezier/>
*/