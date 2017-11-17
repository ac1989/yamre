// @flow

import React from 'react';

type Props = {
  handleChange: Function,
  searchString: string
};

const SearchInput = (props: Props) => (
  <div>
    <input
      type="text"
      placeholder="enter moviefilm..."
      value={props.searchString}
      onChange={props.handleChange}
    />
  </div>
);

export default SearchInput;
