import React from 'react';
import Img from '../general/image';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityInput: 1
    };
    this.showRemovalPrompt = this.showRemovalPrompt.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.cancelRemoval = this.cancelRemoval.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  componentDidMount() {
    this.setState({
      quantityInput: this.props.item.quantity
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.item.quantity !== this.props.item.quantity) {
      this.setState({ quantityInput: this.props.item.quantity });
    }
  }
  handleBlur(event) {
    this.props.updateHandler(this.props.item, this.state.quantityInput);
  }
  handleQtyChange(event) {
    let quantity = event.target.value;
    if (event.target.value.length > 2) {
      quantity = event.target.value.slice(0, 2);
    }
    this.setState({
      quantityInput: parseInt(quantity, 10)
    });
  }
  showRemovalPrompt(event) {
    const cartOps = event.target.parentNode.parentNode;
    cartOps.className += ' hide';
    cartOps.nextElementSibling.className += ' show';
  }
  removeFromCart() {
    this.props.deleteHandler(this.props.item.id);
  }
  cancelRemoval(event) {
    const promptOps = event.target.parentNode;
    promptOps.previousElementSibling.className = 'col-12 mt-2 cart-operations';
    promptOps.className = 'col-12 mt-2 removal-prompt';
  }
  render() {
    let price = ((this.props.item.price / 100) * this.state.quantityInput);
    if (isNaN(price)) {
      price = 0;
    }
    return (
      <React.Fragment>
        <div className="col-12 col-md-3 col-lg-3 offset-lg-2 mb-4 align-self-md-start">
          <Img src={this.props.item.image} className="img-fluid" alt={`${this.props.item.name} product shot`}/>
        </div>
        <div className="col-12 col-md-9 col-lg-5 align-self-md-center mb-4">
          <div className="col-12">
            <h3 className="card-title mt-0">{this.props.item.name}</h3>
          </div>
          <div className="col-12 d-flex justify-content-between my-2">
            <h5 className="card-qty">QTY:
              <input
                type="number"
                min="1"
                max="99"
                value={this.state.quantityInput}
                onChange={this.handleQtyChange}
                onBlur={this.handleBlur}
              />
             dozen</h5>
            <h5 className="gray">Total: ${price}</h5>
          </div>
          <div className="col-12 mt-2 cart-operations">
            <div>
              <span className="remove-btn" onClick={this.showRemovalPrompt}>&times; Remove</span>
            </div>
          </div>
          <div className="col-12 mt-2 removal-prompt">
            <span className="mr-2">Are you sure?</span>
            <i className="fas fa-check removal-icons mr-2" onClick={this.removeFromCart}></i>
            <i className="fas fa-times removal-icons" onClick={this.cancelRemoval}></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
