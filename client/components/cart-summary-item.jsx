import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    let price = (this.props.item.price / 100).toFixed(2);
    return (
      <React.Fragment>
        <div className="row justify-content-center mb-4">
          <div className="col-md-3">
            <img src={this.props.item.image} className="img-fluid" alt="cart item shot"/>
          </div>
          <div className="col-md-5 align-self-center">
            <h3 className="card-title">{this.props.item.name}</h3>
            <p className="gray">${price}</p>
            <p className="card-text">{this.props.item.shortDescription}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
