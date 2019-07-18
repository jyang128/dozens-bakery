import React from 'react';
import Img from '../general/image';
import Reviews from './reviews';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      quantityInput: 1,
      loading: true
    };
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
  }
  handleBlur() {
    let quantity = this.state.quantityInput;
    if (!this.state.quantityInput) {
      quantity = 1;
    }
    this.setState({ quantityInput: quantity });
  }
  handleQtyChange(event) {
    let quantity = event.target.value;
    let character = quantity.charAt(quantity.length - 1);
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
  render() {
    const price = (this.state.product.price / 100);
    let reviews = null;
    if (this.state.product.reviews) {
      reviews = <Reviews reviews={this.state.product.reviews}/>;
    }

    let loader = null;
    if (this.state.loading) {
      loader = <div className="loading-page"></div>;
    }

    return (
      <React.Fragment>
        <div className="col-12 col-sm-6 mb-4">
          <Img src={this.state.product.image} className="img-fluid" alt={`${this.state.product.name} product shot`} />
        </div>
        <div className="col-12 col-sm-6">
          <h3 className="card-title">{this.state.product.name}</h3>
          <p className="gray">${price} <small>/ dozen</small></p>
          <p className="card-text">{this.state.product.longDescription}</p>
          <div className="d-flex justify-content-left details-qty my-3">
            <div className="mr-2">
              <input
                type="text"
                pattern="^[1-9]\d*$"
                value={this.state.quantityInput}
                onChange={this.handleQtyChange}
                onBlur={this.handleBlur}
              />
            </div>
            <button className="btn btn-info" onClick={this.addToCartHandler}>Add To Order</button>
            <span className="feedback"><i className="fas fa-check"></i></span>
          </div>

        </div>
        {reviews}
        {loader}
      </React.Fragment>
    );
  }
}
