import React from 'react';
import { CreatePostArea } from './create_post_area';
import { Post } from './post';

function PostsPage() {

    const post = {title: 'sample title', content: 'sample content'};
    const [postList, setPostList] = React.useState([post]);

    return <div>
        <CreatePostArea onAddPost={addPost}></CreatePostArea>
        {postList.map((post, index) => {
            const {title, content} = post;
            return <Post key={index} title={title} id={index} onDelete={deletePost} content={content}></Post>
        })}
    </div>;

    function addPost(post) {
        setPostList((oldPostList) => {
            return [...oldPostList, post];
        });
    }

    function deletePost(idOfToBeDeletedPost) {
        setPostList((oldPostList) => {
            return oldPostList.filter((post, postIndex) => {
                return postIndex != idOfToBeDeletedPost;
            });
        });
    }
}

export {PostsPage};