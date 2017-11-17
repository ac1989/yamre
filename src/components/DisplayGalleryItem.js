import React from 'react';

const DisplayGalleryItem = props => {
  return (
    <div onClick={() => props.setSelectedMovie(props.movie)}>
      <h4>{props.movie.title}</h4>
    </div>
  );
};

export default DisplayGalleryItem;
