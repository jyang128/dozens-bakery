import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }
  componentDidMount() {
    this.getProducts();
    this.getCartItems();
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
        params: { id: params }
      }
    });
  }
  getCartItems() {
    fetch('/api/cart.php')
      .then(res => res.json())
      .then(res => this.setState({ cart: res }))
      .catch(err => console.error(err.message));
  }
  addToCart(product) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => this.setState({ cart: this.state.cart.concat(res) }));
  }
  placeOrder(name, creditCard, shippingAddress) {
    let orderDetails = {
      name,
      creditCard,
      shippingAddress,
      cart: this.state.cart
    };
    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ cart: [] });
        this.setView('catalog', {});
      });
  }
  render() {
    let display = null;
    if (this.state.view.name === 'catalog') {
      display = <ProductList stateData={this.state} setView={this.setView}/>;
    } else if (this.state.view.name === 'details') {
      display = <ProductDetails viewParams={this.state.view.params} setView={this.setView} addHandler={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      display = <CartSummary items={this.state.cart} setView={this.setView}/>;
    } else if (this.state.view.name === 'checkout') {
      display = <CheckoutForm cartItems={this.state.cart} orderHandler={this.placeOrder} setView={this.setView}/>;
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <Header title="Wicked Sales" cartItemCount={this.state.cart.length} setView={this.setView}/>
          </div>
          <div className="row">
            { display }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
