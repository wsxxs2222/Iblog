import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Post(props) {
    const [hasLiked, setHasLiked] = React.useState(false);

    return <div>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
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
                props.onDelete(props.id);
            }}>Delete</button>
        </div>
    </div>
}

export {Post};