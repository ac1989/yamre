// @flow

import React from 'react';

type Props = {
  movie: Object,
  handleClick: Function
};

const AutoCompleteListItem = (props: Props) => (
  <div onClick={() => props.handleClick(props.movie)}>
    <li>{props.movie.title}</li>
  </div>
);

export default AutoCompleteListItem;
