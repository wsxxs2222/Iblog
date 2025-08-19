'use client';

import { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { LoginForm } from '../lib/components/auth_components/login_form';
import { SignupForm } from '../lib/components/auth_components/signup_form';
import '../ui/component.css';

function LoginPage() {
  const searchParams = useSearchParams();
  const isFirstTime = searchParams.get('isFirstTime');
  const [formType, setFormType] = useState('login');

  return <div id='login-body'>
    {isFirstTime ? <h2>Account created successfully! Please log in.</h2> : null}
    {formType === 'login'
      ? <LoginForm></LoginForm>
      : <SignupForm></SignupForm>}
    <p onClick={changeFormType}>switch to {formType === 'login' 
    ? 'signup'
    : 'login'}</p>
    <button className='button-large primary' onClick={() => signIn('google')}>Sign in with Google</button>
  </div>;

  function changeFormType() {
    setFormType(formType === 'login' 
      ? 'signup'
      : 'login'
    );
  }
}

export default function LoginPageWrapper() {
  return <Suspense>
    <LoginPage>
    
    </LoginPage>
  </Suspense>;
}