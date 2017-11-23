// @flow

import React from 'react';
import AutoCompleteListItem from './AutoCompleteListItem';
import './AutoCompleteList.css';

type Props = {
  movies: Array<Object>,
  handleClick: Function
};

const AutoCompleteList = (props: Props) => (
  <div className="auto-complete-list">
    {props.movies
      .slice(0, 5)
      .map(movie => (
        <AutoCompleteListItem
          movie={movie}
          key={movie.id}
          handleClick={props.handleClick}
        />
      ))}
  </div>
);

export default AutoCompleteList;
