import React from 'react';

class ProductListItem extends React.Component {
  render() {
    let product = this.props.productData;
    return (
      <div className="card-container">
        <div className="card card-width">
          <div className="card-img-top">
            <img className="image-width" src={product.image} alt="product shot"/>
          </div>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="gray">${product.price.toFixed(2)}</p>
            <p className="card-text">{product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
