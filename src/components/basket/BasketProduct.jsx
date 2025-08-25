import React, { useMemo, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BasketProduct = ({ data }) => {
  const {
    setAddProductCount,
    setDeleteProductCount,
    setDeleteProductCart,
    cart,
  } = useStore();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t, i18n } = useTranslation();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const totalAmount = useMemo(() => {
    return cart?.items?.reduce(
      (total, product) => total + product?.Product?.amount * product?.quantity,
      0
    );
  }, [cart]);

  const productCount = useMemo(() => {
    return cart?.items?.reduce(
      (total, product) => total + product?.quantity,
      0
    );
  }, [cart]);

  const allAmount = useMemo(() => {
    return cart?.items?.reduce((total, product) => {
      const productTotal =
        product?.Product?.discountStatus === "active"
          ? (product?.Product?.amount - product?.Product?.discountAmount) *
            product?.quantity
          : product?.Product?.amount * product?.quantity;
      return total + productTotal;
    }, 0);
  }, [cart]);

  const deleteProduct = (id, count) => {
    setDeleteProductCart(id, count);
  };

  const handleChangeProductCount = (id, isAdding) => {
    if (isAdding) {
      setAddProductCount(id);
    } else {
      setDeleteProductCount(id);
    }
  };


  return (
    <>
      <h2 className="my-8 text-[24px] font-medium font-inter text-custom-gray-800">
        {t("basket.title")},
        <span className="text-custom-gray-500">
          {" "}
          {data?.length} {t("basket.product")}
        </span>
      </h2>
      <div className="xl:flex gap-x-5 gap-y-5 mb-10">
        <div className="border border-custom-green-400 rounded-[8px] p-4 w-full xl:mb-0 mb-5">
          <div>
            <div className="flex gap-y-3 justify-end pb-4">
              <div className="flex items-center gap-x-5 text-[0.75rem] flex-wrap gap-y-2 font-medium text-custom-gray-500">
                {t("basket.delivery-duration")}
              </div>
            </div>
          </div>
          {data &&
            data?.map((elem) => {
              return (
                <article
                  key={elem?.productId}
                  className="border-t border-custom-green-400 py-4 flex flex-col gap-y-5"
                >
                  <div className="flex gap-x-4">
                    <div className="cursor-pointer flex items-center gap-x-2 text-[14px]  text-custom-gray-800 font-normal select-none">
                      <div className="w-[120px] h-[160px]">
                        {!imageLoaded && (
                          <Skeleton
                            height={160}
                            width={120}
                            className="rounded-md"
                          />
                        )}
                        <img
                          src={`https://api.fruteacorp.uz/images/${elem?.Product?.images[0]?.image?.name}`}
                          alt="product img"
                          className={`rounded-md w-full h-full object-contain ${
                            imageLoaded ? "block" : "hidden"
                          }`}
                          onLoad={handleImageLoad}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between w-full">
                      <div className="sm:text-[1rem] text-custom-gray-800 font-inter flex items-start justify-between gap-x-5">
                        <div>
                          {i18n.language === "uz"
                            ? elem?.Product?.title_uz
                            : i18n.language === "ru"
                            ? elem?.Product?.title_ru
                            : elem?.Product?.title_en}
                        </div>
                        <div
                          onClick={() =>
                            deleteProduct(elem?.productId, elem?.quantity)
                          }
                          className="hidden md:flex items-center h-max min-w-max gap-x-2 text-[0.85rem] transition cursor-pointer text-custom-gray-600 hover:text-custom-gray-800"
                        >
                          <span className="text-xl">
                            <MdDeleteOutline />
                          </span>{" "}
                          {t("basket.delete-product")}
                        </div>
                      </div>

                      <div className="flex justify-between items-center gap-x-10 font-inter">
                        <div className="h-[40px] hidden md:flex items-center justify-between rounded-[5px] border border-custom-green-400 w-[120px] text-[16px] text-custom-gray-800 font-inter font-normal">
                          <button
                            onClick={() =>
                              handleChangeProductCount(elem?.productId, false)
                            }
                            className="px-2 text-[24px]"
                          >
                            -
                          </button>
                          <span>{elem?.quantity}</span>
                          <button
                            onClick={() => {
                              if (
                                elem?.Product?.inStock > 0 &&
                                elem?.quantity < elem?.Product?.inStock
                              ) {
                                handleChangeProductCount(elem?.productId, true);
                              } else {
                                toast.error(
                                  t("message.product-card.product-dont-have")
                                );
                              }
                            }}
                            className="px-2 text-[20px]"
                          >
                            +
                          </button>
                        </div>
                        {elem?.Product?.discountStatus === "active" ? (
                          <div>
                            <p className="mb-1 text-[1.25rem] font-medium">
                              {elem?.quantity *
                                (elem?.Product?.amount -
                                  elem?.Product?.discountAmount)}{" "}
                              {t("basket.usd")}
                            </p>
                            <p className="text-[0.875rem] line-through text-custom-gray-500">
                              {elem?.quantity * elem?.Product?.amount}{" "}
                              {t("basket.usd")}
                            </p>
                          </div>
                        ) : (
                          <p className="mb-1 text-[1.25rem] font-medium">
                            {elem?.quantity * elem?.Product?.amount}{" "}
                            {t("basket.usd")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center md:hidden">
                    <div className="h-[40px] flex items-center justify-between rounded-[5px]  border border-custom-green-400 w-[120px]  text-[16px] text-custom-gray-800 font-inter font-normal">
                      <button
                        onClick={() =>
                          handleChangeProductCount(elem?.productId, false)
                        }
                        className="px-2 text-[24px]"
                      >
                        -
                      </button>
                      <span>{elem?.quantity}</span>
                      <button
                        onClick={() => {
                          if (
                            elem?.Product?.inStock > 0 &&
                            elem?.quantity < elem?.Product?.inStock
                          ) {
                            handleChangeProductCount(elem?.productId, true);
                          } else {
                            toast.error(
                              t("message.product-card.product-dont-have")
                            );
                          }
                        }}
                        className="px-2 text-[20px]"
                      >
                        +
                      </button>
                    </div>

                    <div
                      onClick={() =>
                        deleteProduct(elem?.productId, elem?.quantity)
                      }
                      className="flex items-center h-max min-w-max gap-x-2 text-[0.85rem] transition cursor-pointer text-custom-gray-600 hover:text-custom-gray-800"
                    >
                      <span className="text-xl">
                        <MdDeleteOutline />
                      </span>{" "}
                      {t("basket.delete-product")}
                    </div>
                  </div>
                </article>
              );
            })}
        </div>

        <div className="p-[1.25rem] pt-[1rem] bl min-w-full h-max ss:min-w-[360px] border border-custom-green-400 rounded-[8px]">
          <h3 className="text-custom-gray-800 text-[16px] font-medium mb-[18px]">
            {t("basket.your-order")}
          </h3>
          <div className="mb-2 flex justify-between items-center text-[0.875rem] text-custom-gray-800">
            <p>
              {t("basket.products")} ({productCount}):
            </p>
            <p>
              {totalAmount} {t("basket.usd")}
            </p>
          </div>
          <div className="border border-custom-green-600 text-custom-green-600 rounded-[2px] text-[0.75rem] font-medium py-[2px] px-[6px] text-center mb-4">
            {t("basket.delivery")}
          </div>
          <div className="flex justify-between">
            <p className="text-[0.875rem] text-custom-gray-800">
              {t("basket.all")}:
            </p>{" "}
            <div>
              <span className="text-[1.25rem] font-medium ">
                {allAmount} {t("basket.usd")}
              </span>
            </div>
          </div>
          <p className="flex justify-end text-[0.75rem] text-custom-green-600 mb-4">
            {t("basket.discount")}: {totalAmount - allAmount} {t("basket.usd")}
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full text-white bg-custom-green-600 hover:opacity-85 transition rounded-[12px] text-[16px] font-inter font-medium tracking-[0.004em] px-[14px] text-center leading-5 h-[44px]"
          >
            {t("basket.order-click")}
          </button>
        </div>
      </div>
    </>
  );
};

export default BasketProduct;
