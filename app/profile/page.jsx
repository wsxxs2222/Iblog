'use client'
import { Post } from "../lib/components/post";
import { useContext } from "react";
import { AppStateContext } from "../context";

export default function ProfilePage() {
  const {postList, currentUser} = useContext(AppStateContext);
  const postComponentList = postList.map((post, index) => {
      return <Post title={post.title} content={post.content} username={post.username} key={index} id={index}></Post>;
  });
  
  return <div>
    <h2>{currentUser?.username ?? ''}</h2>
    <h3>{currentUser?.accountCreatedTime.toISOString() ?? ''}</h3>
    {postComponentList.filter((postComponent) => {
      return postComponent.props.username === currentUser?.username;
    })}
  </div>;
}