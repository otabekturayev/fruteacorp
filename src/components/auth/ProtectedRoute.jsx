import { Navigate } from "react-router-dom";
import { useStore } from "../../store/store";

export const ProtectedRouteUser = ({ children }) => {
  const { auth, user} = useStore((state) => state); 

  const token = user?.token;

  if (!auth || !token ) {
    // If auth is false or no token, redirect the user to the home or login page
    return <Navigate to="/" replace />;
  }

  // If auth and token exist, render the children components (e.g., UserOrder)
  return children;
};

export const ProtectedRouteCart = ({ children }) => {
  const { cart } = useStore(); 

  const isCart = cart?.items?.length > 0

  if (!isCart) {
    return <Navigate to="/" replace />;
  }

  return children;
};

