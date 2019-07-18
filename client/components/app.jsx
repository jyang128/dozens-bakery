import React from 'react';
import Header from './general/header';
import ProductList from './products/product-list';
import ProductDetails from './products/product-details';
import CartSummary from './orders/cart-summary';
import CheckoutForm from './orders/checkout-form';
import About from './general/about-us';
import Confirmation from './orders/confirmation';
import OrderSummary from './orders/order-summary';
import PageNotFound from './404/page-not-found';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: []
    };
    this.updateCart = this.updateCart.bind(this);
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
  updateCart(product, quantity) {
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    const indexToCheck = currentCart.findIndex(item => {
      return item.id === product.id;
    });

    currentCart[indexToCheck].quantity = quantity;

    this.setState({ cart: currentCart });
    localStorage.cart = JSON.stringify(currentCart);
  }
  addToCart(product, quantity, event) {
    if (event) {
      this.showCartChanged(event);
      const checkmark = event.target.nextElementSibling;
      checkmark.className += ' on';
      setTimeout(() => {
        checkmark.className = 'feedback';
      }, 600);
    }

    const currentCart = JSON.parse(localStorage.getItem('cart'));
    const indexToCheck = currentCart.findIndex(item => {
      return item.id === product.id;
    });

    if (indexToCheck > -1) {
      currentCart[indexToCheck].quantity += quantity;
    } else {
      product.quantity = quantity;
      currentCart.push(product);
    }

    this.setState({ cart: currentCart });
    localStorage.cart = JSON.stringify(currentCart);
  }
  removeFromCart(removalId) {
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    const indexToRemove = currentCart.findIndex(item => {
      return item.id === removalId;
    });

    currentCart.splice(indexToRemove, 1);

    this.setState({ cart: currentCart });
    localStorage.cart = JSON.stringify(currentCart);
  }
  showCartChanged() {
    const orders = document.querySelector('.total');
    orders.className += ' updated';
    setTimeout(() => {
      orders.className = 'total';
    }, 600);
  }
  placeOrder(name, phoneNum, specialInstr) {
    const orderDetails = {
      name,
      phoneNum,
      specialInstr,
      cart: JSON.stringify(this.state.cart)
    };
    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        localStorage.cart = JSON.stringify([]);
        this.setState({ cart: [] }, () => {
          this.props.history.push({
            pathname: `/confirmation`,
            state: {
              orderId: res.orderId
            }
          });
        });
      })
      .catch(err => console.error(err.message));
  }
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="container header">
            <div className="row">
              <Header title="Dozen's Bakery" cart={this.state.cart} />
            </div>
          </div>
          <div className="container main-section">
            <div className="row">
              <Switch>
                <Route exact path="/" render={props =>
                  <ProductList {...props}
                    products={this.state.products}
                    addToCartHandler={this.addToCart}
                  />
                } />
                <Route path="/product/:productId" render={props =>
                  <ProductDetails {...props}
                    addToCartHandler={this.addToCart}
                  />
                } />
                <Route path="/cart-summary" render={props =>
                  <CartSummary {...props}
                    items={this.state.cart}
                    deleteHandler={this.removeFromCart}
                    updateHandler={this.updateCart}
                  />
                } />
                <Route path="/checkout" render={props =>
                  <CheckoutForm {...props}
                    cartItems={this.state.cart}
                    orderHandler={this.placeOrder}
                  />
                } />
                <Route path="/about-us" component={About} />
                <Route path="/confirmation" component={Confirmation}/>
                <Route path="/order/:orderId" component={OrderSummary} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </div>
        <div className="container footer">
          <div className="row">
            <div className="col-12 d-flex justify-content-center my-4 gray">
              <div>Copyright <i className="far fa-copyright"></i>{`2019 Dozen's Bakery`}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
