// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import InputDynamic from './containers/InputDynamic';
import Display from './containers/Display';

type Props = {
  mode: string,
  selectedMovie: Object
};

class App extends React.Component<Props> {
  backdropUrl = () => {
    if (this.props.selectedMovie) {
      // Preload image for smooth transition.
      const imgUrl = `https://image.tmdb.org/t/p/original${this.props
        .selectedMovie.backdrop_path}`;
      const image = new Image();
      image.src = imgUrl;
      image.onload = function() {
        document.querySelector(
          '.backdrop'
        ).style.backgroundImage = `url(${imgUrl})`;
      };
    }
  };
  renderConditional = () => {
    const mode = this.props.mode;
    if (mode === 'generating') {
      return <div>Generating</div>;
    }
    if (mode === 'display') {
      return <Display />;
    }
  };
  render() {
    return (
      <div className="App">
        <div className="back-color" />
        <div
          className="backdrop"
          style={{ backgroundImage: this.backdropUrl() }}
        />
        <InputDynamic />
        {this.renderConditional()}
      </div>
    );
  }
}

// give app.js access to state required to render background,
const mapStateToProps = ({ mode, seedMovie, selectedMovie }) => {
  return { mode, seedMovie, selectedMovie };
};

export default connect(mapStateToProps)(App);
