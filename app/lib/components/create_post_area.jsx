'use client'
import React from 'react';
import { useContext } from 'react';
import { AppStateContext } from '../../context';
import { useSession } from 'next-auth/react';
import { timeFormatter } from '../../util/time_tools';

function CreatePostArea() {
    const [inputPost, setInputPost] = React.useState({title: '', content: '',});
    const {addPost} = useContext(AppStateContext);
    const session = useSession();

    return <form id='create-post-area'>
        <input name='title' value={inputPost.title} onChange={updateInputPost} type="text" placeholder="title"/>
        <textarea name="content" value={inputPost.content} onChange={updateInputPost} placeholder="content"></textarea>
        <button onClick={(event) => {
            event.preventDefault();

            const currentTime = new Date();
            inputPost.timeCreated = timeFormatter(currentTime);
            inputPost.email = session.data?.user.email;

            addPost(inputPost);
            setInputPost({title: '', content: '',});
        }}>Post</button>
    </form>;

    function updateInputPost(event) {
        const {name, value} = event.target;
        setInputPost((oldInputPost) => {
            return {...oldInputPost, [name]: value,};
        });
    }
}

export {CreatePostArea};