// @flow

import React from 'react';

type Props = {
  movie: Object,
  setSelectedMovie: Function
};

const DisplayGalleryItem = (props: Props) => {
  return (
    <div onClick={() => props.setSelectedMovie(props.movie)}>
      <h4>{props.movie.title}</h4>
    </div>
  );
};

export default DisplayGalleryItem;
