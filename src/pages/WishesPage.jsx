import React, { useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import NotLikeProduct from "../components/NotLikeProduct";
import ProductSwiper from "../components/products/ProductSwiper";
import { useStore } from "../store/store";
import { useTranslation } from "react-i18next";
import { useFetch } from "../hooks/useFetch";
import { getRandomElements } from "../hooks/getRandomItems";

const WishesPage = () => {
  const { wishlist, getWish, loading } = useStore();

  const {data, loading: fetchLoading} = useFetch("/products?limit=50")

  useEffect(() => {
    getWish(); 
  }, []); 
  
  const { t } = useTranslation()

  return (
    <div className="pt-10">
      <div className="container">
        <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-custom-gray-800 capitalize font-semibold font-inter mb-5 border-b pb-2">
          {t("wishes.title")}
        </h2>
        {loading ? <div className="w-full h-[400px] flex justify-center items-center"><div className="loader"></div></div> : wishlist[0]?.products?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-x-5 gap-y-10 mb-10">
            {wishlist[0]?.products?.map((product) => (
              <ProductCard key={product?.Product?.id} product={product?.Product} />
            ))}
          </div>
        ) : (
          <NotLikeProduct />
        )}

        <ProductSwiper title={t("home.other")} data={getRandomElements(data)} loading={fetchLoading} />
      </div>
    </div>
  );
};

export default WishesPage;
