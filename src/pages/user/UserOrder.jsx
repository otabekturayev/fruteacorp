import React, { useState } from "react";
import AllOrder from "../../components/orders/AllOrder";
import { useTranslation } from "react-i18next";
// import Unfinished from "../../components/orders/Unfinished";
// import ActiveOrders from "../../components/orders/ActiveOrders";

const UserOrder = () => {
  const [activeButton, setActiveButton] = useState("all");

  const orderRouting = (url) => {
    setActiveButton(url);
  };

  const { t } = useTranslation()

  return (
    <div>
      <div className="flex flex-col ss:flex-row gap-y-2 text-custom-gray-800 gap-x-3 mb-5">
        <button
          disabled={activeButton === "all"}
          onClick={() => orderRouting("all")}
          className={`${
            activeButton === "all"
              ? "bg-custom-green-600 text-white"
              : "bg-custom-green-200 hover:bg-opacity-65"
          } px-4 py-[10px]  rounded-full transition text-[14px] sm:text-[16px] font-inter`}
        >
          {t("user.all-order")}
        </button>
        {/* <button
          disabled={activeButton === "unfinished"}
          onClick={() => orderRouting("unfinished")}
          className={`${
            activeButton === "unfinished"
              ? "bg-custom-green-600 text-white"
              : "bg-custom-green-200 hover:bg-opacity-65"
          } px-4 py-[10px]  rounded-full transition text-[14px] sm:text-[16px] font-inter`}
        >
          To'lov qilinmagan
        </button> */}
        {/* <button
          disabled={activeButton === "current"}
          onClick={() => orderRouting("current")}
          className={`${
            activeButton === "current"
              ? "bg-custom-green-600 text-white"
              : "bg-custom-green-200 hover:bg-opacity-65"
          } px-4 py-[10px]  rounded-full transition text-[14px] sm:text-[16px] font-inter`}
        >
          Faol
        </button> */}
      </div>

      <div className="">
          <AllOrder />
      </div>
    </div>
  );
};

export default UserOrder;
