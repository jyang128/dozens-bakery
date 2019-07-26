import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function Confirmation(props) {
  const stateData = props.location.state;
  if (typeof (stateData) === 'undefined') {
    return (<Redirect to='/' />);
  }
  return (
    <div className="col-12">
      <div className="thank-you-container"></div>
      <div className="thank-you-inner text-center">
        <h1>Thank you for your order!</h1>
        <h5 className="mt-4">{`We're so excited to cater your special event! We'll be in touch shortly to confirm the details of your order.`}</h5>
        <Link to={`/order?id=${stateData.orderId}`}>
          <h5>View Summary &raquo;</h5>
        </Link>
      </div>
    </div>
  );
}
