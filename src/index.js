import React from 'react';
import ReactDOM from 'react-dom';
import { PageRouter } from './Home';
import { Provider } from 'react-redux';
import { store } from './_helpers';


ReactDOM.render(
  <Provider store={store}>
      <PageRouter/>
  </Provider>,
  
document.getElementById('root')
);