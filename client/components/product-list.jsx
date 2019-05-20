import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  render() {
    let products = this.props.products;
    let allProducts = products.map(product => <ProductListItem key={product.id} productData={product}/>);
    return (
      <div className="col-12 d-flex justify-content-around flex-wrap">
        { allProducts }
      </div>
    );
  }
}

export default ProductList;
