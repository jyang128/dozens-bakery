import React from 'react';
import Img from '../general/image';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.incrementQty = this.incrementQty.bind(this);
    this.decrementQty = this.decrementQty.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.cancelRemoval = this.cancelRemoval.bind(this);
  }
  incrementQty() {
    this.props.addHandler(this.props.item);
  }
  decrementQty(event) {
    if (this.props.item.quantity === 1) {
      const cartOps = event.target.parentNode.parentNode;
      cartOps.className += ' hide';
      cartOps.nextElementSibling.className += ' show';
      return;
    }
    this.props.deleteHandler(this.props.item.id);
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
    const price = ((this.props.item.price / 100) * this.props.item.quantity);
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
            <h5 className="card-qty">QTY: {this.props.item.quantity} dozen</h5>
            <h5 className="gray">Total: ${price}</h5>
          </div>
          <div className="col-12 mt-2 cart-operations">
            <span className="card-text gray minus" onClick={this.decrementQty}>
              <img src="/images/minus.png" />
            </span>
            <span className="card-text gray plus" onClick={this.incrementQty}>
              <img src="/images/plus.png" />
            </span>
          </div>
          <div className="col-12 mt-2 removal-prompt">
            <span className="mr-2">Remove?</span>
            <i className="fas fa-check removal-icons mr-2" onClick={this.removeFromCart}></i>
            <i className="fas fa-times removal-icons" onClick={this.cancelRemoval}></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
