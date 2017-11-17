// @flow

import React from 'react';

type Props = {
  movie: Object
};

const DisplayDetails = (props: Props) => {
  return <div>{props.movie.overview}</div>;
};

export default DisplayDetails;
