'use client'
import React from 'react';
import { useContext } from 'react';
import { AppStateContext } from '../app_context';
import { useSession } from 'next-auth/react';
import { timeFormatter } from '../../../util/time_tools';
import axios from 'axios';
import { Button } from '../basic_elements/button';
import '../../../ui/post_creation.css';

function CreatePostModal({onClose}) {
    const [inputPost, setInputPost] = React.useState({title: '', content: '',});
    const {refreshPostList} = useContext(AppStateContext);
    const session = useSession();

    return <div id='post-modal-wrapper'>
        <div id='create-post-modal'>
            <div id='close-modal-row'>
                <button className='close-button' onClick={onClose}>&times;</button>
            </div>
            <form id='create-post-form'>
                <input name='title' value={inputPost.title} onChange={updateInputPost} type="text" placeholder="title"/>
                <textarea name="content" value={inputPost.content} onChange={updateInputPost} placeholder="content" rows={5}></textarea>
                <div id='post-button-row'>
                    <Button onClick={(event) => {
                        event.preventDefault();
                        addPost(inputPost);
                        setInputPost({title: '', content: '',});
                        onClose();
                    }}>Post</Button>
                </div>
            </form>
        </div>
    </div>;

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
        const response = await axios.post('/api/user-post', {
            post: post,
        });
        post.id = response.data.postId;
        await axios.post('/api/ai/comment-post', {post: post});
        await refreshPostList();
    }
}

export {CreatePostModal};