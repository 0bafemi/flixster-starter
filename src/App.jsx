import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'



const App = () => {


  return (
  <div className="App">
    <div className='App-header'>
      <div>
        <h1>Flixster</h1>
      </div>
      <div className='HeaderBtm'>
        <div className='search-bar'>
          <input className='search-input' type="text" placeholder='Search For Movies'/>
          <button className='SearchBtn'>Search</button>
        </div>
        <div className='sort-by'>
          <select className="sort" id="sort" >
              <option value="" disabled selected>Sort By</option>
              <option value="popularity">Popularity Descending</option>
              <option value="release">Release Date Descending</option>
              <option value="rating">Rating Descending</option>
            </select>
        </div>
      </div>
    </div>
    <MovieList/>
  </div>
  )
}

export default App;
