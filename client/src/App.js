import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './features/Home';
import Account from './features/Account';
import OrderTracking from './features/OrderTracking';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/home' element={<Home />}/>
          <Route exact path='/login' element={<Account />}/> 
          <Route exact path='/' element={<OrderTracking />}/> 
        </Routes>
    </BrowserRouter>
  );
}

export default App;
