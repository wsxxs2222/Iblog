'use client'

import { useState, useContext } from "react"
import axios from "axios"
import { PostStateContext } from "../post_components/post_context";
import '../../../ui/comment.css';
import '../../../ui/component.css';

function CommentInput({postId, username}) {
    const [commentContent, setCommentContent] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const {refreshCommentList} = useContext(PostStateContext);

    return isExpanded 
            ?   <div id="comment-input">
                    <textarea autoFocus value={commentContent} onChange=
                        {
                            (event) => {
                                const newContent = event.target.value;
                                setCommentContent(newContent);
                            }
                        } rows={3} />
                    <div id="comment-input-button-row">
                        <button className="button-small muted"
                            onClick={() => {
                                setIsExpanded(false);
                            }}
                        >Cancel</button>
                        <button className="button-small secondary" onClick={addComment}>Comment</button>
                    </div>
                </div>
            :   <input id="comment-prompt" type="text" placeholder="Add a comment" 
                onClick={() => {
                    setIsExpanded(true);
                }}/>;

    async function addComment() {
        const comment = {postId: postId, content: commentContent, username: username}
        await axios.post(`/api/user-post/comment?postId=${postId}`, {comment: comment});
        setCommentContent('');
        await refreshCommentList();
    }
}

export {CommentInput}