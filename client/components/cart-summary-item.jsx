import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    let price = (this.props.item.price / 100).toFixed(2);
    return (
      <React.Fragment>
        <div className="row justify-content-center mb-4">
          <div className="col-md-3">
            <img src={this.props.item.image} className="img-fluid" alt="cart item image"/>
          </div>
          <div className="col-md-5 align-self-center">
            <div className="col-12">
              <h3 className="card-title">{this.props.item.name}</h3>
            </div>
            <div className="col-12 d-flex justify-content-between my-2">
              <h6 className="gray">${price}</h6>
              <h6 className="card-qty">QTY: {this.props.item.quantity}</h6>
            </div>
            <div className="col-12">
              <p className="card-text">{this.props.item.shortDescription}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
