import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }
  componentDidMount() {
    // fetch(`/api/products?id=`{$productId})
  }
  render() {
    return (
      null
    );
  }
}
