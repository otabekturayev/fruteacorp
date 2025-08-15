import React, { useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import AuthModal from './components/auth/AuthModal';
import { useStore } from './store/store';
import CartModal from './components/modal/CartModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isOpenModalAuth, auth, getCart, user, getWish } = useStore();
  const { pathname } = useLocation();
  const hasTrueValue = useMemo(() => {
    if (!isOpenModalAuth || typeof isOpenModalAuth !== 'object') return false;
    return Object.values(isOpenModalAuth).some(value => value === true);
  }, [isOpenModalAuth]);
  
  useEffect(() => {
    if(!pathname?.startsWith("/products/categoryId")){
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  useEffect(() => {
    if (user) {
      getCart();
      getWish()
    }
  }, [user]);
  return (
    <div>
      <ToastContainer />
      <CartModal />
      {hasTrueValue && !auth ? <AuthModal /> : null}
      <header>
        <Navbar />
      </header>
      <main className="pt-20 sm:pt-24 lg:py-10">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
export default App;
