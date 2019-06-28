import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Link } from 'react-router-dom';

export default class CartSummary extends React.Component {
  render() {
    const cart = this.props.items;
    const cartItems = cart.map((item, index) =>
      <CartSummaryItem
        key={index}
        addHandler={this.props.addHandler}
        deleteHandler={this.props.deleteHandler}
        item={item}
      />);

    let cartTotal = this.props.items.reduce((sum, item) => {
      sum += item.price * item.quantity;
      return sum;
    }, 0);
    cartTotal = (cartTotal / 100);

    let cartStatus = null;
    if (cart.length === 0) {
      cartStatus = (
        <div className="col-lg-8 offset-lg-2 text-center my-4">
          <h4>There are currently 0 treats in your order.</h4>
          <Link to="/">
            <button className="btn btn-info my-4">Shop Now</button>
          </Link>
        </div>);
    } else {
      cartStatus = (
        <div className="col-lg-8 offset-lg-2 my-4 d-flex justify-content-between">
          <h4 className="font-weight-bold">Order Total: ${cartTotal}</h4>
          <Link to="/checkout">
            <button className="btn btn-info">Place Order</button>
          </Link>
        </div>);
    }

    return (
      <React.Fragment>
        <div className="col-12 text-center mb-3">
          <h2><span className="red-underline">Your Order</span></h2>
        </div>
        {cartItems}
        <div className="col-12">
          {cartStatus}
        </div>
      </React.Fragment>

    );
  }
}
