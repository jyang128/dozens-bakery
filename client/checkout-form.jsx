// import React from 'react';

// export default class CheckoutForm extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             name: '',
//             creditCard: '',
//             shippingAddress: ''
//         };
//         this.setView = this.setView.bind(this);
//     }
//     setView(){
//         this.props.setView(this.state.name, this.state.creditCard, this.state.shippingAddress);
//     }
//     render(){
//         return(
//             <div className="container mx-3">
//             <div className="row justify-content-center">
//               <div className="col-md-8 mb-4">
//                 <h2>Checkout</h2>
//                 <h4 className="gray">Order Total: $TOTAL</h4>
//               </div>
//                 <form onSubmit={  }>
//                     <h4>Manage Students</h4>
//                     <input type="text" value={this.state.name} onChange={this.handleChangeName} placeholder="Name"/>
//                     <h4>Manage Students</h4>
//                     <input type="text" value={this.state.creditCard} onChange={this.handleCreditChange} placeholder="Credit Card Number"/>
//                     <h4>Manage Students</h4>
//                     <input type="textarea" value={this.state.shippingAddress} onChange={this.handleAddressChange} placeholder="Shipping Address"/>
//                 </form>
//             </div>
//             <div className="row justify-content-center">
//               <div className="col-md-8 my-4">
//                 <button className="btn btn-danger">Place Order</button>
//               </div>
//             </div>
//           </div>
//         );
//     }
// }
