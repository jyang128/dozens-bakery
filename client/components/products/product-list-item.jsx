import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../general/image';

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
          <div className="card">
            <Link to={`/product/${this.props.prodData.id}`}>
              <div className="card-img-top">
                <Img src={product.image} className="img-fluid" alt="product shot" />
              </div>
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="gray">${price} <small>/ dozen</small></p>
              <p className="card-text">{
                product.shortDescription.length < 71 ? product.shortDescription : product.shortDescription.substring(0, 70) + '...'
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
