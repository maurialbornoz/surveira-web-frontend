import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './index.scss';
import App from './App';
import axios from "axios"

axios.defaults.headers.common['Accept-Language'] = 'en'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <App />

);
