import React from 'react';
import Img from '../general/image';
import { Link } from 'react-router-dom';

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
  handleBlur() {
    let quantity = this.state.quantityInput;
    if (!this.state.quantityInput) {
      quantity = 1;
    }
    this.setState({
      quantityInput: quantity
    });
    this.props.updateHandler(this.props.item, parseInt(quantity, 10));
  }
  handleQtyChange(event) {
    let quantity = event.target.value;
    const character = quantity.charAt(quantity.length - 1);
    if (isNaN(character)) return;
    if (quantity.charAt(0) === '0' || quantity.charAt(0) === ' ') return;
    if (event.target.value.length > 2) {
      quantity = event.target.value.slice(0, 2);
    }
    if (event.target.value.trim === '') {
      quantity = '';
    }
    this.setState({
      quantityInput: quantity
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
    const { handleBlur, handleQtyChange, showRemovalPrompt, removeFromCart, cancelRemoval } = this;
    const { id, image, name, price } = this.props.item;
    const { quantityInput } = this.state;

    let shownPrice = ((price / 100) * quantityInput);
    if (isNaN(price)) {
      shownPrice = 0;
    }
    return (
      <React.Fragment>
        <div className="col-12 col-md-3 col-lg-3 offset-lg-2 mb-4 align-self-md-start">
          <Img src={image} className="img-fluid" alt={`${name} product shot`}/>
        </div>
        <div className="col-12 col-md-9 col-lg-5 align-self-md-center mb-4">
          <div className="col-12 product-name">
            <Link to={`/product/${id}`}>
              <h3 className="card-title mt-0">{name}</h3>
            </Link>
          </div>
          <div className="col-12 d-flex justify-content-between my-2">
            <h5 className="cart-qty">QTY:
              <input
                type="text"
                value={quantityInput}
                onChange={handleQtyChange}
                onBlur={handleBlur}
              />
              dozen
            </h5>
            <h5 className="gray">Total: ${shownPrice}</h5>
          </div>
          <div className="col-12 mt-2 cart-operations">
            <div>
              <span className="remove-btn" onClick={showRemovalPrompt}>&times; Remove</span>
            </div>
          </div>
          <div className="col-12 mt-2 removal-prompt">
            <span className="mr-2">Are you sure?</span>
            <i className="fas fa-check removal-icons mr-2" onClick={removeFromCart}></i>
            <i className="fas fa-times removal-icons" onClick={cancelRemoval}></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
