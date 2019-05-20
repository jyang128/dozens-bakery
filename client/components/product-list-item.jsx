import React from 'react';

class ProductListItem extends React.Component {
  render() {
    return (
      <div className="card-container">
        <div className="card card-width">
          <img className="card-img-top" src="temp-card.png" alt="product shot"/>
          <div className="card-body">
            <h5 className="card-title">Product Name</h5>
            <p className="gray">$0.00</p>
            <p className="card-text">Some description about the item...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
