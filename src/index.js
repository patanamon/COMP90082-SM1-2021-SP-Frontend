/**
  This CodeSandbox has been automatically generated using
  `codesandboxer`. If you're curious how that happened, you can
  check out our docs here: https://github.com/codesandbox/codesandboxer

  If you experience any struggles with this sandbox, please raise an issue
  on github. :)
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { PageRouter } from './Home';

import { Provider } from 'react-redux';
import { store } from './_helpers';


import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Provider store={store}>
      <PageRouter/>
  </Provider>,
  
document.getElementById('root')
);