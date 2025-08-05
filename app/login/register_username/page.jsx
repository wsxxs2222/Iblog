'use client'

import { Suspense } from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';

function RegisterUsernamePage() {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const router = useRouter();

    return <div>
            <input type="text" name='username' placeholder='enter a username' onChange={(event) => {
                const newUsername = event.target.value;
                setUsername(newUsername);
            }}/>
            <h3>{errorMessage}</h3>
            <button onClick={() => submitUsername()}>submit</button>
        </div>;

    async function submitUsername() {
        try {
            await axios.post('/api/auth/create_username', {username: username, email: email});
            router.push('/login?isFirstTime=true');
        } catch (e) {
            console.log(e);
            setErrorMessage(e.response.data.error ?? 'something went wrong');
        }
    }
}

export default function RegisterPageWrapper() {
    return <Suspense>
        <RegisterUsernamePage></RegisterUsernamePage>
    </Suspense>
}