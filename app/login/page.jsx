'use client';

import { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

function LoginPage() {
  const searchParams = useSearchParams();
  const isFirstTime = searchParams.get('isFirstTime');

  return <div>
      {isFirstTime ? <h2>Account created successfully! Please log in.</h2> : null}
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>;
}

export default function LoginPageWrapper() {
  return <Suspense>
    <LoginPage>
    
    </LoginPage>
  </Suspense>;
}