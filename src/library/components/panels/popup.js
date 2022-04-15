import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from '../../../styles/components/popup.module.css';

const PopUp = (props) => {
    const { title, message, callback, redirect } = props;
    const navigate = useNavigate();
    
    const [isShown, setShown] = useState(true);

    const closePopup = async() => {
        setShown(false);
        await callback();
    };

    const redirectTo = async() => {
        setShown(false);
        await callback();
        if(redirect) {
            navigate(redirect);
        }
    };
    
    return (
        <div className={style.popup} style={{
            display: isShown ? 'block' : 'none',
        }}>
            <div className={style.popupContent}>
                <h1>{title}</h1>
                <p>{message}</p>
                <div className={style.buttonWrapper}>    
                    <button onClick={() => closePopup()}>Close</button>
                    <button onClick={() => redirectTo()}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp;