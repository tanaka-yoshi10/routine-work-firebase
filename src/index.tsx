import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"

import routes from './routes';
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ChakraProvider>
      {routes}
    </ChakraProvider>
  </Router>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
