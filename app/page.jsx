'use client'
import { PostListHeader } from './lib/components/post_components/post_list_header';
import { Post } from './lib/components/post_components/post';
import { useContext, useEffect } from 'react';
import { AppStateContext } from './lib/components/app_context';
import { useSession } from 'next-auth/react';
import './ui/post.css';



function HomePage() {
    const {postList, refreshPostList,} = useContext(AppStateContext);
    const session = useSession();
    
    useEffect(() => {
        refreshPostList();
    }, [refreshPostList,]);

    return <div>
        {session.data?.user ? <PostListHeader></PostListHeader> : null}
        <div id='post-list-container'>
            {postList.map((post, index) => {
                const {title, content, id} = post;
                return <Post key={index} title={title} id={id} content={content} username={post.username} timeCreated={post.time_created}></Post>
            })}
        </div>
    </div>;
}

export default HomePage;
