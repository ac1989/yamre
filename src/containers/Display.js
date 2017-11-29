// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayGallery from '../components/display/DisplayGallery';
import DisplayDetails from '../components/display/DisplayDetails';
import * as actions from '../actions';

type Props = {
  recommendations: Array<Object>,
  selectedMovie: Object,
  setSelectedMovie: Function
};

type State = {
  movieIndex: number
};

export class Display extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      movieIndex: 0
    };
  }

  setSelectedMovie = (movie: Object) => {
    this.props.setSelectedMovie(movie);
    this.props.setBackdropUrl(movie.backdrop_path);
  };

  render() {
    return (
      <div>
        <DisplayGallery
          movies={this.props.recommendations}
          index={this.state.movieIndex}
          setSelectedMovie={this.setSelectedMovie}
          selectedMovie={this.props.selectedMovie}
        />
        {this.props.selectedMovie && (
          <DisplayDetails movie={this.props.selectedMovie} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ recommendations, selectedMovie }) => {
  return { recommendations, selectedMovie };
};

export default connect(mapStateToProps, actions)(Display);
