// import PropType from 'prop-types';
import './MovieCard.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faHeart} from "@fortawesome/free-solid-svg"

function MovieCard ({movie, onClick}) {
    // fetchNowPlaying()
    // const movie = props.movie;
    return (
        <div className="MovieCard" onClick={() => onClick(movie)}>
            <img className='MovieImage' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt="Movie Poster" />
            <h3>{movie.original_title}</h3>
            <p>Rating: {movie.vote_average} </p>
            <FontAwesomeIcon className="liked" icon={faHeart} color="white" onClick={
                (liked) => {
                    if(liked.target.style.color=="white"){
                        liked.target.style.color=="red";
                        props.

                    }
                }
            }>
                <p> The Lion</p>
            </div>
        </div>
    );
}

export default MovieCard;
