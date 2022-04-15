import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';


import style from '../styles/pages/notfound.module.css'

const NotFound = () => {

    const navigate = useNavigate();

    const goHome = () => {
        setTimeout(() => {
            navigate('/');
        }, 4000);
    }
    useEffect(() => {
        goHome();
    }, []);

    return (
        <div className={style.notFoundContainer}>
            <div className={style.notFound}>                
                <h1>404</h1>
                <span></span>
                <p>Page not found</p>
            </div>
            <p>One moment, you are being redirect...</p>
            <p>
                If you are not redirected, please click <Link to="/">here</Link>   
            </p>
        </div>
    );
}

export default NotFound;