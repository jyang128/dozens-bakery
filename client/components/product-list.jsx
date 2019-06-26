import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  render() {
    const stateData = this.props.stateData;
    const allProducts = stateData.products.map(product => <ProductListItem key={product.id} prodData={product}/>);
    return (
      <div className="col-12 d-flex justify-content-around flex-wrap">
        { allProducts }
      </div>
    );
  }
}
