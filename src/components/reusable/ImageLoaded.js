import React, { Component } from 'react';

// Component accepts 'imageURL' as a prop and displays
// it only once loaded, also accepts an 'animationClass'
// prop that will be attatched to the shown <img>.

// onLoaded prop is a function executed once image,
// has loaded.

export default class ImageLoaded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false
    };
  }
  componentDidMount() {
    const image = new Image();
    image.src = this.props.imageURL;
    image.onload = () => {
      this.setState(state => {
        return { imageLoaded: true };
      });
    };
  }
  render() {
    return (
      <div>
        {this.state.imageLoaded && (
          <img
            alt={this.props.altText}
            className={this.props.animationClass}
            src={this.props.imageURL}
          />
        )}
      </div>
    );
  }
}
