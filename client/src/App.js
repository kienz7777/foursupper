import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './features/Home';
import Account from './features/Account';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/login' element={<Account />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
