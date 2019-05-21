import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
    this.goBack = this.goBack.bind(this);
  }
  componentDidMount() {
    let prodId = this.props.viewParams.id;
    fetch(`/api/products.php?id=${prodId}`)
      .then(res => res.json())
      .then(res => this.setState({ product: res }))
      .catch(err => console.error(err.message));
  }
  goBack() {
    this.props.setView('catalog', { id: null });
  }
  render() {
    return (
      <div className="container mx-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <p className="gray cursor" onClick={this.goBack}><i className="fas fa-arrow-left"></i> Back to Catalog</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <img src={this.state.product.image} className="img-fluid" alt="product shot"/>
          </div>
          <div className="col-md-4">
            <h3 className="card-title">{this.state.product.name}</h3>
            <p className="gray">${this.state.product.price}</p>
            <p className="card-text">{this.state.product.shortDescription}</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
