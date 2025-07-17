'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";

const tabs = [
    {name: 'Home', href: '/',},
    {name: 'Profile', href: '/profile',},
    {name: 'Login', href: '/login',},
];

export function MyAppBar() {
    const pathname = usePathname();
    return <div id="appbar">
        {tabs.map((tab) => {
            return <Link key={tab.name} href={tab.href}>
                <h2 className={pathname === tab.href ? 'active-tab' : null}>{tab.name}</h2>
            </Link>;
        })}
    </div>
}