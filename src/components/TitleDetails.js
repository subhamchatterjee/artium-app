import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

const TitleDetails = ({ defaultTitleDetails }) => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [titleDetails, setTitleDetails] = useState(defaultTitleDetails);

  const apikey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    let titleId = params.id,
      queryStr = '?apikey=' + apikey;

    fetch(process.env.REACT_APP_API_END_POINT + '/titles/' + titleId + queryStr)
    .then((data) => data.json())
    .then((data) => {
      if(data?.status && data?.title) {
        setTitleDetails(data.title);
      }
      setLoading(false);
    });

    return () => {
      setLoading(true);
      setTitleDetails(null);
    }
  }, []);

  return (
    <div className='title-details-container'>
      <div className='header'>
        <div className='header-content'>
          <Link to={"/"}><i className="fa-solid fa-chevron-left"></i></Link>
          <h2>Details</h2>
        </div>
      </div>
      <div className='details-container'>
        {loading ? (
          <div className='loading'>
            <i className="fas fa-2x fa-spinner fa-pulse"></i>
            Loading
          </div>
        ) : (null)}
        {titleDetails ? (
          <div className='title-details' data-testid='title-details'>
            <div className='details-heading'>
              <div className='heading-left'>
                <h2>{titleDetails.name}</h2>
                <div className='attributes'>
                  {titleDetails.type ? (
                    <span className='type'>{titleDetails.type}</span>
                  ) : null}
                  {titleDetails.year ? (
                    <span className='year'>{titleDetails.year}</span>
                  ) : null}
                  {titleDetails.playTime ? (
                    <span className='play-time'>{titleDetails.playTime}</span>
                  ) : null}
                </div>
              </div>
              {titleDetails.rating ? (
                <div className='heading-right'>
                  <div>IMDb RATING</div>
                  <div className='rating'>
                    <i className="fa-solid fa-star"></i>
                    <span className='value'>{titleDetails.rating}</span>
                    <span className='out-of'>{"/10"}</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className='details-content'>
              <img className='image' src={`${titleDetails.image}`} alt={titleDetails.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src="https://i.imgur.com/Z2MYNbj.png";
                }} />
              <div className='other-details'>
                {titleDetails?.genres?.length ? (
                  <div className='genres'>
                    {titleDetails.genres.map((gen, genIndex) => {
                      return ( <span key={genIndex} className='genre'>{gen}</span> )
                    })}
                  </div>
                ) : null}
                {titleDetails.plot ? (
                  <div className='plot'>
                    <h3>Plot</h3>
                    <p className='plot'>{titleDetails.plot}</p>
                  </div>
                ) : null}
                {titleDetails?.writers?.length ? (
                  <div className='writers'>
                    <h3>Writers</h3>
                    {titleDetails.writers.map((writer, writerIndex) => {
                      return ( <span key={writerIndex} className='writer'>{writer}</span> )
                    })}
                  </div>
                ) : null}
                {titleDetails?.actors?.length ? (
                  <div className='actors'>
                    <h3>Cast</h3>
                    {titleDetails.actors.map((actor, actorIndex) => {
                      return ( <span key={actorIndex} className='actor'>{actor}</span> )
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TitleDetails;