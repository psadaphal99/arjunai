import React from 'react';
import ReactDOM from 'react-dom';
import Arjun from './Arjun';
import { Provider } from 'react-redux'
import store from './store'
import {Provider as AlertProvider,positions,transitions} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  positions:positions.TOP_CENTER,
  timeout:5000,
  transition:transitions.SCALE
}
ReactDOM.render(
  <React.StrictMode>
   < Provider  store={store}>
  <AlertProvider template={AlertTemplate}  {...options}>
  < Arjun />
  </AlertProvider>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);




