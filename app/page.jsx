'use client'
import { CreatePostArea } from './lib/components/create_post_area';
import { Post } from './lib/components/post';
import { useContext } from 'react';
import { AppStateContext } from './context';

function HomePage() {
    const {postList, setPostList, currentUser} = useContext(AppStateContext);

    return <div>
        <CreatePostArea onAddPost={addPost}></CreatePostArea>
        {postList.map((post, index) => {
            const {title, content} = post;
            return <Post key={index} title={title} id={index} onDelete={deletePost} content={content} username={post.username}></Post>
        })}
    </div>;
}

export default HomePage;
