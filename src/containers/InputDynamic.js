// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput from '../components/SearchInput';
import AutoCompleteList from '../components/AutoCompleteList';
import * as actions from '../actions/';
import debounce from 'lodash/debounce';

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
  };

  handleACClick = (movie: Object) => {
    // clear autocomplete:
    this.props.resetAutocomplete();
    // clear input:
    this.setState({
      searchString: ''
    });
    console.log(movie.id);
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
    }
  };

  renderAutcomplete = () => {
    if (this.props.mode === 'input' && this.props.autocomplete.length > 0) {
      return (
        <AutoCompleteList
          movies={this.props.autocomplete}
          handleClick={this.handleACClick}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <p onClick={this.handleRTIClick}>Return To Search</p>
        <h4>Input Dynamic Component</h4>
        <p>MODE: {this.props.mode}</p>
        {this.renderInput()}
        {this.renderAutcomplete()}
      </div>
    );
  }
}

const mapStateToProps = ({ mode, autocomplete }) => {
  return { mode, autocomplete };
};

export default connect(mapStateToProps, actions)(InputDynamic);
