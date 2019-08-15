import React from 'react';
import Img from '../general/image';
import Reviews from './reviews';
import { Link } from 'react-router-dom';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      showPromptClass: '',
      quantityInput: 1,

      loading: true
    };
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleQtyBlur = this.handleQtyBlur.bind(this);
  }
  componentDidMount() {
    const prodId = this.props.match.params.productId;
    fetch(`/api/products.php?id=${prodId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ product: res[0] });
      })
      .catch(err => console.error(err.message))
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  addToCartHandler(event) {
    this.props.addToCartHandler(this.state.product, parseInt(this.state.quantityInput, 10), event);
    this.setState({
      quantityInput: 1
    });
    this.setState({
      showPromptClass: 'show'
    });
  }
  handleQtyBlur() {
    let quantity = this.state.quantityInput;
    if (!this.state.quantityInput) {
      quantity = 1;
    }
    this.setState({
      quantityInput: quantity
    });
  }
  handleQtyChange(event) {
    let quantity = event.target.value;
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
  render() {
    const { handleQtyChange, handleQtyBlur, addToCartHandler } = this;
    const { image, name, price, reviews, longDescription } = this.state.product;
    const { quantityInput, showPromptClass, loading } = this.state;
    const { checkMarkClass } = this.props;

    const shownPrice = (price / 100);
    let shownReviews = null;
    if (reviews) {
      shownReviews = <Reviews reviews={reviews}/>;
    }

    let loader = null;
    if (loading) {
      loader = <div className="loading-page"></div>;
    }

    return (
      <React.Fragment>
        <div className="col-12 col-sm-6 mb-4">
          <Img src={image} className="img-fluid" alt={`${name} product shot`} />
        </div>
        <div className="col-12 col-sm-6">
          <h3 className="card-title">{name}</h3>
          <p className="gray">${shownPrice} <small>/ dozen</small></p>
          <p className="card-text">{longDescription}</p>
          <div className="d-flex justify-content-left details-qty my-3">
            <div className="mr-2">
              <input
                type="number"
                min="1"
                max="99"
                value={quantityInput}
                onChange={handleQtyChange}
                onBlur={handleQtyBlur}
              />
            </div>
            <button className="btn btn-info" onClick={addToCartHandler}>
              Add to Order
            </button>
            <span className={`feedback ${checkMarkClass}`}><i className="fas fa-check"></i></span>
          </div>
          <div className={`cart-add-prompt ${showPromptClass}`}>
            <Link to="/cart-summary">
              <i className="fas fa-cookie"></i> Go to Order<br/>
            </Link>
            <Link to="/">
              <i className="fas fa-undo-alt"></i> Back to Browse
            </Link>
          </div>
        </div>
        {shownReviews}
        {loader}
      </React.Fragment>
    );
  }
}
