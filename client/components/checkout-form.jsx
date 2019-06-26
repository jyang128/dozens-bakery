import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNum: '',
      specialInstr: '',
      errorMessage: ''
    };
    this.placeOrder = this.placeOrder.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
    this.handleSpecialInstrChange = this.handleSpecialInstrChange.bind(this);
  }
  placeOrder() {
    if (!this.state.name || !this.state.phoneNum || !this.state.specialInstr) {
      this.setState({ errorMessage: 'Missing required input!' });
      return;
    }
    this.props.orderHandler(this.state.name, this.state.email, this.state.specialInstr);
    document.getElementById('formSubmit').disabled = true;
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handlePhoneNumChange(event) {
    this.setState({ phoneNum: event.target.value });
  }
  handleSpecialInstrChange(event) {
    this.setState({ specialInstr: event.target.value });
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
            <h4>Phone Number</h4>
            <input
              type="text"
              value={this.state.phoneNum}
              onChange={this.handlePhoneNumChange}
              className="mb-3"
            />
            <h4>Special Instructions</h4>
            <p><small>Let us know if you have any special requests.</small></p>
            <textarea
              rows="3"
              value={this.state.specialInstr}
              onChange={this.handleSpecialInstrChange}
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
          <div className="col-md-8 mt-2 d-flex justify-content-between">
            <button id="formSubmit" onClick={this.placeOrder} className="btn btn-info">Place Order</button>
          </div>
        </div>
      </div>
    );
  }
}
