import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SearchProductCard = ({
  title,
  id,
  amount,
  discountAmount,
  discountStatus,
  img,
}) => {
  const {t} = useTranslation()
  return (
    <Link
      to={`/product_info/${id}`}
      className="flex gap-[10px] hover:bg-custom-green-200 rounded-[5px]"
    >
      <div className="min-w-[60px] min-h-[80px]">
        <img
          className="w-[60px] h-[80px] rounded-[5px]"
          src={`http://170.64.234.64:6262/images/${img}`}
          alt={title}
        />
      </div>
      <div className="max-w-[350px] flex flex-col justify-between">
        <div className="max-w-[350px] text-[13px] ss:text-[16px]">{title}</div>
        <div className=" text-custom-gray-600 max-w-[350px]">
          {discountStatus === "active" ? (
            <div className="flex gap-[10px] items-end">
              <div className="text-[13px] ss:text-[15px] text-custom-gray-800">
                {discountAmount} {t("product-card.usd")}
              </div>{" "}
              <div className="line-through text-[12px] ss:text-[14px] text-custom-gray-300">
                {amount} {t("product-card.usd")}
              </div>
            </div>
          ) : (
            <div className="text-[13px] ss:text-[15px] text-custom-gray-800">
              {amount} {t("product-card.usd")}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchProductCard;
