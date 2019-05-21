import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-between my-4 col-12">
        <h1 className="align-self-center"><em>{this.props.title}</em> <i className="fas fa-bolt"></i></h1>
        <h4 className="align-self-center">{this.props.cartItemCount} <i className="fas fa-shopping-cart"></i></h4>
      </div>
    );
  }
}
