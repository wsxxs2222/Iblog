'use client'
import React from 'react';
import { useContext } from 'react';
import { AppStateContext } from '../../context';

function CreatePostArea(props) {
    const [inputPost, setInputPost] = React.useState({title: '', content: '',});
    const {currentUser} = useContext(AppStateContext);

    return <form id='create-post-area'>
        <input name='title' value={inputPost.title} onChange={updateInputPost} type="text" placeholder="title"/>
        <textarea name="content" value={inputPost.content} onChange={updateInputPost} placeholder="content"></textarea>
        <button onClick={(event) => {
            event.preventDefault();
            props.onAddPost(inputPost);
            setInputPost({title: '', content: '',});
        }}>Post</button>
    </form>;

    function updateInputPost(event) {
        const {name, value} = event.target;
        setInputPost((oldInputPost) => {
            return {...oldInputPost, [name]: value, username: currentUser.username};
        });
    }
}

export {CreatePostArea};