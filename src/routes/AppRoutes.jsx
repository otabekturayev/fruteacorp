import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import CategoryPage from "../pages/CategoryPage";
import BasketPage from "../pages/BasketPage";
import WishesPage from "../pages/WishesPage";
import UserPage from "../pages/user/UserPage";
import AboutPage from "../pages/AboutPage";
import Faq from "../pages/Faq";
import ProductInfoPage from "../pages/ProductInfoPage";
import ProductList from "../pages/productList/ProductList";
import Checkout from "../pages/Checkout";
import UserSetting from "../pages/user/UserSetting";
import UserOrder from "../pages/user/UserOrder";
import { Navigate } from "react-router-dom";
import ProductsItem from "../components/productList/ProductsItem";
import CategoryProduct from "../components/productList/CategoryProduct";
import {ProtectedRouteCart, ProtectedRouteUser} from "../components/auth/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/cart",
        element: <BasketPage />,
      },
      {
        path: "/wishes",
        element: <WishesPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
        children: [
          {
            index: true, 
            element: <Navigate to="/user/orders" />,  
          },
          {
            path: "/user/orders", 
            element: (
              <ProtectedRouteUser>
                <UserOrder />
              </ProtectedRouteUser>
            ),
          },
          {
            path: "/user/settings", 
            element: (
              <ProtectedRouteUser>
                <UserSetting />
              </ProtectedRouteUser>
            ),
          },
        ],
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/product_info/:productId",
        element: <ProductInfoPage />,
      },
      {
        path: "/products",
        element: <ProductList />,
        children: [
          {
            index: true, 
            element: <ProductsItem />,
          },
          {
            path: ":categoryId",  
            element: <CategoryProduct />,
          },
        ],
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRouteCart>
            <Checkout />
          </ProtectedRouteCart>
        ),
      },
    ],
  },
]);

export default router;
