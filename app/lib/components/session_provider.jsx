'use client'

import { SessionProvider } from "next-auth/react"

function SessionProviderWrapper({children}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export {SessionProviderWrapper};