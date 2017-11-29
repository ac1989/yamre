// @flow

import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DisplayGalleryItem from './DisplayGalleryItem';
import './DisplayGallery.css';

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
          selectedMovie={props.selectedMovie}
          movie={movie}
          key={movie.id}
        />
      );
    });
  };
  return <div className="gallery-container">{renderGallery()}</div>;
};

export default DisplayGallery;
