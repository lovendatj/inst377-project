import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../library/components/anchorPanels/footer.reg.js';
import NavSmall from '../library/components/anchorPanels/nav.small.js';

import { setWithExpire } from '../library/utils/localStorage.expire.js';

// a signin form
const Signin = ( props ) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        setError(null);
        if (!username || !password) {
            setError('Please enter an username and password.');
            return;
        }

        const createUser = async () => {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            try{
                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setWithExpire('user', data.user, (1 * 15 * 60 * 1000));
                    navigate('/order');
                }
            }catch (e) {
                console.log(e);
            }
        };
        createUser();
    }

    return (
        <div>
            < NavSmall />
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}            
            <p>Already have an account? {' '}
                <Link to={'/signin'}> Click here to signin</Link>
            </p>
            < Footer />
        </div>
    );
                
}

export default Signin;
