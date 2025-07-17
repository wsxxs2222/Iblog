'use client'
import { createContext } from "react";
import React from "react";

const post1 = {title: 'post1', content: 'hi', username: 'joe'};
const post2 = {title: 'post2', content: 'good morning', username: 'joe'};  
const post3 = {title: 'post3', content: 'sample content', username: 'john'};  
export const AppStateContext = createContext(
    {
        currentUser: null,
        postList: [],
        setPostList: null,
        setCurrentUser: null,
    }
)

export function AppStateKeeper({children}) {
    const [postList, setPostList] = React.useState([post1, post2, post3]);
    const [currentUser, setCurrentUser] = React.useState({
            username: 'joe',
            accountCreatedTime: new Date(2025, 6, 17),
        });
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

    const contextValues = {
        currentUser: currentUser,
        postList: postList,
        setCurrentUser: setCurrentUser,
        setPostList: setPostList,
        addPost: addPost,
        deletePost: deletePost,
    }
    return <AppStateContext value={contextValues}>{children}</AppStateContext>
}

