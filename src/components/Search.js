import React from 'react';

const Search = ({ search, searchChange, clearSearch }) => {
  return (
    <div className='search-container' data-testid='search-container'>
      <input type="text" placeholder='Search by Title' value={search} onChange={searchChange} />
      <span className='clear-search' onClick={clearSearch}>X</span>
    </div>
  )
}

export default Search;