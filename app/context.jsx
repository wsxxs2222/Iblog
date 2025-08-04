'use client'
import { createContext, useCallback, useMemo } from "react";
import React from "react";
import axios from 'axios';

export const AppStateContext = createContext(
    {
        currentUser: null,
        postList: [],
        setPostList: null,
        setCurrentUser: null,
    }
)

export function AppStateKeeper({children}) {
    const [postList, setPostList] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({
            username: 'joe',
            accountCreatedTime: new Date(2025, 6, 17),
        });

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

    async function addPost(post) {
        await axios.post('/api/user-post', {
            post: post,
        });
        const apiPostList = await fetchPostList();
        setPostList(apiPostList);
    }
    async function deletePost(idOfToBeDeletedPost) {
        await axios.delete('/api/user-post', {
            data: {id: idOfToBeDeletedPost,},
        });
        const apiPostList = await fetchPostList();
        setPostList(apiPostList);
    }

    const contextValues = useMemo(() => (
        {
            currentUser: currentUser,
            postList: postList,
            setCurrentUser: setCurrentUser,
            setPostList: setPostList,
            addPost: addPost,
            deletePost: deletePost,
            fetchPostList: fetchPostList,
        }
    ), [currentUser, postList,]);
    return <AppStateContext value={contextValues}>{children}</AppStateContext>
}

