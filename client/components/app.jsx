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
      cart: [],
      totalClass: '',
      checkMarkClass: '',
      checkMarkIndex: null
    };
    this.updateCart = this.updateCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }
  componentDidMount() {
    this.getProducts();
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', '[]');
    } else {
      this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });
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
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
  addToCart(product, quantity) {
    this.showCartChanged(product.id);

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
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
  removeFromCart(removalId) {
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    const indexToRemove = currentCart.findIndex(item => {
      return item.id === removalId;
    });

    currentCart.splice(indexToRemove, 1);

    this.setState({ cart: currentCart });
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
  showCartChanged(prodId) {
    this.setState({
      totalClass: 'updated',
      checkMarkClass: 'on',
      checkMarkIndex: prodId
    });

    setTimeout(() => {
      this.setState({
        totalClass: '',
        checkMarkClass: '',
        checkMarkIndex: null
      });
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
        localStorage.setItem('cart', '[]');
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
    const { addToCart, removeFromCart, updateCart, placeOrder } = this;
    const { cart, products, totalClass, checkMarkClass, checkMarkIndex } = this.state;

    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="container header">
            <div className="row">
              <Header title="Dozen's Bakery" cart={cart} totalClass={totalClass} />
            </div>
          </div>
          <div className="container main-section">
            <div className="row">
              <Switch>
                <Route exact path="/" render={props =>
                  <ProductList {...props}
                    products={products}
                    addToCartHandler={addToCart}
                    checkMarkIndex={checkMarkIndex}
                  />
                } />
                <Route path="/product/:productId" render={props =>
                  <ProductDetails {...props}
                    addToCartHandler={addToCart}
                    checkMarkClass={checkMarkClass}
                  />
                } />
                <Route path="/cart-summary" render={props =>
                  <CartSummary {...props}
                    items={cart}
                    deleteHandler={removeFromCart}
                    updateHandler={updateCart}
                  />
                } />
                <Route path="/checkout" render={props =>
                  <CheckoutForm {...props}
                    cartItems={cart}
                    orderHandler={placeOrder}
                  />
                } />
                <Route path="/about-us" component={About} />
                <Route path="/confirmation" component={Confirmation}/>
                <Route path="/order" component={OrderSummary} />
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
