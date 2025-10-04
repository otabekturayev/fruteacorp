import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductSwiper from "../components/products/ProductSwiper";
import ProductInfoSwiper from "../components/productInfo/ProductInfoSwiper";
import { IoStar } from "react-icons/io5";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import TabButton from "../components/productInfo/TabButton";
import CommentList from "../components/productInfo/CommnetList";
import { useStore } from "../store/store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { isVisable } from "../components/auth/showModal";
import Breadcrumb from "../components/BreadCrumb";

const ProductInfoPage = () => {
  const { productId } = useParams();
  const { t, i18n } = useTranslation();
  const {
    cart,
    setCart,
    showModalAddCard,
    onChangeIsOpenModalAuth,
    setCartLoading
  } = useStore();
  const { data, loading: productLoading } = useFetch(`/products/${productId}`);
  const { data: mostData, loading: mostLoading } = useFetch(
    "/products/most-sold"
  );
  const [tab, setTab] = useState("info");
  const [count, setCount] = useState(1);
  const { pathname } = useLocation();
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);

  useEffect(() => {
    if (data?.category) {
      const generateBreadcrumbs = (category) => {
        let breadcrumbs = [];
        let currentCategory = category;

        // Kategoriyani to'g'ri tartibda olish
        while (currentCategory) {
          breadcrumbs.unshift({
            label:
              i18n.language === "uz"
                ? currentCategory?.title_uz
                : currentCategory?.title_ru,
            to: `/products/categoryId=${currentCategory?.id}`, // URLni moslashtiring
          });
          currentCategory = currentCategory?.parent; // keyingi parentga o'tish
        }

        return breadcrumbs;
      };

      const newBreadcrumb = [
        {
          label:
            i18n.language === "uz"
              ? "Bosh sahifa"
              : i18n.language === "ru"
              ? "Главная страница"
              : "Home",
          to: "/",
        },
        {
          label:
            i18n.language === "uz"
              ? "Turkumlar"
              : i18n.language === "ru"
              ? "Категории"
              : "Categories",
          to: "/products",
        },
        ...generateBreadcrumbs(data?.category),
        {
          label:
            i18n.language === "uz"
              ? data?.title_uz
              : i18n.language === "ru"
              ? data?.title_ru
              : data?.title_en,
        },
      ];

      setBreadCrumbItems(newBreadcrumb);
    }
  }, [data, i18n.language]);
  

  const isInCart = () => {
    return cart?.items?.some(item => {
      return item?.productId === data?.id && item?.quantity == item?.Product?.inStock;
    });
  };

  // console.log(isInCart);
  
  // const addProductBasket = useCallback(() => {
  //   const token = JSON.parse(localStorage.getItem("user-store"))?.state?.user
  //     ?.token;
  //   if (!token) return isVisable("login", onChangeIsOpenModalAuth);

  //   if (data?.inStock < 1) return toast.error(t("message.product-card.product-dont-have"));
  //   if (isInCart) return toast.info(t("message.product-card.product-have-in-cart"));

  //   showModalAddCard({ isOpen: true, product: data });
  //   setCart(data, count);
  // }, [
  //   data,
  //   count,
  //   // isInCart,
  //   showModalAddCard,
  //   setCart,
  //   onChangeIsOpenModalAuth,
  // ]);

  const addProductBasket = () => {
    const token = JSON.parse(localStorage.getItem("user-store"))?.state?.user
      ?.token;
      if (data?.inStock <= 0) {
        return toast.error(t("message.product-card.product-dont-have"));
      }
    if (!token) {
      isVisable("login", onChangeIsOpenModalAuth);
    } else {
      if (isInCart()) {
        return toast.error(t("message.product-card.product-dont-have"));
      }

      showModalAddCard({ isOpen: true, product: data });
      setCart(data, count);
    }
  };

  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));
  const handleIncrease = () => {
    if (data?.inStock > 0 && count < data?.inStock) setCount(count + 1);
  };

  const handleCountChange = (e) => {
    const value = Number(e.target.value);
    if (value > data?.inStock) {
      setCount(data?.inStock);
    } else {
      setCount(e.target.value);
    }
  };

  const handleBlurCount = () => {
    if (!count) setCount(1);
  };

  const handleTabChange = (tab) => setTab(tab);

  useEffect(() => {
    setCount(1);
  }, [pathname]);

  if (productLoading) {
    return (
      <div className="container h-[80vh] flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-[20px]">
        <Breadcrumb items={breadCrumbItems} />
      </div>
      <section className="flex xl:gap-[70px] lg:gap-[50px] gap-[30px] mb-[25px] md:flex-row flex-col border-b pb-[30px] border-custom-green-400">
        <ProductInfoSwiper images={data?.images} />
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-[10px]">
              <div className="flex items-center gap-[4px]">
                <IoStar className="text-[#ffb54c]" />
                <span>{Math.round(data?.rating?.rate) || 5}</span>{" "}
                <span className="lowercase">
                  ( {data?.Reviews?.length} {t("product-info.comment")})
                </span>
              </div>
              <div>
                {data?.sold} {t("product-info.sold")}
              </div>
            </div>
          </div>

          <div className="border-b border-custom-green-400 pb-[20px] mb-[30px]">
            <h1 className="text-[22px] font-normal leading-[28px] mt-[10px]">
              {i18n.language === "uz" ? data?.title_uz : i18n.language === "ru" ? data?.title_ru : data?.title_en}
            </h1>
            <div className="flex justify-between max-w-[300px] mt-[15px]">
              <span className="text-[14px]">{t("product-info.shop")}</span>
              <span className="text-[14px] underline">
                {t("product-info.shop-user")}
              </span>
            </div>
          </div>

          <div className="mb-[25px]">
            <div className="text-[14px] mb-[10px]">
              {t("product-info.count")}:
            </div>
            <div className="flex gap-[10px] items-center">
              <div className="p-[7px] flex items-center gap-[20px] border border-custom-green-400 rounded-[4px]">
                <LuMinus
                  onClick={handleDecrease}
                  className="text-[25px] cursor-pointer"
                />
                <input
                  type="number"
                  onChange={handleCountChange}
                  onBlur={handleBlurCount}
                  value={count}
                  className="focus:outline-none w-auto"
                  style={{ width: `${count.toString().length}ch` }}
                />
                <LuPlus
                  onClick={handleIncrease}
                  className="text-[25px] cursor-pointer"
                />
              </div>
              {data?.inStock > 0 ? (
                <span className="text-[#00ad3a] text-[14px]">
                  {t("product-info.buy")} {data?.inStock}{" "}
                  {t("product-info.have-buy")}
                </span>
              ) : (
                <span className="text-red-600 text-[14px]">
                  {t("product-info.dont-buy")}
                </span>
              )}
            </div>
          </div>

          <div className="mb-[25px]">
            <div className="text-[14px] mb-[5px]">
              {t("product-info.price")}:
            </div>
            {data?.discountStatus === "active" ? (
              <div className="text-[20px] font-medium">
                {(data?.amount - data?.discountAmount) * count}{" "}
                {t("product-info.usd")}
                <span className="line-through text-[14px] text-[#7e818c] ml-[15px]">
                  {data?.amount * count} {t("product-info.usd")}
                </span>
              </div>
            ) : (
              <div className="text-[20px] font-medium">
                {data?.amount * count} {t("product-info.usd")}
              </div>
            )}
          </div>

          <div className="flex gap-[10px] mb-[25px]">
            <button
              onClick={addProductBasket}
              className="w-full bg-custom-green-600 rounded-[10px] text-white py-[15px] font-medium disabled:opacity-[0.5] disabled:cursor-wait"
              disabled={setCartLoading}
            >
              {t("product-info.add-basket")}
            </button>
          </div>

          {/* <div className="mb-[25px]">
            <div className="text-[14px] mb-[5px]">
              {t("product-info.short-info")}
            </div>
            <ul
              className="list-disc ml-[15px] text-[14px] text-[#1f2026] opacity-[0.87]"
              dangerouslySetInnerHTML={{
                __html:
                  i18n.language === "uz" ? data?.description_uz?.replace(/<\/?ul[^>]*>/g, "") : i18n.language === "ru" ? data?.description_ru?.replace(/<\/?ul[^>]*>/g, "") : data?.description_en?.replace(/<\/?ul[^>]*>/g, ""),
              }}
            />
          </div> */}
        </div>
      </section>

      <section>
        <div className="border-b w-full pb-[25px] border-custom-green-400">
          <div className="max-w-[860px] mx-auto flex gap-[50px] text-[14px]">
            <TabButton
              label={t("product-info.product-info")}
              active={tab === "info"}
              onClick={() => handleTabChange("info")}
            />
            <TabButton
              label={`${t("product-info.comment")} (${data?.Reviews?.length})`}
              active={tab === "comment"}
              onClick={() => handleTabChange("comment")}
            />
          </div>
        </div>
        <div className="max-w-[860px] mx-auto mb-[50px]">
          {tab === "info" ? (
            <div className="mt-[30px]">
              <p className="text-[14px]">
                {i18n.language === "uz" ? data?.extraInfoUz : i18n.language === "ru" ? data?.extraInfoRu : data?.extraInfoEn}
              </p>
            </div>
          ) : (
            <CommentList comments={data?.Reviews} />
          )}
        </div>
      </section>

      <ProductSwiper
        title={t("home.popular")}
        data={mostData}
        loading={mostLoading}
      />
    </div>
  );
};

export default ProductInfoPage;
