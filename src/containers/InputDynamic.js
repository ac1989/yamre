// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput from '../components/SearchInput';
import AutoCompleteList from '../components/AutoCompleteList';
import * as actions from '../actions/';
import debounce from 'lodash/debounce';
import './InputDynamic.css';

type Props = {
  mode: String,
  autocomplete: Array<Object>,
  resetAutocomplete: Function,
  setMode: Function,
  fetchRecommendations: Function
};

type State = {
  searchString: string
};

export class InputDynamic extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchString: ''
    };

    this.fetchAutoMovies = this.fetchAutoMovies.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchAutoMovies = debounce(function(inputString) {
    this.props.fetchAutoMovies(inputString);
  }, 400);

  handleChange = (e: SyntheticInputEvent<>) => {
    this.setState({
      searchString: e.target.value
    });
    let inputString = e.target.value;
    if (inputString.length > 1) {
      this.fetchAutoMovies(inputString);
    }
  };

  handleRTIClick = () => {
    this.props.setMode('input');
    this.props.setSelectedMovie(null);
  };

  handleACClick = (movie: Object) => {
    this.props.resetAutocomplete();
    this.setState({
      searchString: ''
    });
    this.props.fetchRecommendations(movie.id);
  };

  renderInput = () => {
    if (this.props.mode === 'input') {
      return (
        <SearchInput
          searchString={this.state.searchString}
          handleChange={this.handleChange}
        />
      );
    } else {
      return <p onClick={this.handleRTIClick}>WE HAVE TO GO BACK</p>;
    }
  };

  renderAutocomplete = () => {
    if (this.props.mode === 'input') {
      if (this.props.autocomplete.length > 0) {
        return (
          <AutoCompleteList
            movies={this.props.autocomplete}
            handleClick={this.handleACClick}
          />
        );
      } else {
        return (
          <div className="instructions">
            <p>Enter a Movie you like in the box above.</p>
            <p>
              A super intelligent RESTful AI will punt your movie through a
              proxied Neural Network consisting of multiple markov blockchains
              and self driving roombas in order to generate bespoke
              Recommendations that support <em>your</em> needs.
            </p>
          </div>
        );
      }
    }
  };

  render() {
    return (
      <div className="input-dynamic">
        {this.renderInput()}
        {this.renderAutocomplete()}
      </div>
    );
  }
}

const mapStateToProps = ({ mode, autocomplete }) => {
  return { mode, autocomplete };
};

export default connect(mapStateToProps, actions)(InputDynamic);
