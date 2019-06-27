import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="col-12">
        <div className="about-container"></div>
        <div className="about-inner">
          <h1>About Us</h1>
          <h5>{`We are a small team of bakers who are passionate about creating delicious, high quality desserts for all occassions.  We've catered birthday parties, graduations, wedding showers, and more! Each treat on our menu is sold by the baker's dozen (in batches of 13).  We're always exploring new dessert ideas, so check back often to see what's new!`}</h5>
        </div>
      </div>
    );
  }
}
