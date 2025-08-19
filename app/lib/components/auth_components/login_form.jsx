'use client'

import { useState } from "react";
import { signIn } from 'next-auth/react';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    return <div>
        <input type="text" value={email} 
            onChange={(event) => {
                const {value} = event.target;
                setEmail(value);
            }}
            />
        <button 
            onClick={async () => {
                console.log('window.location.origin is', window.location.origin);
                const result = await signIn('credentials',
                    {  email: email,},
                );
            }}
        >Login</button>
        {errorMessage 
            ? <p>{errorMessage}</p>
            : null}
    </div>
}