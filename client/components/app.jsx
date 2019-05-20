import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(res => this.setState({ products: res }))
      .catch(err => console.error(err.message));
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <Header title="Wicked Sales"/>
          </div>
          <div className="row">
            <ProductList/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
