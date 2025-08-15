import React, { useEffect } from "react";
import NotFoundData from "./NotFoundData";
import BasketProduct from "./BasketProduct";
import { useStore } from "../../store/store";

const BasketMain = () => {
  const { cart, getCart, loading } = useStore();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="w-full h-[400px] flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : cart?.items?.length > 0 ? (
        <BasketProduct data={cart?.items} />
      ) : (
        <NotFoundData />
      )}
    </div>
  );
};

export default BasketMain;
