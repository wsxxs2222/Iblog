'use client'

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import '../../../ui/appbar.css';

export function MyAppBar() {
    const { data: session } = useSession();

    const pathname = usePathname();
    return <div className="appbar">
        <div className="appbar-left">
            <Image id="blog-logo" src="/images/ibloglogo.png" alt="iblog logo" width={64} height={64} />
            <h1 id="page-title">IBLOG</h1>
        </div>
        <div className="appbar-right">
            <Link key='Home' href='/'>
                <h2 className={`tab-item ${pathname === '/' ? 'active-tab' : null}`}>Home</h2>
            </Link>
            {session ? <Link key='Profile' href='/profile'>
                <h2 className={`tab-item ${pathname === '/profile' ? 'active-tab' : null}`}>Profile</h2>
            </Link> : null}
            {session ? (
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        signOut({ callbackUrl: '/' });
                    }}
                    className="tab-item"
                >
                    Logout
                </a>
                ) : (
                <Link href="/login">
                    <h2 className={`tab-item ${pathname === '/login' ? 'active-tab' : null}`}>Login</h2>
                </Link>
                )
            }
        </div>
    </div>;
}