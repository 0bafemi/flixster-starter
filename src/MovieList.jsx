  import "./App.css";
  import './MovieList.css';
  import MovieCard from "./MovieCard";
  import MovieModal from "./Modal"
  import React, { useEffect, useState } from "react";
  import PropTypes from "prop-types"

  async function searchMovies(searchTerm, MOVIE_API_KEY,){
    return fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${MOVIE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            return data.results;
        })
    .catch(err => console.error(err));
  }

  async function GetPlaying(api_key, page, sort_by) {


      return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort_by}.desc&api_key=${api_key}`)
      .then(response => response.json())
      .then(data => {
          return data.results}
          )

      .catch(err => console.error(err));
  }

  async function getDetails(api_key, movieId) {
    try {

      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&lamguage=en-US&append_to_response=videos`)
      const movieData = await response.json()
      return movieData
    } catch(e) {
        console.error(e)
    }
  }

  function MovieList({searchTerm, sortBy}) {
      const MOVIE_API_KEY = import.meta.env.VITE_API_KEY

      const [movies, setMovies] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
      GetPlaying(MOVIE_API_KEY, currentPage, sortBy)
        .then(data => {
            setMovies(currentPage == 1 ? data:[...movies, ...data]);
        });
    }, [MOVIE_API_KEY, currentPage, sortBy]);

    useEffect(() => {
      if (searchTerm){
        searchMovies(searchTerm, MOVIE_API_KEY)
          .then(data => {
            setMovies(data);
          });
      }
      else{
        GetPlaying(MOVIE_API_KEY, currentPage, sortBy)
        .then(data => {
            setMovies(currentPage == 1 ? data:[...movies, ...data]);
        });
      }
    }, [searchTerm,MOVIE_API_KEY, sortBy]);

    const loadMore = async () => {
        setCurrentPage(prevPage => prevPage + 1);
      };

    const handleMovieClick = async (movie) => {
      const MOVIE_API_KEY = import.meta.env.VITE_API_KEY
      const movieInfo = await getDetails(MOVIE_API_KEY, movie.id)
      setSelectedMovie(movieInfo);
    };

    const closeModal = () => {
      setSelectedMovie(null);
    };

    return (

      <div className="movie-list">
        <div className="movie-page">
          {movies.map(movie => {
            return <MovieCard movie={movie} key={movie.id} onClick={handleMovieClick}/>
          })}
        </div>
        <div className="load-more">
          <button className="loadmore"  onClick={loadMore}>Load More</button>
        </div>
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
        <footer>

        </footer>
      </div>
    )
  }



  export default MovieList
