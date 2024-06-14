import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faHeart} from "@fortawesome/free-solid-svg-icons"



const App = () => {

  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const GetPlaying = function () {
    setSearchTerm()
  }

  const handleChange = function (event) {
    setText(event.target.value);
  }

  const handleSearch = () => {
    setSearchTerm(text);
  }

  const handleSort = (e) => {
    setSortBy(e.target.value);
  }

  return (
  <div className="App">
    <div className='AppHeader'>
      <div>
      <h1>NetFlixster</h1>
      </div>
      <div className='HeaderBtm'>
        <div className='SearchBar'>
          <input className='SearchInput' type="text" placeholder='Search For Movies' onChange={handleChange} value={text}/>
          <button className="SearchBtn" onClick={handleSearch}>Search</button>
          <button className="NowPlaying" onClick={GetPlaying}>Now Playing</button>
        </div>
        <div className='SortBy'>
          <select className="Sort" id="sort" onChange={handleSort}>
            <option value="" disabled selected>Sort By</option>
            <option value="popularity">Popularity Descending</option>
            <option value="primary_release_date">Release Date Descending</option>
            <option value="vote_average">Rating Descending</option>
          </select>
          <div className="Arrow"></div>
        </div>
      </div>
    </div>
    <MovieList searchTerm = {searchTerm} sortBy={sortBy}/>
  </div>
  )
}

export default App;
