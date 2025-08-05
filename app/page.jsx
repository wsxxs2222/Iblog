'use client'
import { CreatePostArea } from './lib/components/create_post_area';
import { Post } from './lib/components/post';
import { useContext, useEffect } from 'react';
import { AppStateContext } from './context';



function HomePage() {
    const {postList, fetchPostList, setPostList} = useContext(AppStateContext);
    useEffect(() => {
        fetchPostList().then((apiPostList) => {
            setPostList(apiPostList);
        });
    }, [fetchPostList, setPostList,]);

    return <div>
        <CreatePostArea></CreatePostArea>
        {postList.map((post, index) => {
            const {title, content, id} = post;
            return <Post key={index} title={title} id={id} content={content} username={post.username} timeCreated={post.time_created}></Post>
        })}
    </div>;
}

export default HomePage;
