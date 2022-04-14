import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Card = () => {
    return (
        <div>
            <h1>Card</h1>
        </div>
    );
}

export default Card;


export const DiningCard = (props) => {
    const [data, useData] = useState([]);

    useEffect(() => {
        useData(props.data);
    }, [props.data]);

    return (
        <div id={data?.hall_id}
            onClick={props.clickFunc}
        >
            <h1>{data?.hall_name}</h1>
            <p>{String(data?.hours).replace(/^"(.*)"$/, '$1')}</p>
        </div>
    );
}