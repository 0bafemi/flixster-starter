// import PropType from 'prop-types';
import './MovieCard.css'




function MovieCard (props) {
    // fetchNowPlaying()
    const movie = props.movie;
    return (
        <div className="MovieCard">
            <img className='MovieImage' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt="Movie Poster" />
            <h3>{movie.original_title}</h3>
            <p>Rating: {movie.vote_average} </p>
        </div>



    )
}

export default MovieCard;
