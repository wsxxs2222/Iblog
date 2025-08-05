'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react"

const tabs = [
    {name: 'Home', href: '/',},
    {name: 'Profile', href: '/profile',},
    {name: 'Login', href: '/login',},
];

export function MyAppBar() {
    const { data: session } = useSession();

    const pathname = usePathname();
    return <div id="appbar">
        <Link key='Home' href='/'>
            <h2 className={pathname === '/' ? 'active-tab' : null}>Home</h2>
        </Link>
        {session ? <Link key='Profile' href='/profile'>
            <h2 className={pathname === '/' ? 'active-tab' : null}>Profile</h2>
        </Link> : null}
        {session ? <button onClick={() => signOut()}>Logout</button> : <Link key='Login' href='/login'>
            <h2 className={pathname === '/' ? 'active-tab' : null}>Login</h2>
        </Link>}
    </div>;
    <div id="appbar">
        {tabs.map((tab) => {
            return <Link key={tab.name} href={tab.href}>
                <h2 className={pathname === tab.href ? 'active-tab' : null}>{tab.name}</h2>
            </Link>;
        })}
    </div>
}