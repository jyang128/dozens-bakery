import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import About from './about-us';
import Confirmation from './confirmation';
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
    let orders = document.querySelector('.total');
    orders.className += ' updated';
    setTimeout(() => {
      orders.className = 'total';
    }, 600);
  }
  placeOrder(name, phoneNum, specialInstr) {
    localStorage.clear();
    let orderDetails = {
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
        this.setState({ cart: [] });
        this.props.history.push({
          pathname: '/confirmation'
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="container header">
            <div className="row">
              <Header title="Dozen's Bakery" cartItemCount={this.state.cart.length}/>
            </div>
          </div>
          <div className="container main-section">
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
                <Route path="/about-us" component={About}/>
                <Route path="/confirmation" component={Confirmation}/>
                <Route path="/:id" render={ props =>
                  <ProductDetails {...props}
                    addToCartHandler={this.addToCart}
                  />
                }/>
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
