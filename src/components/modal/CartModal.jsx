import React from "react";
import { useStore } from "../../store/store";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CartModal = () => {
  const { addCardModal, showModalAddCard } = useStore();

  const {t, i18n} = useTranslation()

  return addCardModal?.isOpen ? (
    <div className="max-w-[300px] w-full ss:min-w-[400px] sm:min-w-[500px] md:min-w-[600px] fixed lg:top-0 top-[80px] left-1/2 -translate-x-1/2 z-50 p-2 ss:p-5 bg-white shadow flex gap-x-2 ss:gap-x-5 rounded-[8px]">
      <div className="max-w-[60px]">
        <img src={`https://api.fruteacorp.uz/images/${addCardModal?.product?.images?.[0]?.image?.name}`} alt="product img" />
      </div>
      <div>
        <div className="font-inter">
          <h3 className="text-[13px] sm:text-[15px] lg:text-[16px] font-medium mb-[5px] md:mb-[10px] lg:mb-[12px]">
            {t("card-modal.message")}
          </h3>
          <p className="text-[10px] sm:text-[11px] lg:text-[12px] font-normal">
            {i18n.language === "uz" ? addCardModal?.product?.title_uz : i18n.language === "ru" ? addCardModal?.product?.title_ru : addCardModal?.product?.title_en}
          </p>
        </div>
      </div>
      <div className="w-[50px]">
        <span
          onClick={() => {
            showModalAddCard({ isOpen: false, product: null });
          }}
          className="absolute top-2 right-2 ss:top-5 ss:right-5 text-[25px] lg:text-[28px] flex items-center justify-centertransition hover:bg-custom-gray-200 hover:bg-opacity-65 rounded-full cursor-pointer text-custom-gray-600"
        >
          <IoIosClose />
        </span>

        <div className="absolute bottom-2 right-2 ss:bottom-5 ss:right-5">
          <Link
            to={"/cart"}
            onClick={() => {
              showModalAddCard({ isOpen: false, product: null });
            }}
            className="text-custom-green-600 text-[11px] sm:text-[13px] lg:text-[14px] font-inter font-medium hover:text-green-400"
          >
            {t("card-modal.to-basket")}
          </Link>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CartModal;
