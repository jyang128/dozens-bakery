import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <h1 className="col-md-12 text-center my-4 align-self-center"><em>{this.props.title}</em><i className="fas fa-shopping-cart"></i></h1>
    );
  }
}
