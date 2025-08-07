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

    const fetchPostList = useCallback(async () => {
        try {
            const response = await axios.get('/api/user-post');
            const result = response.data;
            console.log(`result is`, result);
            if (!result.success) {
                console.log('failed to fetch posts');
                return [];
            }
            return result.posts;
        } catch (e) {
            console.log(e);
            return [];
        }
    }, []);

    

    const isContentFromCurrentUser = useCallback((contentUser) => {
        return contentUser === session.data?.user.name;
    }, [session,]);

    const isLoggedIn = useCallback(() => {
        return session.status === "authenticated";
    }, [session,]);


    const addPost = useCallback(async (post) => {
        await axios.post('/api/user-post', {
            post: post,
        });
        const apiPostList = await fetchPostList();
        setPostList(apiPostList);
    }, [fetchPostList]);
    const deletePost = useCallback(async (idOfToBeDeletedPost) => {
        await axios.delete('/api/user-post', {
            data: {id: idOfToBeDeletedPost,},
        });
        const apiPostList = await fetchPostList();
        setPostList(apiPostList);
    }, [fetchPostList]);

    const contextValues = useMemo(() => (
        {
            postList: postList,
            setPostList: setPostList,
            addPost: addPost,
            deletePost: deletePost,
            fetchPostList: fetchPostList,
            isContentFromCurrentUser: isContentFromCurrentUser,
            isLoggedIn: isLoggedIn,
        }
    ), [postList, addPost, deletePost, fetchPostList, isContentFromCurrentUser, isLoggedIn,]);
    return <AppStateContext value={contextValues}>{children}</AppStateContext>;
}

