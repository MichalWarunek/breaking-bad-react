import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base/index.less';
import './styles/pages/index.less';
import NextApp from './NextApp';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL= 'http://localhost:3000/api/v1';

ReactDOM.render(
  <React.StrictMode>
    <NextApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
