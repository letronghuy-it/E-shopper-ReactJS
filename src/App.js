
import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Slide from './Layout/Slide';
import MenuLeft from './Layout/MenuLeft';
import { useLocation } from 'react-router-dom';
import MenuAc from './Account/MenuAc';
import React, { useState } from 'react';
import { CartContext } from './Context/CartContext';
import { WishlistContext } from './Context/WishlistContext';
import { Provider } from 'react-redux';
import store from './store';



function App(props) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistC, setWishlist] = useState(0);

  let params1 = useLocation();
  const renderMenu = () => {
    if (params1['pathname'].includes('/cart') || params1['pathname'].includes('/wish-list')) {
      return null;
    } else {
      if (params1['pathname'].includes('/account') ||
        params1['pathname'].includes('/my-product') ||
        params1['pathname'].includes('/create-product') ||
        params1['pathname'].includes('/edit-product/')) {
        return <MenuAc />
      } else {
        return <MenuLeft />
      }
    }

  }
  // const getQty = (data) => {
  //   setCartCount(data)
  //   localStorage.setItem('totalQty', data);
  // }

  // const getLike = (data) =>{
  //   setWishlist(data)
  //   localStorage.setItem('totalLike',data)
  //   console.log(data);
  // }
  return (
    <>
      {/* <CartContext.Provider value={{
        cartCount:cartCount,
        getQty:getQty,
        wishlistC:wishlistC,
        getLike:getLike
        
        }}> */}
        <Provider store={store} >
        <Header />
        <Slide />
        <section>
          <div className='container'>
            <div className='row'>
              {renderMenu()}
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
        </Provider>
        
      {/* </CartContext.Provider> */}
    </>






  );
}

export default App;
