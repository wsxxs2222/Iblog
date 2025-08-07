'use client'
import { CreatePostArea } from './lib/components/post_components/create_post_area';
import { Post } from './lib/components/post_components/post';
import { useContext, useEffect } from 'react';
import { AppStateContext } from './lib/components/app_context';
import { useSession } from 'next-auth/react';



function HomePage() {
    const {postList, fetchPostList, setPostList} = useContext(AppStateContext);
    const session = useSession();
    
    useEffect(() => {
        fetchPostList().then((apiPostList) => {
            setPostList(apiPostList);
        });
    }, [fetchPostList, setPostList,]);

    return <div>
        {session.data?.user ? <CreatePostArea></CreatePostArea> : null}
        {postList.map((post, index) => {
            const {title, content, id} = post;
            return <Post key={index} title={title} id={id} content={content} username={post.username} timeCreated={post.time_created}></Post>
        })}
    </div>;
}

export default HomePage;
