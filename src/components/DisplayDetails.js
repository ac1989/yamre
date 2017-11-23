// @flow

import React from 'react';

import './DisplayDetails.css';
import Rating from './Rating';

type Props = {
  movie: Object
};

const DisplayDetails = (props: Props) => {
  const cast01 = props.movie.credits.cast[0];
  const cast02 = props.movie.credits.cast[1];
  const cast03 = props.movie.credits.cast[2];
  return (
    <div class="details">
      <div className="details-left">
        <h2>{props.movie.title}</h2>
        <p>{props.movie.overview}</p>
      </div>

      <div className="details-right">
        <Rating rating={props.movie.vote_average} />
        <ul>
          <li>
            {cast01.name} <span>as {cast01.character}</span>
          </li>
          <li>
            {cast02.name} <span>as {cast02.character}</span>
          </li>
          <li>
            {cast03.name} <span>as {cast03.character}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayDetails;
