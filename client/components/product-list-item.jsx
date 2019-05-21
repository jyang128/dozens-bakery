import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.viewHandler = this.viewHandler.bind(this);
  }
  viewHandler() {
    this.props.viewHandler('details', this.props.prodData.id);
  }
  render() {
    let product = this.props.prodData;
    return (
      <div className="card-container cursor" onClick={this.viewHandler}>
        <div className="card card-width">
          <div className="card-img-top image-container text-center">
            <img className="image-dims img-fluid contain" src={product.image} alt="product shot"/>
          </div>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="gray">${product.price.toFixed(2)}</p>
            <p className="card-text">{product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
