import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../store/store";
import { useTranslation } from "react-i18next";
import { GrNext } from "react-icons/gr";
import Comment from "./Comment";
import { getUserData } from "../../hooks/getUserData";
import { t } from "i18next";

const AllComp = () => {
  const { t } = useTranslation();
  return (
    <div className="py-10 max-w-[431px] text-center flex flex-col items-center justify-center">
      <h2 className="text-[36px] text-custom-gray-800 font-bold mb-4">
        {t("orders.dont-any")}
      </h2>
      <p className="text-custom-gray-800 text-[16px] font-medium mb-4 text-center">
        {t("orders.dont-any-1")}
      </p>
      <Link
        to={"/products"}
        className="flex w-[50%] justify-center items-center transition bg-custom-green-600 hover:opacity-85 text-white text-[16px] font-medium min-h-[48px] py-[10px] px-[18px] rounded-lg mb-2"
      >
        {t("orders.start-buy")}
      </Link>
      <Link
        to={"/"}
        className="flex w-[50%] justify-center items-center transition bg-transparent hover:bg-custom-green-200 hover:text-custom-gray-800 text-custom-gray-600 text-[16px] font-medium min-h-[48px] py-[10px] px-[18px] rounded-lg"
      >
        {t("orders.back-home")}
      </Link>
    </div>
  );
};

const Orders = ({ address, status, id, products, orderId }) => {
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [productId, setProductId] = useState(null);
  const { t, i18n } = useTranslation();
  const toggleProduct = () => setIsOpenProduct(!isOpenProduct);
  const openCommentModal = (id) => {
    setIsOpenComment(true);
    setProductId(id);
  };
  const closeCommentModal = () => setIsOpenComment(false);
const statusMessage =
status === "created"
  ? t("order-delivery.created")
  : status === "delivered"
  ? t("order-delivery.delivered")
  : status === "cancelled"
  ? t("order-delivery.cancelled")
  : status === "paid"
  ? t("order-delivery.paid")
  : t("order-delivery.on-way");
  return (
    <div className="w-full border rounded-[5px] border-custom-green-400">
      {isOpenComment && (
        <Comment
          closeModal={closeCommentModal}
          productId={productId}
          orderId={id}
        ></Comment>
      )}
      <h2 className="w-full text-[18px] text-custom-gray-600 text-left border-b border-custom-green-400 px-8 py-4 font-medium">
        {t("orders.order-id")}: {orderId}
      </h2>
      <div className="px-8 ">
        <ul className="flex flex-col gap-y-2 py-4">
          <li className="flex gap-x-2 font-inter text-[14px] font-normal">
            <div className="min-w-[128px] max-w-[128px] text-custom-gray-600">
              {t("orders.status")}:
            </div>
            <div className="text-custom-gray-800">
              <span className={`py-1 px-4 sm:px-2 ${status === "cancelled" ? 'bg-red-300' : "bg-custom-green-200"} rounded-full flex text-center`}>
                {statusMessage}
              </span>
            </div>
          </li>
          <li className="flex gap-x-2 font-inter text-[14px] font-normal">
            <div className="min-w-[128px] max-w-[128px] text-custom-gray-600">
              {t("orders.address")}:
            </div>
            <div className="text-custom-gray-800">{address}</div>
          </li>
        </ul>
      </div>
      <div className="px-8 py-4 border-t border-custom-green-400">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={toggleProduct}
        >
          <div>
            {products?.length} {t("orders.product.title")}
          </div>{" "}
          <div className={`${isOpenProduct ? "rotate-180" : "rotate-0"}`}>
            <GrNext className="rotate-90" />
          </div>{" "}
        </div>
        <ul className={`${isOpenProduct ? "block" : "hidden"}`}>
          {products?.map((product) => {
            return (
              <li
                key={product?.productId}
                className="border-t mt-[10px] pt-[10px] border-custom-green-400 flex gap-4"
              >
                {product?.Product && <div className="min-w-[75px] max-w-[75px] h-[100px] rounded-lg overflow-hidden">
                  <img
                    className="h-full w-full object-contain"
                    src={`https://api.fruteacorp.uz/images/${product?.Product?.images[0]?.image?.name}`}
                    alt={
                      i18n.language === "uz"
                        ? product?.title_uz
                        : i18n.language === "ru" ? product?.title_ru : product?.title_en
                    }
                  />
                </div>}
                <div className="flex flex-col w-full">
                  <div>
                    {t("orders.product.name")}:{" "}
                    {i18n.language === "uz"
                        ? product?.title_uz
                        : i18n.language === "ru" ? product?.title_ru : product?.title_en}
                  </div>
                  <div>
                    {t("orders.product.count")}: {product?.quantity}
                  </div>
                  <div>
                    {t("orders.product.amount")}:{" "}
                    {product?.amount * product?.quantity}
                  </div>
                  {product?.Product?.Reviews?.length === 0 && status === "delivered" && (
                    <button
                      onClick={() => openCommentModal(product?.productId)}
                      className="self-end text-custom-green-600 hover:text-custom-green-500"
                    >
                      {t("orders.product.commit-send")}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const AllOrder = () => {
  const { user } = useStore();
  const [visibleOrders, setVisibleOrders] = useState(5);

  useEffect(() => {
    const accessToken = user?.token;
    const refreshToken = user?.refreshToken;
    getUserData(accessToken, refreshToken);
  }, []);

  const handleShowMore = () => {
    setVisibleOrders((prev) => prev + 5);
  };

  const hasMoreOrders = visibleOrders <= user?.data?.orders?.length;

  return user?.data?.orders?.length > 0 ? (
    <div className="flex flex-col gap-[5px]">
      {user.data.orders.slice(0, visibleOrders).map((item) => (
        <Orders
          key={item?.id}
          address={item?.Address?.streetName}
          status={item?.status}
          id={item?.id}
          products={item?.items}
          orderId={item?.orderNumber}
        />
      ))}
      {hasMoreOrders && (
        <div className="flex justify-center mt-[20px]">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-custom-green-600 text-white rounded"
          >
            {t("product-info.show-more")}
          </button>
        </div>
      )}
      {/* {hasMoreOrders ? (
        <div className="flex justify-center mt-[20px]">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-custom-green-600 text-white rounded"
          >
            {t("product-info.show-more")}
          </button>
        </div>
      ) : (
        <div className="flex justify-center mt-[20px]">
          <button
            onClick={() => setVisibleOrders(5)}
            className="px-4 py-2 bg-custom-green-600 text-white rounded"
          >
            {t("product-info.no-show")}
          </button>
        </div>
      )} */}
    </div>
  ) : (
    <div className="flex items-center justify-center">
      {" "}
      <AllComp />{" "}
    </div>
  );
};

export default AllOrder;
