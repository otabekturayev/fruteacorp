import { Link, useNavigate } from "react-router-dom";
import { TbShoppingBagPlus } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { useState, useMemo } from "react";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { isVisable } from "../auth/showModal";
import CutText from "../../hooks/CutText";

function ProductCard({ product, loading }) {
  const [productData, setProductData] = useState(product);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user-store"))?.state?.user
    ?.token;
  const {
    title_uz = "Noma'lum mahsulot",
    title_ru = "Неизвестный продукт",
    title_en = "Unknown product",
    amount = 0,
    discountAmount = 0,
    discountStatus = "inactive",
    active = false,
    id = 0,
    images = [],
    inStock = 0,
    sold = 0,
    rating = {
      rate: 5,
    },
    reviews = {
      productId: 0,
    },
  } = productData || {};
  const {
    showModalAddCard,
    setCart,
    cart,
    wishlist,
    handleWishlist,
    onChangeIsOpenModalAuth,
  } = useStore();

  const addProductBasket = (id) => {
    if (!token) {
      isVisable("login", onChangeIsOpenModalAuth);
    } else {
      if (isInCart(id)) {
        return toast.error(t("message.product-card.product-dont-have"));
      }

      if (inStock <= 0) {
        return toast.error(t("message.product-card.product-dont-have"));
      }

      showModalAddCard({ isOpen: true, product });
      setCart(product);
    }
  };

  const isInCart = (cartId) => {
    return cart?.items?.some(item => {
      return item?.productId === cartId && item?.quantity == item?.Product?.inStock;
    });
  };

  const toggleWishlist = async (id) => {
    if (!token) {
      return toast.error(t("message.product-card.add-like"));
    }
    await handleWishlist(id);
  };

  const isInWishlist = useMemo(() => {
    return wishlist?.length
      ? wishlist.some((wishlistItem) =>
          wishlistItem.products.some((product) => product.productId === id)
        )
      : false;
  }, [wishlist, id]);

  if (loading) {
    return (
      <article className="relative rounded-[20px] overflow-hidden pb-4 border">
        <Skeleton height={200} className="w-full mb-2" />
        <Skeleton height={20} width={150} className="mb-1" />
        <Skeleton height={15} width={100} />
        <Skeleton height={25} width={80} className="mt-2" />
        <Skeleton
          circle={true}
          height={32}
          width={32}
          className="absolute bottom-4 right-2"
        />
      </article>
    );
  }

  return (
    <article className="relative rounded-[20px] overflow-hidden pb-4 border border-custom-green-400  hover:shadow-custom">
      <span
        className="absolute top-4 right-4 cursor-pointer active:scale-110 text-[20px] z-20"
        onClick={() => toggleWishlist(id)}
      >
        {isInWishlist ? (
          <IoMdHeart className="text-custom-green-500" />
        ) : (
          <CiHeart />
        )}
      </span>
      <Link to={`/product_info/${id}`} className="select-none bg-[#efefef]">
        <div className="mb-2 bg-[#efefef]">
          {!imageLoaded && (
            <Skeleton
              className="w-full aspect-[4/5.25] "
              style={{ height: "auto" }}
            />
          )}
          <img
            src={`http://170.64.234.64:6262/images/${images[0]?.image?.name}`}
            alt={
              i18n.language === "uz"
                ? title_uz
                : i18n.language === "ru"
                ? title_ru
                : title_en
            }
            className={`w-full object-contain aspect-[4/5.25] max-h-[350px] ${
              !imageLoaded ? "hidden" : "block"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Link>

      <Link to={`/product_info/${id}`}>
        <div className="px-2 text-custom-gray-800 font-inter flex flex-col justify-between h-[100px] ss:h-[120px]">
          <div>
            <h4 className="text-[12.8px] max-h-[43px] overflow-hidden mb-1">
              {
                <CutText
                  text={
                    i18n.language === "uz"
                      ? title_uz
                      : i18n.language === "ru"
                      ? title_ru
                      : title_en
                  }
                  maxLines={2}
                />
              }
            </h4>
            <p className="text-[11.2px] flex items-center gap-x-1 text-custom-gray-500">
              <span className="text-[#ffb54c]">
                <IoStar />
              </span>
              {Math.round(rating?.rate) || "5"}
              {` (${reviews?.productId} ${t("product-card.comment")}) `}
            </p>
          </div>
          <div className="flex justify-between items-end gap-x-5">
            {discountStatus === "active" ? (
              <div>
                <p className="text-[10px] ms:text-[12px] line-through text-custom-gray-300">
                  {amount} {t("product-card.usd")}
                </p>
                <p className="text-[12px] ms:text-[14px] ss:text-[16px]">
                  {amount - discountAmount} {t("product-card.usd")}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[12px] ms:text-[14px] ss:text-[16px]">
                  {amount} {t("product-card.usd")}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
      <span
        onClick={() => addProductBasket(id)}
        className="absolute bottom-4 right-2 cursor-pointer text-[20px] w-[32px] h-[32px] flex items-center justify-center border border-custom-green-400 rounded-full hover:bg-[#e5e7eb]"
      >
        <TbShoppingBagPlus />
      </span>
    </article>
  );
}

export default ProductCard;
