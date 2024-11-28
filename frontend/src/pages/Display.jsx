import React, { useState } from 'react'
import Map from './Map2.jsx';
import Estimate from './Estimate.jsx';

function Display() {
    const [data, setData] = useState({});
    
    return (
        <>
            {Object.keys(data).length == 0 ? <Map /> : <Estimate />}
        </>
    )
}

export default Display