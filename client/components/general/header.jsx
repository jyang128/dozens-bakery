import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    let totalOrders = this.props.cart.reduce((sum, item) => {
      sum += item.quantity;
      return sum;
    }, 0);

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
            <span className="total">Your Order: {totalOrders}</span>
          </Link>
        </h5>
      </div>
    );
  }
}
