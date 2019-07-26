import React from 'react';
import Img from '../general/image';

export default class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      loading: true
    };
  }
  componentDidMount() {
    const searchArray = this.props.location.search.split('=');
    const orderId = searchArray[1];
    this.getOrderDetails(orderId);
  }
  getOrderDetails(orderId) {
    fetch(`/api/get_order.php?orderId=${orderId}`)
      .then(res => res.json())
      .then(res => {
        const order = JSON.parse(res[0].cart_items);
        this.setState({ order });
      })
      .catch(err => console.error(err.message))
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    let orderTotal = 0;
    const orders = this.state.order.map((item, index) => {
      let price = ((item.price / 100) * item.quantity);
      orderTotal += price;
      return <React.Fragment key={index}>
        <div className="col-12 col-md-3 align-self-md-start mb-4">
          <Img src={item.image} className="img-fluid" alt={`${item.name} product shot`}/>
        </div>
        <div className="col-12 col-md-9 align-self-md-center mb-4">
          <div className="col-12">
            <h3 className="card-title mt-0">{item.name}</h3>
          </div>
          <div className="col-12 d-flex justify-content-between my-2">
            <h5 className="card-qty">QTY: {item.quantity} dozen</h5>
            <h5 className="gray">Total: ${price}</h5>
          </div>
        </div>
      </React.Fragment>;
    });

    let loader = null;
    if (this.state.loading) {
      loader = (<div className="loading-page"></div>);
    }

    const searchArray = this.props.location.search.split('=');
    const orderId = searchArray[1];

    return (
      <React.Fragment>
        <div className="col-12 text-center mb-4">
          <h1><span className="red-underline">Order Summary</span></h1>
          <h4 className="gray mt-4">Grand Total: ${orderTotal}</h4>
          <p className="gray">Your order is #{orderId}</p>
        </div>
        <div className="col-12 col-lg-8 offset-lg-2 d-flex flex-wrap">
          {orders}
        </div>
        {loader}
      </React.Fragment>
    );
  }
}
