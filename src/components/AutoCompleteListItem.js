// @flow

import React from 'react';

type Props = {
  movie: Object
};

const AutoCompleteListItem = (props: Props) => (
  <div onClick={() => props.handleClick(props.movie)}>
    <h4>{props.movie.title}</h4>
  </div>
);

export default AutoCompleteListItem;
