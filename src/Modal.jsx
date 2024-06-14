import {useState, useEffect} from "react"
import './Modal.css'


const MovieModal = ({movie, onClose}) => {
    // const [selectedMovie, setSelectedMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(undefined)

    const getModalVideo = async (movieId) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

        // TODO: change variable names to be more descriptive
        let response = await fetch(videosUrl)
        let responseJson = await response.json()
        let video = responseJson.results.find((video) => video.site === "YouTube" && video.type === "Trailer")
        return `https://www.youtube.com/embed/${video.key}`

    // return trailerUrl =  fetch(videosUrl)
    //     .then((response) => response.json())
    //     .then((response) =>
    //     response.results.find(
    //         (video) => video.site === "YouTube" && video.type === "Trailer"
    //     )
    //     )
    //     .then((trailer) => `https://www.youtube.com/embed/${trailer.key}`)
    //     .catch((error) => {
    //         console.error("Error fetching movie trailer:", error);
    //     });

    };

    if (!movie){
        return null;
    }

    useEffect(() => {
        async function getVideo () {
            const videoURL = await getModalVideo(movie.id)
            setTrailerUrl(videoURL)
        }
        getVideo()
    }, [])

    const handleOverlayClick = (e) => {
        if (e.target.className === 'ModalOverlay'){
            onClose();
        }
    };




    console.log("trailer",trailerUrl)

    return (
        <div className="ModalOverlay" onClick={handleOverlayClick}>
            <div className="ModalContent">
                <div className="CloseButton" onClick={onClose}>&times;</div>
                <img className='ModalMovieImage' src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt="Movie Poster" />
                <h3>{movie.original_title}</h3>
                <p>Rating: {movie.vote_average}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Overview: {movie.overview}</p>
                <div>
                    <iframe className = "Trailer"
                    src={trailerUrl}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Movie Trailer"
                    className="modal-movie-trailer"
                    ></iframe>
                </div>


                {/* <div className ="trailer">
                    <iframe width="500" height="300" src={`https://www.youtube.com/embed/${props.movie.videos.results[0].key}`} allowfullscreen></iframe>
                </div> */}
            </div>

        </div>
      );
};

export default MovieModal;
