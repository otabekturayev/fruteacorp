import React, { useState } from "react";
import ProductCard from "../products/ProductCard";
import noDataImg from "../../assets/images/not-product.png";
import { useFetchInfinite } from "../../hooks/useFetchInfinite";
import { useTranslation } from "react-i18next";

const ProductsItem = () => {
  const {t} = useTranslation()
  const initialCount = window.innerWidth < 960 ? (window.innerWidth < 640 ? 4 : 6) : 8;
  const [limit] = useState(initialCount);

  const { data, loading, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite(
    `/products`,
    limit
  );

  const showMoreProducts = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  console.log(loading);
  

  return (
    <div className="max-w-[920px] mx-auto">
      {loading ? (
        <div className="h-[400px] flex items-center">
          <div className="loader"></div>
        </div>
      ) : data?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 pt-[10px] w-full">
          {data?.map((elem) => (
            <ProductCard key={elem?.id} product={elem} />
          ))}
        </div>
      ) : (
        <div className="max-w-[300px]">
          <img src={noDataImg} alt="not product" />
        </div>
      )}
      { isFetching &&
          <div className="w-full flex justify-center h-[150px] items-center">
            <div className="loader"></div>
          </div>
        }

        {hasNextPage && !loading && (
        <div className="flex justify-center">
          <button
            onClick={showMoreProducts}
            className="rounded-[8px] mt-4 text-custom-gray-800 font-inter font-semibold py-[7px] px-[40px] transition bg-custom-green-400 hover:bg-custom-green-600 hover:text-white"
          >
            {t("product-info.show-more")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsItem;
