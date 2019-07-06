import React from 'react';
import Img from '../general/image';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  addHandler() {
    this.props.addHandler(this.props.item);
  }
  deleteHandler() {
    this.props.deleteHandler(this.props.item.id);
  }
  render() {
    const price = ((this.props.item.price / 100) * this.props.item.quantity);
    return (
      <React.Fragment>
        <div className="col-12 col-md-3 col-lg-3 offset-lg-2 mb-4 align-self-md-start">
          <Img src={this.props.item.image} className="img-fluid" alt={`${this.props.item.name} product shot`}/>
        </div>
        <div className="col-12 col-md-9 col-lg-5 align-self-md-center mb-4">
          <div className="col-12">
            <h3 className="card-title mt-0">{this.props.item.name}</h3>
          </div>
          <div className="col-12 d-flex justify-content-between my-2">
            <h5 className="card-qty">QTY: {this.props.item.quantity} dozen</h5>
            <h5 className="gray">Total: ${price}</h5>
          </div>
          <div className="col-12 mt-2">
            <span className="card-text gray minus" onClick={this.deleteHandler}>
              <img src="/images/minus.png" />
            </span>
            <span className="card-text gray plus" onClick={this.addHandler}>
              <img src="/images/plus.png" />
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
