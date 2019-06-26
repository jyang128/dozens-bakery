import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }
  addToCartHandler(event) {
    this.props.addToCartHandler(this.props.prodData, event);
  }
  render() {
    const product = this.props.prodData;
    const price = (product.price / 100);
    return (
      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card-container">
          <div className="card card-width">
            <Link to={`/${this.props.prodData.id}`}>
              <div className="card-img-top image-container text-center">
                <img className="image-dims img-fluid" src={product.image} alt="product shot"/>
              </div>
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="gray">${price} <small>/ dozen</small></p>
              <p className="card-text line-height">{
                product.shortDescription.length < 110 ? product.shortDescription : product.shortDescription.substring(0, 101) + '...'
              }</p>
              <h6 onClick={this.addToCartHandler}>
                <span className="add-to-order">+ Add to Order</span>
                <span className="feedback"><i className="fas fa-check"></i></span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
