import React from "react";
import { Link } from "react-router-dom";
import notLikeProduct from "../assets/images/like-product.png"
import { useTranslation } from "react-i18next";
import { useStore } from "../store/store";

const NotLikeProduct = () => {

  const {user} = useStore()
 
  const { t } = useTranslation()
   
  return (
    <div className="w-full flex justify-center flex-col items-center mb-20">
      <div className="max-w-[300px] mb-6">
        <img src={notLikeProduct} alt="not liked product" />
      </div>
      <h3 className="font-inter text-[1.375rem] font-semibold mb-4">
        {t("wishes.choose-like")}
      </h3>
      <p className="font-inter text-[0.8rem] font-normal mb-4">
      {t("wishes.click-like")}
      </p>
      <Link
        to={"/"}
        className="bg-green-600 rounded-[4px] hover:opacity-85 transition text-white font-inter text-[0.875rem] font-medium py-[7px] px-[14px]"
      >
        {user ? t("basket.home") : t("wishes.login-user")}
      </Link>
    </div>
  );
};

export default NotLikeProduct;
