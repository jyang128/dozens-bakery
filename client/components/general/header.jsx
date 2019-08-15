import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const totalOrders = props.cart.reduce((sum, item) => {
    sum += item.quantity;
    return sum;
  }, 0);

  return (
    <div className="col-12 d-flex justify-content-center justify-content-md-between flex-wrap my-4">
      <h1 className="align-self-center">
        <Link to="/">
          <em>{props.title}</em>
        </Link>
      </h1>
      <h5 className="align-self-center">
        <Link to="/about-us">
          <span>About</span>
        </Link>
        <Link to="/cart-summary">
          <span className={`total ${props.totalClass}`}>Your Order: {totalOrders}</span>
        </Link>
      </h5>
    </div>
  );
}
