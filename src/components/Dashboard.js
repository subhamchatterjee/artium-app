import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'debounce';
import Search from './Search';

var delayTimer;

const Dashboard = ({ defaultTitles }) => {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalTitles, setTotalTitles] = useState(0);
  const [titles, setTitles] = useState(defaultTitles);
  
  const apikey = process.env.REACT_APP_API_KEY;

  const getFilterQuery = (type, search, skip) => {
    let queryStr = '?apikey=' + apikey;
    if(type) queryStr += '&type=' + type;
    if(skip) queryStr += '&skip=' + skip;
    if(search) queryStr += '&q=' + search;
    return queryStr;
  }

  const getAllTitles = (type = '', search = '', skip = 0, delay = 1000) => {
    setLoading(true);

    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      let queryStr = getFilterQuery(type, search, skip);
      fetch(process.env.REACT_APP_API_END_POINT + '/titles/get-titles' + queryStr)
      .then((data) => data.json())
      .then((data) => {
        if(data?.status && data?.titles) {
          setTotalTitles(data.totalTitles);
          if(skip === 0) setTitles(data.titles);
          else setTitles([...titles, ...data.titles]);
        }
        setLoading(false);
      });
    }, delay);
  }

  const clearSearch = () => {
    setSearch('');
  }

  const searchChange = (e) => {
    if(e?.target?.hasOwnProperty('value')) setSearch(e.target.value);
  }

  useEffect(() => {
    if(search) getAllTitles(type, search);
    else getAllTitles(type, search, 0, 0);
  }, [type, search]);

  useEffect(() => {
    const onscrollHandler = debounce(() => {
      if((titles.length < totalTitles) && (window.innerHeight + document.documentElement.scrollTop + 15 >= document.documentElement.offsetHeight)) {
        getAllTitles(type, search, titles.length, 0);
      }
    }, 200);

    window.addEventListener("scroll", onscrollHandler);
    return () => {
      window.removeEventListener("scroll", onscrollHandler);
    }
  }, [titles]);

  return (
    <div className='dashboard-container'>
      <div className='header'>
        <h2>Search</h2>
        <div className='filters-container'>
          <Search search={search} searchChange={searchChange} clearSearch={clearSearch} />
          <select className='title-type' defaultValue={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
      </div>
      <div className='titles-container'>
        {loading ? (
          <div className='loading'>
            <i className="fas fa-2x fa-spinner fa-pulse"></i>
            Loading
          </div>
        ) : (null)}
        {titles.length ? (
          <div className='titles' data-testid={'titles'}>
            {titles.map((title, index) => {
              return (
                <div className='title-container' key={index} data-testid={'title-container-' + index}>
                  <Link className='title' to={"/title/" + title._id} title={title.name}>
                    <img src={`${title.image}`} alt={title.name}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src="https://i.imgur.com/Z2MYNbj.png";
                      }} />
                    <div className='title-name'>{title.name}</div>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          !loading ? (
            <div className='no-titles'>
              <h3>No Titles Found!</h3>
              <span>Please add new titles or update the filters to get the results.</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default Dashboard;