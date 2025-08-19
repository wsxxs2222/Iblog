'use client'

import { useState } from "react";
import axios from "axios";
import '../../../ui/auth.css';
import '../../../ui/component.css';

export function SignupForm() {
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isNewlyCreatedAccount, setIsNewlyCreatedAccount] = useState(false);

    return <div className="auth-form">
        <input type="text" name="username" value={credentials.username} 
            onChange={(event) => {
                const {name, value} = event.target;
                updateCredentials(name, value);
            }}
            placeholder="enter username" />
        <input type="text" name="email" value={credentials.email} 
            onChange={(event) => {
                const {name, value} = event.target;
                updateCredentials(name, value);
            }}
            placeholder="enter email" />
        <button className="button-small primary"
            onClick={() => {
                signUp(credentials.username, credentials.email);
            }}
        >Sign up</button>
        {errorMessage 
            ? <p>{errorMessage}</p>
            : null}
        {isNewlyCreatedAccount 
            ? <p>Account created successfully, please login</p>
            : null}
    </div>

    function updateCredentials(name, value) {
        setCredentials({...credentials, [name]: value})
    }

    async function signUp(username, email) {
        try {
            await axios.post('/api/auth/email/signup', {username: username, email: email});
        } catch (e) {
            if (e.response.status === 401) {
                setErrorMessage(e.response.data.error);
                return
            } else if (e.response.status !== 200) {
                setErrorMessage('something went wrong');
                return;
            }
        }
        setErrorMessage(null);
        setIsNewlyCreatedAccount(true);
    }
}