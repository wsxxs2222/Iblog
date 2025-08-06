'use client'
import { createContext, useCallback, useMemo } from "react";
import React from "react";
import axios from 'axios';

export const AppStateContext = createContext(
    {
        postList: [],
        setPostList: null,
    }
)

export function AppStateKeeper({children}) {
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
        }
    ), [postList, addPost, deletePost, fetchPostList,]);
    return <AppStateContext value={contextValues}>{children}</AppStateContext>
}

