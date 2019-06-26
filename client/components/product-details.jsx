import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }
  componentDidMount() {
    let prodId = this.props.match.params.id;
    fetch(`/api/products.php?id=${prodId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ product: res[0] });
      })
      .catch(err => console.error(err.message));
  }
  addToCartHandler() {
    this.props.addToCartHandler(this.state.product);
  }
  render() {
    let price = (this.state.product.price / 100).toFixed(2);
    return (
      <div className="container mx-3">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <img src={this.state.product.image} className="img-fluid" alt="product shot"/>
          </div>
          <div className="col-md-4">
            <h3 className="card-title">{this.state.product.name}</h3>
            <p className="gray">${price} <small>/ dozen</small></p>
            <p className="card-text">{this.state.product.shortDescription}
            </p>
            <button className="btn btn-info mb-3" onClick={this.addToCartHandler}>Add To Order</button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
