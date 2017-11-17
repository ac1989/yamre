// @flow

import React from 'react';
import './DisplayGalleryItem.css';

type Props = {
  movie: Object,
  setSelectedMovie: Function
};

const DisplayGalleryItem = (props: Props) => {
  const posterUrl = `https://image.tmdb.org/t/p/original${props.movie
    .poster_path}`;

  return (
    <div
      className="display-gallery-item"
      style={{ background: `url(${posterUrl})` }}
      onClick={() => props.setSelectedMovie(props.movie)}
    />
  );
};

export default DisplayGalleryItem;
