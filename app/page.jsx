'use client'
import { PostListHeader } from './lib/components/post_components/post_list_header';
import { Post } from './lib/components/post_components/post';
import { useContext, useEffect } from 'react';
import { AppStateContext } from './lib/components/app_context';
import './ui/post.css';
import './ui/global.css';



function HomePage() {
    const {postList, refreshPostList,} = useContext(AppStateContext);
    
    useEffect(() => {
        refreshPostList();
    }, [refreshPostList,]);

    return <div>
        <PostListHeader></PostListHeader>
        <div id='post-list-container'>
            {postList.map((post) => {
                const {title, content, id} = post;
                return <Post key={id} title={title} id={id} content={content} username={post.username} timeCreated={post.time_created}></Post>
            })}
        </div>
    </div>;
}

export default HomePage;
