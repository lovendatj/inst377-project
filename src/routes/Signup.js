import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// a signin form
const Signin = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
                    console.log(data.user);
                    localStorage.setItem('user', data.user);
                    window.location.href = '/order';
                }
            }catch (e) {
                console.log(e);
            }
        };
        createUser();
    }

    return (
        <div>
            <h1>Create an Account</h1>
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
            <p>Already have an account? 
                <Link to={'/signin'}>Click here to signin</Link>
            </p>
        </div>
    );
                
}

export default Signin;
