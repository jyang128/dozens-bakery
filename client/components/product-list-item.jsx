import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductListItem extends React.Component {
  render() {
    let product = this.props.prodData;
    let price = (product.price / 100).toFixed(2);
    return (
      <div className="card-container cursor">
        <div className="card card-width">
          <Link to={`/${this.props.prodData.id}`}>
            <div className="card-img-top image-container text-center">
              <img className="image-dims img-fluid contain" src={product.image} alt="product shot"/>
            </div>
          </Link>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="gray">${price}</p>
            <p className="card-text">{product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
