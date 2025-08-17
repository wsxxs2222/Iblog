'use client'
import { useState } from "react";
import { CreatePostModal } from "./create_post_area";
import { useSession } from "next-auth/react";
import '../../../ui/post_creation.css';
import '../../../ui/component.css'

export function PostListHeader() {
    const session = useSession();
    const [showPostModal, setShowPostModal] = useState(false);

    return <div id="post-list-header-row">
        <button className="button-large primary"
        onClick={
            () => {
                    if (session) {
                        setShowPostModal(true);
                    }
                    // TODO: show error if not signed in
                }
        }
        >Create Post</button>
        <div id="sort-post-row">
            <h2>Sort By:</h2>
            <select name="sort-post-dropdown" id="sort-post-input">
                <option value="most-recent">Most Recent</option>
                <option value="most-liked">Most Liked</option>
            </select>
        </div>
        {showPostModal 
            ? <CreatePostModal 
                onClose={() => {
                    setShowPostModal(false);
                }}
            ></CreatePostModal>
            : null
        }
    </div>;
}