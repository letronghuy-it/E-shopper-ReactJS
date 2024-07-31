import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Blog from './Blog/Blog';
import Blogdetail from './Blogdetail/Blogdetail';
import Register from './Register/Register';
import Login from './Login/Login';
import Account from './Account/Account';
import Myproduct from './Account/Myproduct';
import Createproduct from './Account/Createproduct';
import Editproduct from './Account/Editproduct';
import Productdetail from './Product/Productdetail';
import Cart from './Product/Cart';
import Wishlist from './Product/Wishlist';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router >
      <App>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog' element={<Blog />} />
          <Route path="/blog/detail/:id" element={<Blogdetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path='/my-product' element={<Myproduct />} />
          <Route path='/create-product' element={<Createproduct />} />
          <Route path='/edit-product/:id' element={<Editproduct />} />
          <Route path='/product-details/:id' element={<Productdetail />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/wish-list' element={<Wishlist />} />
          {/* admin */}
        </Routes>
      </App>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
