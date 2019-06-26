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
    this.removeFromCart = this.removeFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }
  componentDidMount() {
    this.getProducts();
    if (!localStorage.cart) {
      localStorage.cart = JSON.stringify(this.state.cart);
    } else {
      this.setState({ cart: JSON.parse(localStorage.cart) });
    }
  }
  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(res => this.setState({ products: res }))
      .catch(err => console.error(err.message));
  }
  addToCart(product, event) {
    if (event) {
      this.showCartChanged(event);
      let checkmark = event.target.nextElementSibling;
      checkmark.className += ' on';
      setTimeout(() => {
        checkmark.className = 'feedback';
      }, 600);
    }
    let currentCart = JSON.parse(localStorage.getItem('cart'));
    currentCart.push(product);
    this.setState({ cart: currentCart });
    localStorage.cart = JSON.stringify(currentCart);
  }
  removeFromCart(removalIndex) {
    let currentCart = JSON.parse(localStorage.getItem('cart'));
    let indexToRemove = currentCart.findIndex(item => {
      return item.id === removalIndex;
    });
    currentCart.splice(indexToRemove, 1);
    this.setState({ cart: currentCart });
    localStorage.cart = JSON.stringify(currentCart);
  }
  showCartChanged() {
    let orders = document.querySelector('.order-total');
    orders.className += ' updated';
    setTimeout(() => {
      orders.className = 'menu order-total';
    }, 500);
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
            <Header title="Some Bakery" cartItemCount={this.state.cart.length}/>
          </div>
          <div className="row">
            <Switch>
              <Route exact path="/" render={ props =>
                <ProductList {...props}
                  stateData={this.state}
                  addToCartHandler={this.addToCart}
                />
              }/>
              <Route path="/cart-summary" render={ props =>
                <CartSummary {...props}
                  items={this.state.cart}
                  deleteHandler={this.removeFromCart}
                  addHandler={this.addToCart}
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
