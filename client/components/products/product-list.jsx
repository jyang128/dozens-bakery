import React from 'react';
import ProductListItem from './product-list-item';
import Disclaimer from '../general/disclaimer';

export default class ProductList extends React.Component {
  handleDisclaimer() {
    sessionStorage.disclaimer = 'hidden';
    document.querySelector('.disclaimer').classList = ' d-none';
  }
  render() {
    const allProducts = this.props.products.map(product =>
      <ProductListItem
        key={product.id}
        prodData={product}
        addToCartHandler={this.props.addToCartHandler}
        checkMarkIndex={this.props.checkMarkIndex}
      />
    );
    return (
      <div className="col-12 d-flex justify-content-around flex-wrap">
        {allProducts}
        {!sessionStorage.disclaimer && <Disclaimer closeDisclaimer={this.handleDisclaimer}/>}
      </div>
    );
  }
}
