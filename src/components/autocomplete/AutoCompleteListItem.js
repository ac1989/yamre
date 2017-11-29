// @flow

import React from 'react';
import './AutoCompleteListItem.css';

type Props = {
  movie: Object,
  handleClick: Function
};

const AutoCompleteListItem = (props: Props) => (
  <div
    onClick={() => props.handleClick(props.movie)}
    className="auto-complete-item"
  >
    <li>
      {props.movie.title}{' '}
      <span>({props.movie.release_date.substring(0, 4)})</span>
    </li>
  </div>
);

export default AutoCompleteListItem;
