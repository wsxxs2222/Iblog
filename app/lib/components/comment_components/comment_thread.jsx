'use client'

import { useEffect, useContext } from "react"
import axios from "axios"
import Avatar from "react-avatar";
import { PostStateContext } from "../post_components/post_context";
import { AppStateContext } from "../app_context";
import { OptionList } from "../basic_elements/option_list";
import '../../../ui/component.css';
import '../../../ui/comment.css';

function CommentThread() {
    const {refreshCommentList, commentList,} = useContext(PostStateContext);

    useEffect(() => {
        refreshCommentList();
    }, [refreshCommentList]);

    // console.log('commentList is', commentList);

    return <div>
        {commentList.map((comment) => {
            return <Comment key={comment.id} content={comment.content} username={comment.author} commentId={comment.id}></Comment>
        })}
    </div>
}

function Comment({content, username, commentId}) {
    const {refreshCommentList,} = useContext(PostStateContext);
    const {isContentFromCurrentUser} = useContext(AppStateContext);

    return <div className="comment-container">
        <div className="user-avatar-column">
           <Avatar name={username} size='36' round={true} className=".comment-user-avatar"></Avatar>
        </div>
        <div className="comment-data-column">
            <div className="comment-top-row">
                <div className="comment-username-container">
                    <h3>{username ?? 'Anonymous user '}</h3>
                </div>
                {isContentFromCurrentUser(username)
                    ? <div className="option-menu-container">
                            <OptionList optionList={
                                [
                                    {name: 'delete', onClick: () => {
                                        deleteComment();
                                    }},
                                ]
                            }></OptionList>
                        </div>
                    : null}
            </div>
            <div className="comment-content-container">
                <h4>{content}</h4>
            </div>
        </div>
    </div>;

    async function deleteComment() {
        console.log('client comment id is', commentId);
        await axios.delete(`/api/user-post/comment?commentId=${commentId}`);
        await refreshCommentList();
    }
}

export {CommentThread}