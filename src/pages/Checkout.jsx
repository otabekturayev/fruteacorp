import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import ModalMap from "../components/checkout/ModalMap";
import { useStore } from "../store/store";
import paymeImg from "../assets/payme.png";
import click from "../assets/click.png";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "../../axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import tg from "../assets/icons/social-media/telegram.svg";
import whatsap from "../assets/icons/social-media/whatsap.svg";

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(true);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const { cart, getCart, user, loading } = useStore();
  const [promo, setPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [addressId, setAddressId] = useState(null);
  const [promoId, setPromoId] = useState(null);
  const [promoAmount, setPromoAmount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("payme");
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [area, setArea] = useState(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    getCart();
  }, [getCart]);
  const handlePaymentChange = (e) => setSelectedPayment(e.target.value);
  const handleImageLoad = () => setImageLoaded(true);
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
  const getPromoCode = useCallback(async () => {
    try {
      if (promo.length >= 3) {
        const response = await axios.post("/promo/validate", {
          promocode: promo.toUpperCase(),
          amount: allAmount,
        });
        if (response?.status >= 200 && response.status <= 300) {
          setPromoSuccess(t("message.promo.success"));
          setPromoError("");
        }
        setPromoId(response?.data?.data?.promo?.id);
        setPromoAmount(response?.data?.data?.promo?.discount);
      }
    } catch (error) {
      setPromoError(error.response.data.message);
      setPromoSuccess("");
      setPromoAmount(0);
    }
  }, [promo, allAmount]);

  useEffect(() => {
    getPromoCode();
  }, [promo, getPromoCode]);

  const createAdddress = async () => {
    try {
      const response = await axios.post("/address", {
        streetName: addressData?.address,
        houseEntryCode: addressData?.domofon || null,
        houseLine: addressData?.way || null,
        houseNumber: addressData?.house || null,
        houseStage: addressData?.floor || null,
        lat: String(addressData?.lat),
        long: String(addressData?.long),
        deliveryAreaId: area?.id,
      });
      if (response?.status >= 200 && response.status <= 300) {
        setAddressId(response?.data?.data?.id);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (addressData) {
      createAdddress();
    }
  }, [addressData]);
  useEffect(() => {
    if (isOpenMap) {
      setArea(null);
      setAddressData(null);
      setAddressId(null);
    }
  }, [isOpenMap]);

  const createOrder = async () => {
    try {
      if (addressId) {
        const response = await axios.post("/orders", {
          addressId: addressId,
          cartId: cart?.id,
          promoCodeId: promoId,
          deliveryInfo: addressData?.message || null,
          paymentType: selectedPayment,
        });
        if (response?.status >= 200 && response.status <= 300) {
          const paymeUrl = response?.data?.data?.paymentUrl;
          if (paymeUrl) {
            window.location.href = paymeUrl;
          }
        }
      } else {
        toast.error(t("message.address.error"));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  function isFreeDelivery(allAmount, freeDeliveryFrom) {
    if (+freeDeliveryFrom > 0 && +allAmount >= +freeDeliveryFrom) {
      return true; // Yetkazib berish bepul
    }
    return false; // Yetkazib berish pullik
  }
  if (loading) {
    return (
      <div className="w-full h-[75vh] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
      <div
        className={`${
          isOpenMap ? "block" : "hidden"
        } fixed z-[9999] top-0 w-full`}
      >
        <ModalMap
          setAddressData={setAddressData}
          setIsOpenMap={setIsOpenMap}
          isOpenMap={isOpenMap}
          area={area}
          setArea={setArea}
        />
      </div>
      <div className="container">
        <h2 className="text-[24px] font-semibold mb-[15px]">
          {t("checkout.title")}
        </h2>
        <div className="flex gap-[20px] lg:flex-row flex-col">
          <div className="lg:w-[70%] w-[100%]">
            <div className="border border-custom-green-400 rounded-[10px] px-[20px] py-[16px] mb-[15px]">
              <h3 className="sm:text-[20px] text-[16px] font-semibold mb-[15px]">
                {t("checkout.order-user")}
              </h3>
              <div className="flex gap-[10px] mb-[15px] lg:flex-row flex-col">
                <div className="flex flex-col gap-[5px]">
                  <label htmlFor="lastName" className="text-[14px]">
                    {t("checkout.lastName")} <span>*</span>
                  </label>
                  <input
                    className="p-[10px] border border-custom-green-400 rounded-[10px] text-[14px] lg:w-[208px] w-full focus:outline-[0]"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={user?.data?.lastName}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label htmlFor="firstName" className="text-[14px]">
                    {t("checkout.firstName")} <span>*</span>
                  </label>
                  <input
                    className="p-[10px] border border-custom-green-400 rounded-[10px] text-[14px] lg:w-[208px] w-full focus:outline-[0]"
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={user?.data?.firstName}
                    readOnly
                  />
                </div>
              </div>
              <p className="max-w-[550px] text-[14px] text-custom-gray-300 mb-[15px]">
                {t("checkout.delivery-info")}
              </p>
              <div className="flex flex-col gap-[5px] mb-[15px]">
                <label htmlFor="lastName" className="text-[14px]">
                  {t("checkout.phone")} <span>*</span>
                </label>
                <div className="p-[10px] border border-custom-green-400 rounded-[10px] text-[14px] lg:w-[208px] w-full flex gap-[3px]">
                  <input
                    className="focus:outline-[0] bg-transparent "
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={user?.data?.phone}
                    readOnly
                  />
                </div>
              </div>
              <p className="max-w-[550px] text-[14px] text-red-500 mb-[15px]">
                {t("checkout.bts")}{" "}
               <div className="flex gap-2 mt-1"> <a target="_blank" href="https://t.me/fruteacorp">
                  <img src={tg} className="w-8 h-8" />
                </a>{" "}
                <a
                  target="_blank"
                  href="https://wa.me/998998835888"
                >
                  <img src={whatsap} alt="whatsap icon" className="w-8 h-8"/>
                </a></div>
              </p>
              <div>
                <h3 className="sm:text-[20px] text-[16px] font-semibold mb-[5px]">
                  {t("checkout.address")}
                </h3>
                <p className="mb-[15px] max-w-[400px]">
                  {addressData
                    ? addressData?.address
                    : t("checkout.choose-address")}
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpenMap(true)}
                  className=" transition-all duration-300 bg-custom-green-400 hover:bg-custom-green-600 hover:text-[#fff] rounded-[10px] font-medium lg:w-[300px] w-full py-[8px] text-[14px] "
                >
                  {addressData ? t("checkout.edit") : t("checkout.choose")}
                </button>
              </div>
            </div>
            <div className="border border-custom-green-400 rounded-[10px] px-[20px] py-[16px] mb-[15px]">
              <h3
                className="cursor-pointer w-full flex justify-between items-center sm:text-[20px] text-[16px] font-semibold "
                onClick={() => setIsOpenProduct(!isOpenProduct)}
              >
                {t("checkout.delivery-duration")}
                <span>
                  {isOpenProduct ? (
                    <GoChevronUp className="ml-2" />
                  ) : (
                    <GoChevronDown className="ml-2" />
                  )}
                </span>
              </h3>
              <ul className={`${isOpenProduct ? "block" : "hidden"}`}>
                {cart?.items?.map((product) => (
                  <li
                    key={product?.id}
                    className="border-t border-custom-green-400 pt-[16px] mt-[16px] flex gap-[10px]"
                  >
                    <div className="sm:h-[80px] sm:w-[80px] w-[52px] h-[52px] flex justify-center items-center">
                      {!imageLoaded && (
                        <Skeleton className="rounded-md sm:h-[80px] sm:w-[80px] w-[52px] h-[52px]" />
                      )}
                      <img
                        src={`http://170.64.234.64:6262/images/${product?.Product?.images[0]?.image?.name}`}
                        alt="product photo"
                        className={`h-full ${imageLoaded ? "block" : "hidden"}`}
                        onLoad={handleImageLoad}
                      />
                    </div>
                    <div className="w-[90%]">
                      <div className="sm:mb-[10px] mb-[3px] sm:text-[16px] text-[14px]">
                        {i18n.language === "uz"
                          ? product?.Product?.title_uz
                          : i18n.language === "ru"
                          ? product?.Product?.title_ru
                          : product?.Product?.title_en}
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="sm:text-[14px] text-[11px] flex gap-x-[100px] sm:flex-row flex-col">
                          <div>
                            <span className="text-custom-gray-600">
                              {t("checkout.buy")}:{" "}
                            </span>
                            {t("checkout.buy-user")}
                          </div>
                          <div>
                            <span className="text-custom-gray-600">
                              {t("checkout.count")}:{" "}
                            </span>
                            {product?.quantity} {t("checkout.pcs")}
                          </div>
                        </div>
                        <div>
                          {product?.Product?.discountStatus === "active" ? (
                            <div>
                              <div className="text-custom-gray-300 line-through">
                                {product?.quantity * product?.Product?.amount}
                              </div>
                              <div className="sm:text-[20px] text-[14px] font-medium">
                                {product?.quantity *
                                  (product?.Product?.amount -
                                    product?.Product?.discountAmount)}{" "}
                                {t("checkout.usd")}
                              </div>
                            </div>
                          ) : (
                            <div className="sm:text-[20px] text-[14px] font-medium">
                              {product?.quantity * product?.Product?.amount}{" "}
                              {t("checkout.usd")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-custom-green-400 rounded-[10px] px-[20px] py-[16px] ">
              <h3 className="sm:text-[20px] text-[16px] font-semibold mb-[16px]">
                {t("checkout.payment-type")}
              </h3>
              <div className="flex flex-col gap-[15px]">
                <label className="p-[16px] bg-custom-green-400 rounded-[10px] flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payme"
                    className="w-[20px] h-[20px]"
                    value="payme"
                    checked={selectedPayment === "payme"}
                    onChange={handlePaymentChange}
                  />
                  <span className="ml-[15px] text-[14px] flex items-center gap-[5px]">
                    <span>
                      <img
                        className="h-[14px] w-auto"
                        src={paymeImg}
                        alt="payme photo"
                      />
                    </span>
                    {t("checkout.payme")}
                  </span>
                </label>
                <label className="p-[16px] bg-custom-green-400 rounded-[10px] flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payme"
                    className="h-[20px] w-[20px]"
                    value="click"
                    checked={selectedPayment === "click"}
                    onChange={handlePaymentChange}
                  />
                  <span className="text-[14px] ml-[15px] flex items-center gap-[5px]">
                    <span>
                      <img
                        className="h-[20px] w-auto"
                        src={click}
                        alt="click photo"
                      />
                    </span>
                    Click orqali
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="border border-custom-green-400 rounded-[10px] px-[20px] py-[16px] w-[100%] lg:w-[320px] h-[max-content]">
            <div className="flex justify-between items-center mb-[15px]">
              <h4 className="text-[20px] font-medium">
                {t("checkout.your-order")}
              </h4>
              <button
                className="underline text-[14px] text-custom-gray-600 hover:text-custom-gray-800"
                onClick={() => navigate("/cart")}
              >
                {t("checkout.change-basket")}
              </button>
            </div>
            <div className="flex flex-col gap-[5px] text-[12px] mb-[15px]">
              <div className="flex justify-between">
                <div>
                  {t("checkout.products")} <span>({productCount})</span>:
                </div>
                <div>
                  {allAmount} {t("checkout.usd")}
                </div>
              </div>
              <div className="flex justify-between">
                <div>{t("checkout.delivery")}:</div>
                <div>
                  {area
                    ? area?.freeDelivery
                      ? t("checkout.free")
                      : isFreeDelivery(allAmount, area.freeDeliveryFrom)
                      ? t("checkout.free")
                      : area.deliveryPrice
                    : t("checkout.free")}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-[15px]">
              <div className="text-[12px]">{t("checkout.all")}:</div>
              <div className="text-[18px] font-medium">
                {allAmount -
                  Number(((allAmount * promoAmount) / 100).toFixed(0)) +
                  ((area?.freeDelivery
                    ? 0
                    : isFreeDelivery(allAmount, +area?.freeDeliveryFrom)
                    ? 0
                    : Number(area?.deliveryPrice)) || 0)}{" "}
                {t("checkout.usd")}
              </div>
            </div>
            <div className="bg-custom-green-200 p-[12px] rounded-[12px] mb-[15px]">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex items-center gap-[5px] text-[14px] text-custom-gray-500 "
              >
                <span>
                  {isOpen ? (
                    <GoChevronUp className="ml-2" />
                  ) : (
                    <GoChevronDown className="ml-2" />
                  )}
                </span>
                {t("checkout.promocode")}
              </div>
              <div className={`${isOpen ? "block" : "hidden"}`}>
                <input
                  type="text"
                  name="promokod"
                  id="promokod"
                  value={promo}
                  maxLength={20}
                  onChange={(e) =>
                    setPromo(e.target.value.trim().toUpperCase())
                  }
                  placeholder={t("checkout.promo-input")}
                  className={`w-full focus:outline-none mb-[3px] py-[8px] px-[10px] text-[14px] placeholder:uppercase border border-custom-green-600 rounded-[10px] mt-[15px] `}
                />
                <p className="text-[12px] text-red-600">{promoError}</p>
                <p className="text-[12px] text-custom-gray-500">
                  {promoSuccess}
                </p>
              </div>
            </div>
            <button
              onClick={createOrder}
              className="rounded-[10px] bg-custom-green-600 text-[#fff] w-full py-[8px]"
            >
              {t("checkout.order-btn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
