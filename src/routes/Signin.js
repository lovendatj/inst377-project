import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// a signin form
const Signin = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            window.location.href = '/order';
        }
    }, []);

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
                    localStorage.setItem('user', data.user);
                    window.location.href = '/order';
                }
            } catch (e) {
                console.log(e);
            }
        };
        validateUser();
    }

    return (
        <div>
            <h1>Sign In</h1>
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
                <button type="submit">Sign In</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Don't have an account? 
                <Link to={'/signup'}>Click here to signup</Link>
            </p>
        </div>
    );
                
}

export default Signin;
