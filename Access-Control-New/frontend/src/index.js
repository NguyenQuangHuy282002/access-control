import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import App from './components/App'

const Root = (
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>
);

ReactDOM.render(Root, document.getElementById("root"));