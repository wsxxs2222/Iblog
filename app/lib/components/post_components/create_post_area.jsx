'use client'
import React from 'react';
import { useContext } from 'react';
import { AppStateContext } from '../app_context';
import { useSession } from 'next-auth/react';
import { timeFormatter } from '../../../util/time_tools';
import axios from 'axios';

function CreatePostArea() {
    const [inputPost, setInputPost] = React.useState({title: '', content: '',});
    const {refreshPostList} = useContext(AppStateContext);
    const session = useSession();

    return <form id='create-post-area'>
        <input name='title' value={inputPost.title} onChange={updateInputPost} type="text" placeholder="title"/>
        <textarea name="content" value={inputPost.content} onChange={updateInputPost} placeholder="content"></textarea>
        <button onClick={(event) => {
            event.preventDefault();
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

    async function addPost(post) {
        const currentTime = new Date();
        post.timeCreated = timeFormatter(currentTime);
        post.email = session.data?.user.email;
        await axios.post('/api/user-post', {
            post: post,
        });
        await axios.post('/api/ai/comment-post', {post: post});
        await refreshPostList();
    }
}

export {CreatePostArea};