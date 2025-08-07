'use client'

import { useEffect, useContext } from "react"
import axios from "axios"
import { PostStateContext } from "../post_components/post_context";

function CommentThread() {
    const {fetchCommentList, commentList,} = useContext(PostStateContext);

    useEffect(() => {
        fetchCommentList();
    }, [fetchCommentList]);

    return <div>
        {commentList.map((comment, index) => {
            return <Comment key={index} content={comment.content} username={comment.username} commentId={comment.id}></Comment>
        })}
    </div>
}

function Comment({content, username, commentId}) {
    const {fetchCommentList,} = useContext(PostStateContext);

    return <div>
        <h4>{content}</h4>
        <p>by {username}</p>
        <button onClick={deleteComment}>delete comment</button>
    </div>;

    async function deleteComment() {
        console.log('client comment id is', commentId);
        await axios.delete(`/api/user-post/comment?commentId=${commentId}`);
        await fetchCommentList();
    }
}

export {CommentThread}