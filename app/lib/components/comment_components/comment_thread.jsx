'use client'

import { useEffect, useContext } from "react"
import axios from "axios"
import { PostStateContext } from "../post_components/post_context";
import { AppStateContext } from "../app_context";

function CommentThread() {
    const {refreshCommentList, commentList,} = useContext(PostStateContext);

    useEffect(() => {
        refreshCommentList();
    }, [refreshCommentList]);

    // console.log('commentList is', commentList);

    return <div>
        {commentList.map((comment, index) => {
            return <Comment key={index} content={comment.content} username={comment.author} commentId={comment.id}></Comment>
        })}
    </div>
}

function Comment({content, username, commentId}) {
    const {refreshCommentList,} = useContext(PostStateContext);
    const {isContentFromCurrentUser} = useContext(AppStateContext);

    return <div>
        <h4>{content}</h4>
        <p>by {username ?? 'deleted account'}</p>
        {isContentFromCurrentUser(username)
            ? <button onClick={deleteComment}>delete comment</button>
            : null}
    </div>;

    async function deleteComment() {
        console.log('client comment id is', commentId);
        await axios.delete(`/api/user-post/comment?commentId=${commentId}`);
        await refreshCommentList();
    }
}

export {CommentThread}