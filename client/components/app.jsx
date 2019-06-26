import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: []
    };
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
        this.props.history.push({
          pathname: '/'
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <Header title="Savor" cartItemCount={this.state.cart.length}/>
          </div>
          <div className="row">
            <Switch>
              <Route exact path="/" render={ props =>
                <ProductList {...props}
                  stateData={this.state}/>
              }/>
              <Route path="/cart-summary" render={ props =>
                <CartSummary {...props}
                  items={this.state.cart}
                />
              }/>
              <Route path="/checkout" render={ props =>
                <CheckoutForm {...props}
                  cartItems={this.state.cart}
                  orderHandler={this.placeOrder}
                />
              }/>
              <Route path="/:id" render={ props =>
                <ProductDetails {...props}
                  addToCartHandler={this.addToCart}
                />
              }/>
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
