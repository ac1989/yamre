// @flow

import React from 'react';
import './SearchInput.css';

type Props = {
  handleChange: Function,
  searchString: string
};

const SearchInput = (props: Props) => (
  <div className="search-input">
    <input
      type="text"
      placeholder="type a movie name here..."
      value={props.searchString}
      onChange={props.handleChange}
    />
  </div>
);

export default SearchInput;
