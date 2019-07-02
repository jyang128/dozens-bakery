import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/general/scroll-to-top';

ReactDOM.render(
  <Router>
    <ScrollToTop>
      <App/>
    </ScrollToTop>
  </Router>,
  document.querySelector('#root')
);
