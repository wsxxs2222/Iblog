import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from 'react';
import { AppStateContext } from '../../context';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function Post({title, content, username, id, timeCreated}) {
    const session = useSession();
    const [hasLiked, setHasLiked] = React.useState(false);
    const {deletePost, fetchPostList, setPostList} = useContext(AppStateContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    
    return <div>
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
        {username === session.data?.user.name 
            ? isEditMode 
                ? <button onClick={confirmPostEdit}>OK</button>
                : <button onClick=
                    {() => {
                        setIsEditMode(true);
                    }}>edit</button>
            : null
        }
        
        <div className='row-of-buttons'>
            <button 
            onClick={() => {
                setHasLiked((oldHasLiked) => {
                   return !oldHasLiked; 
                });
            }}>
                {hasLiked 
                    ? (<FavoriteIcon style={{ color: 'red' }} />) 
                    : (<FavoriteBorderIcon style={{ color: 'gray' }} />)}
            </button>
            <button onClick=
            {() => {
                deletePost(id);
            }}>Delete</button>
        </div>
    </div>
    async function confirmPostEdit() {
        try {
            await axios.patch('/api/user-post', {title: editedTitle, content: editedContent, id: id,});
            setPostList(await fetchPostList());
        } catch (e) {
            console.log(e);
        } finally {
            setIsEditMode(false);
        }
    }
}

export {Post};