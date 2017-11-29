// @flow

import React, { Component } from 'react';
import ImageLoaded from '../reusable/ImageLoaded';
import './DisplayGalleryItem.css';

type State = {
  showLoader: boolean
};

type Props = {
  movie: Object,
  posterUrl: string,
  selectedMovie: Object,
  setSelectedMovie: Function
};

export default class DisplayGalleryItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLoader: true
    };

    this.posterUrl = `https://image.tmdb.org/t/p/original${
      this.props.movie.poster_path
    }`;
  }

  toggleLoader = () => {
    setTimeout(() => {
      this.setState(state => {
        return { showLoader: false };
      });
    }, 1000);
  };

  render() {
    let selected = '';
    if (
      this.props.selectedMovie &&
      this.props.movie.id === this.props.selectedMovie.id
    ) {
      selected = ' selected-movie';
    }
    const classNames = 'movie-card' + selected;
    return (
      <div
        className={classNames}
        onClick={() => this.props.setSelectedMovie(this.props.movie)}
      >
        {this.state.showLoader && <div className="loader pulsing" />}
        <ImageLoaded
          animationClass="movie-item-image"
          imageURL={this.posterUrl}
          onLoaded={this.toggleLoader}
        />
      </div>
    );
  }
}

// (props: Props) => {
//   const posterUrl = `https://image.tmdb.org/t/p/original${
//     props.movie.poster_path
//   }`;
//   let selected = '';
//   if (props.selectedMovie && props.movie.id === props.selectedMovie.id) {
//     selected = ' selected-movie';
//   }
//   const classNames = 'movie-card' + selected;

//   return (

//   );
// };
