// @flow

import React from 'react';
import ImageLoaded from '../reusable/ImageLoaded';
import './DisplayGalleryItem.css';

type Props = {
  movie: Object,
  selectedMovie: Object,
  setSelectedMovie: Function
};

const DisplayGalleryItem = (props: Props) => {
  const posterUrl = `https://image.tmdb.org/t/p/original${
    props.movie.poster_path
  }`;
  let selected = '';
  if (props.selectedMovie && props.movie.id === props.selectedMovie.id) {
    selected = ' selected-movie';
  }
  const classNames = 'movie-card' + selected;

  return (
    <div
      className={classNames}
      onClick={() => props.setSelectedMovie(props.movie)}
    >
      <div className="loader pulsing" />
      <ImageLoaded animationClass="movie-item-image" imageURL={posterUrl} />
    </div>
  );
};

export default DisplayGalleryItem;
