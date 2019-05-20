import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <h1 className="col-md-12 text-center my-3 align-self-center">{this.props.title}<i className="fas fa-shopping-cart"></i></h1>
    );
  }
}

export default Header;
