import React from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends React.Component {
  render() {
    return (
      <div className="col-12">
        <div className="page-not-found-container"></div>
        <div className="page-not-found-inner text-center">
          <h1>404 Page Not Found</h1>
          <h5>
            <Link to="/">
              Back To Home &raquo;
            </Link>
          </h5>
        </div>
      </div>
    );
  }
}
