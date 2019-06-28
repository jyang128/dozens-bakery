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
    if (!this.state.name || !this.state.phoneNum) {
      this.setState({ errorMessage: 'Pleases provide name and phone number!' });
      return;
    }

    if (this.state.name.length > 65) {
      this.setState({ errorMessage: 'Name must be under 65 characters.' });
      return;
    }

    let phoneNumRegex = /^1?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/gm;
    if (!phoneNumRegex.test(this.state.phoneNum)) {
      this.setState({ errorMessage: 'Not a valid phone number.' });
      return;
    }

    if (this.state.specialInstr.length > 500) {
      this.setState({ errorMessage: `Description must be under 500 characters. It currently has ${this.state.specialInstr.length}.` });
      return;
    }

    this.props.orderHandler(this.state.name, this.state.phoneNum, this.state.specialInstr);
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
      sum += item.price * item.quantity;
      return sum;
    }, 0);
    orderTotal = (orderTotal / 100);
    return (
      <React.Fragment>
        <div className="col-md-8 offset-md-2 mb-4">
          <h2>Checkout</h2>
          <h4 className="gray">Order Total: ${orderTotal}</h4>
        </div>
        <form className="col-md-8 offset-md-2">
          <h5>Name</h5>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            className="mb-3"
          />
          <h5>Phone Number</h5>
          <input
            type="text"
            value={this.state.phoneNum}
            onChange={this.handlePhoneNumChange}
            className="mb-3"
          />
          <h5>Special Instructions</h5>
          <p className="gray">{`Let us know if there are any special adjustments or customizations you'd like to make. We'll be in touch within 48 business hours to discuss the details of your order.`}</p>
          <textarea
            rows="3"
            value={this.state.specialInstr}
            onChange={this.handleSpecialInstrChange}
            className="mb-3"
          />
        </form>
        <div className="col-md-8 offset-md-2 d-flex justify-content-between">
          <button
            id="formSubmit"
            onClick={this.placeOrder}
            className="btn btn-info"
          >
            Place Order
          </button>
          <p className="red my-2">{this.state.errorMessage}</p>
        </div>
      </React.Fragment>
    );
  }
}
