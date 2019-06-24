import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-between my-4 col-12">
        <h1 className="align-self-center">
          <Link to="/">
            <em>{this.props.title}</em> <i className="fas fa-bolt"></i>
          </Link>
        </h1>
        <h4 className="align-self-center">
          <Link to="/cart-summary">
            {this.props.cartItemCount} <i className="fas fa-shopping-cart cursor"></i>
          </Link>
        </h4>
      </div>
    );
  }
}
