'use client'
import { Post } from "../lib/components/post_components/post";
import { useContext } from "react";
import { AppStateContext } from "../lib/components/app_context";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const {postList} = useContext(AppStateContext);
  const session = useSession();
  const currentUsername = session.data?.user.name;

  const userPostList = postList.filter((post) => {
    return post.username === currentUsername;
  });
  
  return <div>
    <h2>Username: {session.data?.user.name}</h2>
    {userPostList.map((post, index) => {
      return <Post title={post.title} content={post.content} username={post.username} key={index} id={post.id}></Post>;
    })}
  </div>;
}