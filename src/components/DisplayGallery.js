// @flow

import React from 'react';
import DisplayGalleryItem from './DisplayGalleryItem';

type Props = {
  movies: Array<Object>,
  index: number,
  setSelectedMovie: Function
};

const DisplayGallery = (props: Props) => {
  const indexStart = props.index;
  const indexEnd = props.index + 5;

  const renderGallery = () => {
    return props.movies.slice(indexStart, indexEnd).map(movie => {
      return (
        <DisplayGalleryItem
          setSelectedMovie={props.setSelectedMovie}
          movie={movie}
          key={movie.id}
        />
      );
    });
  };
  return (
    <div>
      <h3>Display Gallery</h3>
      {renderGallery()}
    </div>
  );
};

export default DisplayGallery;
