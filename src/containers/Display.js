// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayGallery from '../components/DisplayGallery';
import DisplayDetails from '../components/DisplayDetails';
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

  nextMovies = () => {
    this.setState({
      movieIndex: this.state.movieIndex + 5
    });
  };

  prevMovies = () => {
    this.setState({
      movieIndex: this.state.movieIndex - 5
    });
  };

  setSelectedMovie = (movie: Object) => {
    this.props.setSelectedMovie(movie);
  };

  render() {
    return (
      <div>
        <h2>Gallery Container</h2>
        <p
          onClick={() => {
            this.nextMovies();
          }}
        >
          -> Next ->
        </p>
        <DisplayGallery
          movies={this.props.recommendations}
          index={this.state.movieIndex}
          setSelectedMovie={this.setSelectedMovie}
        />
        <p
          onClick={() => {
            this.prevMovies();
          }}
        >
          Prev
        </p>
        <DisplayDetails movie={this.props.selectedMovie} />
      </div>
    );
  }
}

const mapStateToProps = ({ recommendations, selectedMovie }) => {
  return { recommendations, selectedMovie };
};

export default connect(mapStateToProps, actions)(Display);
