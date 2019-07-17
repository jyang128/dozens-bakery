import React from 'react';
import Img from '../general/image';
import Reviews from './reviews';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      quantity: 1,
      loading: true
    };
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
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
    this.props.addToCartHandler(this.state.product, this.state.quantity, event);
  }
  handleQtyChange(event) {
    let quantity = event.target.value;
    if (event.target.value.length > 2) {
      quantity = event.target.value.slice(0, 2);
    }
    this.setState({
      quantity: parseInt(quantity, 10)
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
          <div className="d-flex justify-content-left my-3">
            <div className="mr-2">
              <input type="number" min="1" max="99" value={this.state.quantity} onChange={this.handleQtyChange}/>
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
