// @flow

import React from 'react';
import AutoCompleteListItem from './AutoCompleteListItem';

type Props = {
  movies: Array<Object>
};

const AutoCompleteList = (props: Props) => (
  <div>
    {props.movies
      .slice(0, 8)
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
