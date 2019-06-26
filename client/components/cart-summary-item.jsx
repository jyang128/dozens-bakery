import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  deleteHandler() {
    this.props.deleteHandler(this.props.item.id);
  }
  render() {
    let price = ((this.props.item.price / 100) * this.props.item.quantity);
    return (
      <React.Fragment>
        <div className="row justify-content-center mb-4">
          <div className="col-md-3">
            <img src={this.props.item.image} className="img-fluid" alt="cart item image"/>
          </div>
          <div className="col-md-5 align-self-center">
            <div className="col-12">
              <h3 className="card-title mt-3">{this.props.item.name}</h3>
            </div>
            <div className="col-12 d-flex justify-content-between my-2">
              <h6 className="card-qty">QTY: {this.props.item.quantity} dozen</h6>
              <h6 className="gray">${price}</h6>
            </div>
            <div className="col-12">
              <p className="card-text">{this.props.item.shortDescription}</p>
            </div>
            <div className="col-12 mt-2">
              <p className="card-text gray remove" onClick={this.deleteHandler}>&times; remove</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
