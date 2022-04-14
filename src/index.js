import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route } from 'react-router-dom';
import './styles/index.css';

import App from './routes/App';
import SecondPage from './routes/Order.js';
import NotFound from './routes/404.js';
import Signin from './routes/Signin.js';
import Signup from './routes/Signup.js';
import MenuPage from './routes/Menu.js';

/*
 * This is the file where you will either render all your routes (as seen below),
 * or only render your <App />
 */
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/order' element={<SecondPage />} />
      <Route path="/order/:id" element={<MenuPage />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/404' element={<NotFound/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
