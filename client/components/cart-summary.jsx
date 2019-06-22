import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Link } from 'react-router-dom';

export default class CartSummary extends React.Component {
  render() {
    let cartItems = this.props.items.map((item, index) =>
      <CartSummaryItem key={index} item={item}/>);

    let cartTotal = this.props.items.reduce((sum, item) => {
      sum += item.price;
      return sum;
    }, 0);
    cartTotal = (cartTotal / 100).toFixed(2);

    let cartStatus = null;
    if (this.props.items.length === 0) {
      cartStatus = <h4>The cart is empty!</h4>;
    } else {
      cartStatus =
        <React.Fragment>
          <h4>Item Total: ${ cartTotal }</h4>
          <Link to="/checkout">
            <button className="btn btn-danger">Place Order</button>
          </Link>
        </React.Fragment>;
    }

    return (
      <div className="container mx-3">
        <div className="row justify-content-center">
          <div className="col-md-8 mb-4">
            <h2>My Cart</h2>
          </div>
          { cartItems }
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 my-4 d-flex justify-content-between">
            { cartStatus }
          </div>
        </div>
      </div>
    );
  }
}
