import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductListItem extends React.Component {
  render() {
    const product = this.props.prodData;
    const price = (product.price / 100).toFixed(2);
    return (
      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card-container cursor">
          <div className="card card-width">
            <Link to={`/${this.props.prodData.id}`}>
              <div className="card-img-top image-container text-center">
                <img className="image-dims img-fluid" src={product.image} alt="product shot"/>
              </div>
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="gray">${price} <small>/ dozen</small></p>
              <p className="card-text">{product.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
