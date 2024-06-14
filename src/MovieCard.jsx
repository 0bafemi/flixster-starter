// import PropType from 'prop-types';
import './MovieCard.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faHeart} from "@fortawesome/free-solid-svg-icons"
import {useState} from "react";

function MovieCard ({movie, onClick}) {
    const [liked, setLiked] = useState(false);
    const [watched, setWatched] = useState(false);
    // fetchNowPlaying()
    // const movie = props.movie;
    const handleLikeClick = () => {
        setLiked(!liked);
    }

    const handleWatchClick = () => {
        setWatched(!watched);
    }
    return (
        <div className="MovieCard" onClick={() => onClick(movie)}>
            <img className='MovieImage' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt="Movie Poster" />
            <h3>{movie.original_title}</h3>
            <p>Rating: {movie.vote_average} </p>
            <FontAwesomeIcon className="liked" icon={faHeart} color={liked ? "red" : "white"} onClick={
                (e) => {
                    e.stopPropagation();
                    handleLikeClick();

                    }
                }
            />
            <FontAwesomeIcon className="watched" icon={faEye} color={watched ? "green" : "white"} onClick={
                (i) => {
                    i.stopPropagation();
                    handleWatchClick();

                    }
                }
            />
        </div>
    );
}

export default MovieCard;
