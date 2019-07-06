import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import ScrollToTop from './components/general/scroll-to-top';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <ScrollToTop>
      <App/>
    </ScrollToTop>
  </Router>,
  document.querySelector('#root')
);
