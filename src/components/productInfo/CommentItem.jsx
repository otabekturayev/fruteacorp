import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoStar } from "react-icons/io5";

const CommentItem = ({ comment }) => {
  const [fullComment, setFullComment] = useState(false);
  const { t, i18n } = useTranslation();
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    // Yil va kunni olish
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");

    // Oylik nomini olish
    const monthNamesUz = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentabr",
      "oktabr",
      "noyabr",
      "dekabr",
    ];

    const monthNamesRu = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];

    const monthNamesEn = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month =
      i18n.language === "uz"
        ? monthNamesUz[date.getMonth()]
        : i18n.language === "ru"
        ? monthNamesRu[date.getMonth()]
        : monthNamesEn[date.getMonth()];

    return `${year} ${day}-${month}`;
  };
  const truncateText = (text) => {
    if (text.length > 350) {
      return text.substring(0, 350) + "...";
    }
    return text;
  };
  return (
    <li className="border-b pb-[30px] mb-[20px] border-custom-green-400">
      <h4 className="text-[14px] font-medium">
        {comment?.User?.firstName} {comment?.User?.lastName}
      </h4>
      <div className="flex items-center gap-[10px] mb-[10px]">
        <div className="flex text-[14px] gap-[3px]">
          {[...Array(comment?.rate)].map((_, i) => (
            <IoStar key={i} className="text-[#ffb54c]" />
          ))}
        </div>
        <div className="text-custom-gray-500 text-[14px]">
          {formatDate(comment?.createdAt)}
        </div>
      </div>
      <div className="text-custom-gray-800 text-[14px] mb-[5px]">
        {t("product-info.content")}
      </div>
      <p className="text-custom-gray-800 text-[14px]">
        {fullComment ? comment?.comment : truncateText(comment?.comment)}
      </p>
      {comment?.comment?.length > 350 && (
        <button
          onClick={() => setFullComment(!fullComment)}
          className="text-blue-500 text-[14px] underline mt-[10px]"
        >
          {fullComment
            ? t("product-info.see-hidden")
            : t("product-info.see-more")}
        </button>
      )}
      {/* <div className="flex mt-[15px] mb-[25px]">
            <div className="w-[112px] h-[112px] flex justify-center">
              <img src={imgOil} alt="photo" className="h-full w-auto" />
            </div>
            <div className="w-[112px] h-[112px] flex justify-center">
              <img src={imgOil} alt="photo" className="h-full w-auto" />
            </div>
            <div className="w-[112px] h-[112px] flex justify-center">
              <img src={imgOil} alt="photo" className="h-full w-auto" />
            </div>
          </div> */}
      {/* <div className="ml-[15px] text-[14px] text-custom-gray-800">
            <div className="flex gap-[10px]">
              <h4 className="font-medium">Fruteacorp</h4>
              <div className="text-[14px] opacity-[0.57]">2023 24-fevral</div>
            </div>
            <p className="mt-[10px]">Спасибо за вашу оценку!</p>
          </div> */}
    </li>
  );
};

export default CommentItem;
