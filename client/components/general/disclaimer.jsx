import React from 'react';

export default function Disclaimer(props) {
  return (
    <React.Fragment>
      <div className={`disclaimer col-12 d-flex justify-content-center ${props.disclaimerClass}`}>
        <div className="align-self-center">
          Reminder! This site is for demo purposes and any orders placed will not be fulfilled.
        </div>
        <div className="disclaimer-close" onClick={props.closeDisclaimer}><i className="fas fa-times fa-2x"></i></div>
      </div>
    </React.Fragment>
  );
}
