import React from 'react';

export default class Disclaimer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="disclaimer col-12 d-flex justify-content-center">
          <div className="align-self-center">
                        Reminder! This site is for demo purposes and any orders placed will not be fulfilled.
          </div>
          <div className="disclaimer-close" onClick={this.props.closeDisclaimer}><i className="fas fa-times fa-2x"></i></div>
        </div>
      </React.Fragment>
    );
  }
}
