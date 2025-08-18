'use client'
import { useState, useContext } from "react";
import { CreatePostModal } from "./create_post_area";
import { AppStateContext } from "../app_context";
import '../../../ui/post_creation.css';
import '../../../ui/component.css'
import '../../../ui/global.css';

export function PostListHeader() {
    const {isLoggedIn} = useContext(AppStateContext);
    const [showPostModal, setShowPostModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    return <div id="post-header-and-error-container">
        <div id="post-list-header-row">
            <button className="button-large primary"
            onClick={
                () => {
                        if (isLoggedIn()) {
                            setShowPostModal(true);
                        } else {
                            setErrorMessage("Please log in to make a post");
                            setTimeout(() => {
                                setErrorMessage(null);
                            }, 5000);
                        }
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
        </div>
        {errorMessage 
            ? <p className="error-message">{errorMessage}</p>
            : null}
    </div>;
}