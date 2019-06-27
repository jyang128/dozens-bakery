import React from 'react';

export default class Confirmation extends React.Component {
  render() {
    return (
      <div className="col-12">
        <div className="thank-you-container"></div>
        <div className="thank-you-inner text-center">
          <h1>Thank you for your order!</h1>
          <h5 className="mt-4">{`We're so excited to cater your special event! We'll be in touch shortly to confirm the details of your order.`}</h5>
        </div>
      </div>
    );
  }
}
