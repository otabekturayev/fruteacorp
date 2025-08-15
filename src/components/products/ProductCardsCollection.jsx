import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link} from "react-router-dom";
import { useFetchInfinite } from "../../hooks/useFetchInfinite";
import { useTranslation } from "react-i18next";

function ProductCardsCollection({ title, modal = false, className = "" }) {
  const {t} = useTranslation()
  const initialCount =
    window.innerWidth < 1280 ? (window.innerWidth < 768 ? 6 : 8) : 10;
  const [limit, setLimit] = useState(initialCount);

  useEffect(() => {
    setLimit(initialCount);
  }, [initialCount]);

  const { data, loading, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite(
    `/products`,
    limit
  );

  const showMoreProducts = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <section className={`${className || "mt-5 md:mt-8 xl:mt-16"}`}>
      <div className="container">
        <h2 className="text-[20px] md:text-[24px] xl:text-[28px] capitalize font-semibold font-inter mb-5">
          <Link to={"/products"}>{title}</Link>
        </h2>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3  ${
            modal
              ? "xl:grid-cols-3 md:grid-cols-3 gap-y-1 gap-x-1"
              : "xl:grid-cols-5 md:grid-cols-4 gap-y-4 gap-x-4"
          }  mb-10`}
        >
          {loading
            ? Array(limit)
                .fill(null)
                .map((_, index) => <ProductCard key={index} product={null} />)
            : data?.map((elem) => {
                return (
                  <ProductCard
                    key={elem?.id}
                    product={elem}
                    loading={loading}
                  />
                );
              })}
        </div>
        { isFetching &&
          <div className="w-full flex justify-center h-[150px] items-center">
            <div className="loader"></div>
          </div>
        }

        {
         hasNextPage && <div className="flex justify-center">
            <button
              onClick={showMoreProducts}
              className="rounded-[8px] text-custom-gray-800 font-inter font-semibold py-[7px] px-[40px] transition bg-custom-green-400 hover:bg-custom-green-600 hover:text-white"
            >
              {t("product-info.show-more")}
            </button>
          </div>
        }
      </div>
    </section>
  );
}

export default ProductCardsCollection;
