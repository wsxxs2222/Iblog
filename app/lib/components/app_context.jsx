'use client'
import { createContext, useCallback, useMemo } from "react";
import React from "react";
import axios from 'axios';
import { useSession } from 'next-auth/react';

export const AppStateContext = createContext(
    {
        postList: [],
        setPostList: null,
    }
)

export function AppStateKeeper({children}) {
    const session = useSession();
    const [postList, setPostList] = React.useState([]);

    const refreshPostList = useCallback(async () => {
        try {
            const response = await axios.get('/api/user-post');
            const result = response.data;
            // console.log(`result is`, result);
            if (!result.success) {
                console.log('failed to fetch posts');
                setPostList([]);
            }
            setPostList(result.posts);
        } catch (e) {
            console.log(e);
            setPostList([]);
        }
    }, [setPostList]);

    

    const isContentFromCurrentUser = useCallback((contentUser) => {
        return contentUser === session.data?.user.name;
    }, [session,]);

    const isLoggedIn = useCallback(() => {
        return session.status === "authenticated";
    }, [session,]);

    const contextValues = useMemo(() => (
        {
            postList: postList,
            setPostList: setPostList,
            refreshPostList: refreshPostList,
            isContentFromCurrentUser: isContentFromCurrentUser,
            isLoggedIn: isLoggedIn,
        }
    ), [postList, refreshPostList, isContentFromCurrentUser, isLoggedIn,]);
    return <AppStateContext value={contextValues}>{children}</AppStateContext>;
}

