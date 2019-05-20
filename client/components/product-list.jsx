import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  render() {
    return (
      <div className="col-12 d-flex justify-content-around flex-wrap">
        <ProductListItem/>
        <ProductListItem/>
        <ProductListItem/>
        <ProductListItem/>
        <ProductListItem/>
        <ProductListItem/>
        <ProductListItem/>
        <ProductListItem/>
        <ProductListItem/>
      </div>
    );
  }
}

export default ProductList;
