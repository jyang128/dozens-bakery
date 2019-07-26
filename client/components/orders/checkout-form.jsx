import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNum: '',
      specialInstr: '',
      errorMessage: '',
      specialInstrError: false
    };
    this.placeOrder = this.placeOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  placeOrder() {
    if (!this.state.name || !this.state.phoneNum) {
      this.setState({ errorMessage: 'Please provide name and phone number!' });
      return;
    }

    if (this.state.name.length > 40) {
      this.setState({ errorMessage: 'Name can be 40 characters max.' });
      return;
    }

    let phoneNumRegex = /^1?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/gm;
    if (!phoneNumRegex.test(this.state.phoneNum)) {
      this.setState({ errorMessage: 'Not a valid phone number format.' });
      return;
    }

    if (this.state.specialInstr.length > 500) {
      this.setState({ specialInstrError: true });
      return;
    }

    this.props.orderHandler(this.state.name, this.state.phoneNum, this.state.specialInstr);
    document.getElementById('formSubmit').disabled = true;
  }
  handleChange(event) {
    const name = event.target.name;
    if (name === 'specialInstr' && event.target.value.length >= 500) {
      this.setState({
        [name]: event.target.value,
        specialInstrError: true
      });
    } else {
      this.setState({
        [name]: event.target.value,
        errorMessage: '',
        specialInstrError: false
      });
    }
  }
  render() {
    const { handleChange, placeOrder } = this;
    const { name, phoneNum, specialInstr, errorMessage, specialInstrError } = this.state;

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
        <form className="col-md-8 offset-md-2 checkout">
          <h5>Name</h5>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="mb-3"
          />
          <h5>Phone Number</h5>
          <input
            type="text"
            name="phoneNum"
            value={phoneNum}
            onChange={handleChange}
            className="mb-3"
          />
          <h5>Special Instructions</h5>
          <p className="gray">{`Let us know if there are any special adjustments or customizations you'd like to make. We'll be in touch within 48 business hours to discuss the details of your order.`}</p>
          <textarea
            name="specialInstr"
            rows="3"
            value={specialInstr}
            onChange={handleChange}
            className="mb-2"
          />
        </form>
        <div className="col-md-8 offset-md-2">
          <p className="reminder">*Reminder! This site is for demo purposes and this is not a real order.</p>
          <button
            id="formSubmit"
            onClick={placeOrder}
            className="btn btn-info"
          >
            Place Order
          </button>
          <p className="red pt-2 mb-0"><small>{errorMessage}</small></p>
          <p className="red"><small>{specialInstrError ? `Description must be under 500 characters. It currently has ${specialInstr.length}.` : null}</small></p>
        </div>
      </React.Fragment>
    );
  }
}
