'use client'
import { createContext, useState, useCallback, useMemo } from "react";
import axios from 'axios';

// object to access the state
export const PostStateContext = createContext(
    {
        commentList: [],
    }
);

// component that stores the state
export default function PostStateKeeper({postId ,children}) {
    const [commentList, setCommentList] = useState([]);

    const refreshCommentList = useCallback(async () => {
        const response = await axios.get(`/api/user-post/comment?postId=${postId}`);
        setCommentList(response.data.commentList);
        // console.log('commentList is', commentList);
    }, [setCommentList, postId,]);

    const contextValues = useMemo(() => (
            {
                commentList: commentList,
                setCommentList: setCommentList,
                refreshCommentList: refreshCommentList,
            }
        ), [commentList, setCommentList, refreshCommentList,]);

    return <PostStateContext value={contextValues}>{children}</PostStateContext>;
}