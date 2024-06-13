import "./App.css";
// import MovieCard from "./MovieCard";
import './MovieList.css';
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";

async function searchMovies(searchTerm, MOVIE_API_KEY,){
  return fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${MOVIE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
          return data;
      })



  .catch(err => console.error(err));
}

async function GetPlaying(api_key, page) {
    return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        return data;}
        )

    .catch(err => console.error(err));
}



function MovieList(props) {
    const MOVIE_API_KEY = import.meta.env.VITE_API_KEY


    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    let searchTerm = props.searchTerm;
    console.log(searchTerm)

  useEffect(() => {
    GetPlaying(MOVIE_API_KEY, currentPage)
    .then(data => {
        let unique_movies = new Set( [...movies, ...data.results]);
        unique_movies = [...unique_movies];
        setMovies(currentPage == 1 ? data.results : unique_movies);
      }
        )
  }, [MOVIE_API_KEY, currentPage])

  useEffect(() => {
    searchMovies(searchTerm, MOVIE_API_KEY, currentPage)
    .then(data => {
      console.log('Data:', data)
        let unique_movies = new Set( [...movies, ...data.results]);
        unique_movies = [...unique_movies];
        setMovies(currentPage == 1 ? data.results : unique_movies);

      }
        )
  }, [currentPage])

    const loadMore = async () => {
      // GetPlaying(MOVIE_API_KEY, currentPage + 1)


          setCurrentPage(
            movies => movies + 1);
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
          return <MovieCard movie={movie} key={movie.id} />
        })}
      </div>
      <div className="load-more">
        <button  onClick={loadMore}>Load More</button>
      </div>
    </div>
  )
}

export default MovieList
