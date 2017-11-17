// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import InputDynamic from './containers/InputDynamic';
import Display from './containers/Display';

type Props = {
  mode: string
};

class App extends React.Component<Props> {
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
        <InputDynamic />
        {this.renderConditional()}
      </div>
    );
  }
}

// give app.js access to state required to render background,
const mapStateToProps = ({ mode, seedMovie }) => {
  return { mode, seedMovie };
};

export default connect(mapStateToProps)(App);
