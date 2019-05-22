import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.setView = this.setView.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
  }
  setView() {
    this.props.setView('catalog', {});
  }
  goToCheckout() {
    this.props.setView('checkout', {});
  }
  render() {
    let cartItems = this.props.items.map(item => <CartSummaryItem key={item.id} item={item}/>);

    let cartTotal = this.props.items.reduce((sum, item) => {
      sum += item.price;
      return sum;
    }, 0);
    cartTotal = (cartTotal / 100).toFixed(2);

    let cartStatus = null;
    if (this.props.items.length === 0) {
      cartStatus = <h4>The cart is empty!</h4>;
    } else {
      cartStatus = <h4>Item Total: ${ cartTotal }</h4>;
    }

    return (
      <div className="container mx-3">
        <div className="row justify-content-center">
          <div className="col-md-8 mb-4">
            <p className="gray cursor" onClick={this.setView}><i className="fas fa-arrow-left"></i> Back to Catalog</p>
            <h2>My Cart</h2>
          </div>
          { cartItems }
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 my-4">
            { cartStatus } <button onClick={this.goToCheckout} className="btn btn-danger">Place Order</button>
          </div>
        </div>
      </div>
    );
  }
}
