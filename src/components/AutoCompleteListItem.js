// @flow

import React from 'react';

type Props = {
  movie: Object,
  handleClick: Function
};

const AutoCompleteListItem = (props: Props) => (
  <div onClick={() => props.handleClick(props.movie)}>
    <h4>{props.movie.title}</h4>
  </div>
);

export default AutoCompleteListItem;
