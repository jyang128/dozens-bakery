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
  addToCartHandler(event) {
    this.props.addToCartHandler(this.state.product, event);
  }
  render() {
    let price = (this.state.product.price / 100);
    return (
      <React.Fragment>
        <div className="col-12 col-sm-6 mb-4">
          <img src={this.state.product.image} className="img-fluid" alt="product shot"/>
        </div>
        <div className="col-12 col-sm-6">
          <h3 className="card-title">{this.state.product.name}</h3>
          <p className="gray">${price} <small>/ dozen</small></p>
          <p className="card-text">{this.state.product.shortDescription}
          </p>
          <button className="btn btn-info mb-3" onClick={this.addToCartHandler}>Add To Order</button>
          <span className="feedback"><i className="fas fa-check"></i></span>
        </div>
        <div className="col-12 col-md-8 offset-md-2 mt-2">
          <p>{this.state.product.longDescription}</p>
        </div>
      </React.Fragment>
    );
  }
}
