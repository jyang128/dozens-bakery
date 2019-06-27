import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className="col-12 d-flex justify-content-sm-between flex-wrap my-4 header">
        <h1 className="align-self-center">
          <Link to="/">
            <em>{this.props.title}</em>
          </Link>
        </h1>
        <h5 className="align-self-center">
          <Link to="/about-us">
            <span>About</span>
          </Link>
          <Link to="/cart-summary">
            <span className="total">Your Order: {this.props.cartItemCount}</span>
          </Link>
        </h5>
      </div>
    );
  }
}
