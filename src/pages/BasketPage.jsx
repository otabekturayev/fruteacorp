import React from "react";
import ProductSwiper from "../components/products/ProductSwiper";
import BasketMain from "../components/basket/BasketMain";
import { useTranslation } from "react-i18next";
import { useFetch } from "../hooks/useFetch";
import { getRandomElements } from "../hooks/getRandomItems";

const BasketPage = () => {
  const {t} = useTranslation()
  const {data, loading} = useFetch("/products/most-sold")
  return (
    <div>
      <div className="container">
        <BasketMain/>
        <ProductSwiper title={t("home.popular")} data={data} loading={loading}/>
      </div>
    </div>
  );
};

export default BasketPage;
