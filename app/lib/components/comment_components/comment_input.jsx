'use client'

import { useState, useContext } from "react"
import axios from "axios"
import { PostStateContext } from "../post_components/post_context";

function CommentInput({postId, username}) {
    const [commentContent, setCommentContent] = useState('');
    const {fetchCommentList} = useContext(PostStateContext);

    return <div>
        <input type="text" value={commentContent} onChange=
        {
            (event) => {
                const newContent = event.target.value;
                setCommentContent(newContent);
            }
        } placeholder="enter comment" />
        <button onClick={addComment}>submit comment</button>
    </div>

    async function addComment() {
        const comment = {postId: postId, content: commentContent, username: username}
        await axios.post(`/api/user-post/comment?postId=${postId}`, {comment: comment});
        setCommentContent('');
        await fetchCommentList();
    }
}

export {CommentInput}