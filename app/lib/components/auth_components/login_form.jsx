'use client'

import { useState } from "react";
import { signIn } from 'next-auth/react';
import '../../../ui/auth.css';
import '../../../ui/component.css';

export function LoginForm() {
    const [email, setEmail] = useState('');

    return <div className="auth-form">
        <input type="text" value={email} 
            onChange={(event) => {
                const {value} = event.target;
                setEmail(value);
            }}
            placeholder="enter email" />
        <button className="button-small primary"
            onClick={async () => {
                console.log('window.location.origin is', window.location.origin);
                await signIn('credentials',
                    {  email: email,},
                );
            }}
        >Login</button>
    </div>
}