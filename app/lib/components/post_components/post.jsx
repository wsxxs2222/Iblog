import React, { useState } from 'react';
import { useContext } from 'react';
import { AppStateContext } from '../app_context';
import PostStateKeeper from './post_context';
import axios from 'axios';
import { CommentInput } from '../comment_components/comment_input';
import { CommentThread } from '../comment_components/comment_thread';

function Post({title, content, username, id, timeCreated}) {
    const {refreshPostList, isContentFromCurrentUser, isLoggedIn} = useContext(AppStateContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isCommentMode, setIsCommentMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    
    return <PostStateKeeper postId={id}>
        {isEditMode 
            ? <input type="text" value={editedTitle} onChange=
                {(event) => {
                    const newTitle = event.target.value;
                    setEditedTitle(newTitle);
                }} /> 
            : <h2>{title}</h2>}
        <h3>by {username} at {timeCreated?.slice(0, 10)}</h3>
        {isEditMode 
            ? <input type="text" value={editedContent} onChange=
                {(event) => {
                    const newContent = event.target.value;
                    setEditedContent(newContent);
                }} /> 
            : <p>{content}</p>}
        {isContentFromCurrentUser(username)
            ? isEditMode 
                ? <button onClick={editPost}>OK</button>
                : <button onClick=
                    {() => {
                        setIsEditMode(true);
                    }}>edit</button>
            : null
        }
        
        <div className='row-of-buttons'>
            {isLoggedIn() 
                ? <button onClick=
                    {
                        () => {
                            setIsCommentMode(!isCommentMode);
                        }
                    }
                    >comment</button>
                : null}
            {isContentFromCurrentUser(username) 
                ? <button onClick=
                {() => {
                    deletePost(id);
                }}>Delete</button>
                : null}
        </div>
        {isCommentMode ? <CommentInput postId={id} username={username}></CommentInput> : null}
        {<CommentThread postId={id}></CommentThread>}
    </PostStateKeeper>;
    
    async function editPost() {
        try {
            await axios.patch('/api/user-post', {title: editedTitle, content: editedContent, id: id,});
            await refreshPostList();
        } catch (e) {
            console.log(e);
        } finally {
            setIsEditMode(false);
        }
    }

    async function deletePost(idOfToBeDeletedPost) {
        await axios.delete('/api/user-post', {
            data: {id: idOfToBeDeletedPost,},
        });
        await refreshPostList();
    }
}

export {Post};