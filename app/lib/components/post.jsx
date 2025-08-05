import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from 'react';
import { AppStateContext } from '../../context';

function Post({title, content, username, id, timeCreated}) {
    const [hasLiked, setHasLiked] = React.useState(false);
    const {deletePost} = useContext(AppStateContext);

    return <div>
        <h2>{title}</h2>
        <h3>by {username} at {timeCreated?.slice(0, 10)}</h3>
        <p>{content}</p>
        <div className='row-of-buttons'>
            <button 
            onClick={() => {
                setHasLiked((oldHasLiked) => {
                   return !oldHasLiked; 
                });
            }}>
                {hasLiked ? (
                    <FavoriteIcon style={{ color: 'red' }} />
                    ) : 
                    (
                    <FavoriteBorderIcon style={{ color: 'gray' }} />
                )}
            </button>
            <button onClick={() => {
                deletePost(id);
            }}>Delete</button>
        </div>
    </div>
}

export {Post};