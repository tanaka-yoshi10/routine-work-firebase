import ReactDOM from 'react-dom';
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