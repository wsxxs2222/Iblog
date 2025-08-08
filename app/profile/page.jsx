'use client'
import { Post } from "../lib/components/post_components/post";
import { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../lib/components/app_context";
import { useSession } from "next-auth/react";
import { RegisterAiInput } from "../lib/components/profile_components/register_ai_friend";
import axios from "axios";

export default function ProfilePage() {
  const {postList} = useContext(AppStateContext);
  const {data: sessionData, loginStatus} = useSession();
  const {email, name} = sessionData?.user ?? {};
  const [aiFriend, setAiFriend] = useState(null);

  useEffect(() => {
    // if (loginStatus === 'authenticated') {
    //   const aiFriendFuture = axios.get(`/api/ai?email=${email}`);
    //   aiFriendFuture.then((aiFriend) => {
    //     setAiFriend(aiFriend);
    //   });
    // } else if (loginStatus === 'unauthenticated') {
    //   setAiFriend(null);
    // }
    const aiFriendFuture = axios.get(`/api/ai?email=${email}`);
    aiFriendFuture.then((result) => {
        const aiFriend = result.data.aiFriend;
        setAiFriend(aiFriend);
    });
    
  }, [setAiFriend]);

  const userPostList = postList.filter((post) => {
    return post.username === name;
  });
  
  return <div>
    <h2>Username: {name}</h2>
    {aiFriend === null
      ? <RegisterAiInput setAiFriend={setAiFriend}></RegisterAiInput>
      : <h3>AI name: {aiFriend.name} relation to user: {aiFriend.relation_to_user}</h3>}
    {userPostList.map((post, index) => {
      return <Post title={post.title} content={post.content} username={post.username} key={index} id={post.id}></Post>;
    })}
  </div>;
}