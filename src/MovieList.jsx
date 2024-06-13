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

  async function GetPlaying(api_key, page) {
      return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${api_key}`)
      .then(response => response.json())
      .then(data => {
          return data.results;}
          )

      .catch(err => console.error(err));
  }

  async function getDetails(api_key, movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&lamguage=en-US`)
    .then(response => response.json())
    .then(data => {
        return data.results;

    })
    .catch(err => console.error(err));
  }

  function MovieList({searchTerm}) {
      const MOVIE_API_KEY = import.meta.env.VITE_API_KEY


      const [movies, setMovies] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [selectedMovie, setSelectedMovie] = useState(null);

      console.log(searchTerm)

    useEffect(() => {
      GetPlaying(MOVIE_API_KEY, currentPage)
        .then(data => {
          // let unique_movies = new Set( [...movies, ...data.results]);
          // unique_movies = [...unique_movies];
            setMovies(currentPage == 1 ? data:[...movies, ...data]);
        });
    }, [MOVIE_API_KEY, currentPage]);

    useEffect(() => {
      if (searchTerm){
        searchMovies(searchTerm, MOVIE_API_KEY)
          .then(data => {
            setMovies(data);
          });
      }
      else{
        GetPlaying(MOVIE_API_KEY, currentPage)
        .then(data => {
          // let unique_movies = new Set( [...movies, ...data.results]);
          // unique_movies = [...unique_movies];
            setMovies(currentPage == 1 ? data:[...movies, ...data]);
        });
      }
    }, [searchTerm,MOVIE_API_KEY]);

    const loadMore = async () => {
        setCurrentPage(prevPage => prevPage + 1);
      };

    const handleMovieClick = (movie) => {
      setSelectedMovie(movie);
    };

    const closeModal = () => {
      setSelectedMovie(null);
    };

        // const loadMore = async () => {
        //   const newMovies = await GetPlaying(MOVIE_API_KEY, currentPage + 1);
        //   setMovies([...movies, ...newMovies.results]);
        //   setCurrentPage(prevPage => prevPage + 1);
        // };

    return (
      <div className="movie-list">
        <div className="movie-page">
          {movies.map(movie => {
            return <MovieCard movie={movie} key={movie.id} onClick={handleMovieClick}/>
          })}
        </div>
        <div className="load-more">
          <button  onClick={loadMore}>Load More</button>
        </div>
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
        <footer>

        </footer>
      </div>
    )
  }



  export default MovieList
