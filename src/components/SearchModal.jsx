import React from "react";
import { useStore } from "../store/store";
import { useFetch } from "../hooks/useFetch";
import SearchProductCard from "./products/SearchProductCard";
import { useTranslation } from "react-i18next";

const SearchModal = () => {
  const { search } = useStore();

  const { data, loading } = useFetch(`/products?search=${search}`);

  const { t, i18n } = useTranslation()

  return (
    <div className="lg:max-h-[500px] max-h-[80vh] transition-all duration-500 border-l border-r border-b rounded-b-[4px] border-custom-green-400 scrollbar-custom overflow-y-scroll">
      {search ? (
        <div className="py-[20px] px-[15px] flex flex-col gap-[15px]">
          {
            loading ? <div className="flex justify-center items-center h-[100px]"><div className="loader"></div></div> : ( data?.length > 0 ? data?.map((product) => (
              <SearchProductCard
                key={product?.id}
                title={i18n.language === "uz" ? product?.title_uz : i18n.language === "ru" ? product?.title_ru : product?.title_en}
                id={product?.id}
                amount={product?.amount}
                discountAmount={product?.discountAmount}
                discountStatus={product?.discountStatus}
                img={product?.images?.[0]?.image?.name}
              />
            )) : <div className="h-[100px] flex items-center justify-center">{t("header.no-data")}</div>)
          }
          
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchModal;
