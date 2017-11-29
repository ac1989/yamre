// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import InputDynamic from './containers/InputDynamic';
import Display from './containers/Display';
import { backdrops } from './services/backdrops';

type Props = {
  mode: string,
  selectedMovie: Object
};

class App extends React.Component<Props> {
  componentDidMount() {
    // Setting initial Backdrop,
    let url = 'https://image.tmdb.org/t/p/original';
    // Preload image for smooth transition,
    const imgUrl = url + this.props.backdrop;
    const image = new Image();
    image.src = imgUrl;

    // create new background element,
    let backdropNew = document.createElement('div');
    backdropNew.classList.add('backdrop-new');
    backdropNew.style = `background-image: url("${imgUrl}"); opacity: 0`;
    document.querySelector('.App').prepend(backdropNew);
    setTimeout(() => {
      document.querySelector('.backdrop-new').style = `background-image: url("${
        imgUrl
      }"); opacity: 0.33`;
    }, 1);
  }

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
        <InputDynamic />
        {this.renderConditional()}
      </div>
    );
  }
}

// give app.js access to state required to render background,
const mapStateToProps = ({ mode, seedMovie, selectedMovie, backdrop }) => {
  return {
    mode,
    seedMovie,
    selectedMovie,
    backdrop
  };
};

export default connect(mapStateToProps)(App);
