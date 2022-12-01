import start from './imgStart.png';
import React from 'react';
//import _ from "lodash";
import './StarsDispay.css';
function StarsDisplay (props) {
    const range = (min,max) => Array.from({length: max - min +1}, (_, i) => min + i);
    return ( 
        range(1, props.count ).map(starId => <div key={starId} className="start"><img src={start} alt="star" /></div>) 
     );
}

export default StarsDisplay ;