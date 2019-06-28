import React from 'react';

export default class Reviews extends React.Component {
  render() {
    let reviews = this.props.reviews.map(review => {
      return (<div className="col-lg-4 mb-4" key={review.id}>
        <h5>{`"${review.review}"`}</h5>
      </div>);
    });
    return (
      <React.Fragment>
        <div className="col-12 text-center my-4">
          <h3>
            <span className="red-underline">Reviews</span>
          </h3>
        </div>
        <div className="col-12 d-flex flex-wrap mt-4 reviews">
          {reviews}
        </div>
      </React.Fragment>
    );
  }
}
