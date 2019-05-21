import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
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
  setView(name, params) {
    this.setState({
      view: {
        name,
        params
      }
    });
  }
  render() {
    let display = null;
    if (this.state.view.name === 'catalog') {
      display = <ProductList stateData={this.state} setView={this.setView}/>;
    } else {
      display = <ProductDetails viewParams={this.state.view.params} setView={this.setView}/>;
    }
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <Header title="Wicked Sales"/>
          </div>
          <div className="row">
            { display }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
