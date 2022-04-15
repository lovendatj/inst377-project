import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../library/components/anchorPanels/footer.reg.js';
import NavSmall from '../library/components/anchorPanels/nav.small.js';

import { setWithoutExpire } from '../library/utils/localStorage.control.js';

import style from '../styles/components/form.module.css'


const Signin = ( props ) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!username || !password) {
            setError('Please enter an username and password.');
            return;
        }

        const validateUser = async () => {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            try {
                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                } else {            
                    setWithoutExpire('user', data.user);
                    navigate('/menus');
                }
            } catch (e) {
                console.log(e);
            }
        };
        validateUser();
    }

    return (
        <div>
            < NavSmall />
            <div className={style.formWrapper}>                
                <form onSubmit={onSubmit}>
                    <h1 id="title">Sign In</h1>
                    <div className={style.formGroup}>
                        <label htmlFor="username">username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Enter Username..."
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter Password..."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={style.error} style={{ color: 'red' }}>{error}</p>}
                    
                    <button type="submit">Sign In</button>
                
                    <p>Don't have an account?</p>
                    <Link to={'/signup'}>Click here to signup</Link>
                    
                </form>
            </div>
            < Footer />
        </div>
    );
                
}

export default Signin;
