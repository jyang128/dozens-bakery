import React from 'react';
import ProductListItem from './product-list-item';
import Disclaimer from '../general/disclaimer';

export default class ProductList extends React.Component {
  handleDisclaimer() {
    localStorage.disclaimer = 'hidden';
    document.querySelector('.disclaimer').classList = ' d-none';
  }
  render() {
    const allProducts = this.props.products.map(product =>
      <ProductListItem
        key={product.id}
        prodData={product}
        addToCartHandler={this.props.addToCartHandler}
      />
    );
    return (
      <div className="col-12 d-flex justify-content-around flex-wrap">
        {allProducts}
        {!localStorage.disclaimer ? <Disclaimer closeDisclaimer={this.handleDisclaimer}/> : null }
      </div>
    );
  }
}
