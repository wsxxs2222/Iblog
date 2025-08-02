'use client'
import { createContext, useCallback, useMemo } from "react";
import React from "react";

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
            const response = await fetch('/api/test-db');
            const result = await response.json();
            console.log(`result is ${result}`);
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

    function addPost(post) {
        setPostList((oldPostList) => {
            return [...oldPostList, post];
        });
    }
    function deletePost(idOfToBeDeletedPost) {
        setPostList((oldPostList) => {
            return oldPostList.filter((post, postIndex) => {
                return postIndex != idOfToBeDeletedPost;
            });
        });
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

