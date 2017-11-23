// @flow

import React from 'react';
import './DisplayGalleryItem.css';

type Props = {
  movie: Object,
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
  const classNames = 'display-gallery-item' + selected;

  return (
    <div
      className={classNames}
      style={{
        background: `url(${posterUrl})`
      }}
      onClick={() => props.setSelectedMovie(props.movie)}
    />
  );
};

export default DisplayGalleryItem;
