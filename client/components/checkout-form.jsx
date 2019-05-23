import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      errorMessage: ''
    };
    this.placeOrder = this.placeOrder.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.setView = this.setView.bind(this);
  }
  placeOrder() {
    if (!this.state.name || !this.state.creditCard || !this.state.shippingAddress) {
      this.setState({ errorMessage: 'Missing a required input!' });
      return;
    }
    this.props.orderHandler(this.state.name, this.state.creditCard, this.state.shippingAddress);
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleCreditChange(event) {
    this.setState({ creditCard: event.target.value });
  }
  handleAddressChange(event) {
    this.setState({ shippingAddress: event.target.value });
  }
  setView() {
    this.props.setView('catalog', {});
  }
  render() {
    let orderTotal = this.props.cartItems.reduce((sum, item) => {
      sum += item.price;
      return sum;
    }, 0);
    orderTotal = (orderTotal / 100).toFixed(2);
    return (
      <div className="container mx-3">
        <div className="row justify-content-center">
          <div className="col-md-8 mb-4">
            <h2>Checkout</h2>
            <h4 className="gray">Order Total: ${orderTotal}</h4>
          </div>
          <form className="col-md-8">
            <h4>Name</h4>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              className="mb-3"
            />
            <h4>Credit Card</h4>
            <input
              type="number"
              value={this.state.creditCard}
              onChange={this.handleCreditChange}
              className="mb-3"
            />
            <h4>Shipping Address</h4>
            <input
              type="textarea"
              value={this.state.shippingAddress}
              onChange={this.handleAddressChange}
              className="mb-3"
            />
          </form>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 d-flex justify-content-between">
            <p className="red">{this.state.errorMessage}</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 my-4 d-flex justify-content-between">
            <p className="gray cursor align-self-center" onClick={this.setView}><i className="fas fa-arrow-left"></i> Continue Shopping</p>
            <button onClick={this.placeOrder} className="btn btn-danger">Place Order</button>
          </div>
        </div>
      </div>
    );
  }
}
