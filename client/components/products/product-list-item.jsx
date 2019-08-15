import React from 'react';
import Img from '../general/image';
import { Link } from 'react-router-dom';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }
  addToCartHandler() {
    this.props.addToCartHandler(this.props.prodData, 1);
  }
  render() {
    const { id, name, image, price, shortDescription } = this.props.prodData;
    const { addToCartHandler } = this;
    const { checkMarkIndex } = this.props;
    const shownPrice = (price / 100);

    return (
      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card-container">
          <div className="card">
            <Link to={`/product/${id}`}>
              <div className="card-img-top">
                <Img src={image} className="img-fluid" alt={`${name} product shot`} />
              </div>
            </Link>
            <div className="card-body product-name">
              <Link to={`/product/${id}`}>
                <h5 className="card-title">{name}</h5>
              </Link>
              <p className="gray">${shownPrice} <small>/ dozen</small></p>
              <p className="card-text">{shortDescription.length > 75 ? shortDescription.substring(0, 75) + '...' : shortDescription}</p>
              <h6 onClick={addToCartHandler}>
                <span className="add-to-order">+ Add to Order</span>
                <span
                  className={`feedback ${checkMarkIndex === id && 'on'}`}
                >
                  <i className="fas fa-check"></i>
                </span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
