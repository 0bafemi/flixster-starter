import React from "react"
import './Modal.css'

const MovieModal = ({movie, onClose}) => {
    // const [selectedMovie, setSelectedMovie] = useState(null);

    if (!movie){
        return null;
    }

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay'){
            onClose();
        }
    };
    // console.log(movie);
    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="close-button" onClick={onClose}>&times;</div>
                <img className='modal-movie-image' src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt="Movie Poster" />
                <h3>{movie.original_title}</h3>
                <p>Rating: {movie.vote_average}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Overview: {movie.overview}</p>
                {/* <div className ="trailer">
                    <iframe width="500" height="300" src={`https://www.youtube.com/embed/${props.movie.videos.results[0].key}`} allowfullscreen></iframe>
                </div> */}
            </div>

        </div>
      );
};

export default MovieModal;
