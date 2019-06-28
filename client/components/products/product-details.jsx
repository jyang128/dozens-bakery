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
    const prodId = this.props.match.params.id;
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
    const price = (this.state.product.price / 100);
    let reviews = null;
    if (this.state.product.longDescription) {
      reviews = (
        <React.Fragment><div className="col-12 text-center my-4">
          <h3>
            <span className="red-underline">Reviews</span>
          </h3>
        </div>
        <div className="col-12 d-flex flex-wrap mt-4 reviews">
          <div className="col-lg-4 mb-4">
            <h5>{`"${this.state.product.longDescription}"`}</h5>
          </div>
          <div className="col-lg-4 mb-4">
            <h5>{`"${this.state.product.longDescription}"`}</h5>
          </div>
          <div className="col-lg-4 mb-4">
            <h5>{`"${this.state.product.longDescription}"`}</h5>
          </div>
          <div className="col-lg-4 mb-4">
            <h5>{`"${this.state.product.longDescription}"`}</h5>
          </div>
          <div className="col-lg-4 mb-4">
            <h5>{`"${this.state.product.longDescription}"`}</h5>
          </div>
        </div>
        </React.Fragment>);
    } else { reviews = null; }

    return (
      <React.Fragment>
        <div className="col-12 col-sm-6 mb-4">
          <img src={this.state.product.image} className="img-fluid" alt="product shot" />
        </div>
        <div className="col-12 col-sm-6">
          <h3 className="card-title">{this.state.product.name}</h3>
          <p className="gray">${price} <small>/ dozen</small></p>
          <p className="card-text">{this.state.product.shortDescription}
          </p>
          <button className="btn btn-info mb-3" onClick={this.addToCartHandler}>Add To Order</button>
          <span className="feedback"><i className="fas fa-check"></i></span>
        </div>
        {reviews}
      </React.Fragment>
    );
  }
}
