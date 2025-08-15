import React, { useState } from "react";
import { Link } from "react-router-dom";

const NoActiveComp = () => {
  return (
    <div className="py-10 max-w-[431px] text-center flex flex-col items-center justify-center px-2">
      <h2 className="text-[24px] md:text-[36px] text-custom-gray-800 font-bold mb-4">
        Hech narsa yo'q
      </h2>
      <p className="text-custom-gray-800  text-[13px] md:text-[16px] font-medium mb-4">
        Sizda to'lov qilinmagan buyurtma mavjud emas! Barcha kerakli narsalarni
        topish uchun qidirishdan foydalaning!
      </p>
      <Link
        to={"/products"}
        className="flex sm:w-[50%] justify-center items-center transition bg-custom-green-600 hover:opacity-85 text-white text-[12px] md:text-[16px] font-medium min-h-[48px] py-[10px] px-[18px] rounded-lg mb-2"
      >
        Xaridlarni boshlash
      </Link>
      <Link
        to={"/"}
        className="flex sm:w-[50%] justify-center items-center transition bg-transparent hover:bg-custom-green-200 hover:text-custom-gray-800 text-custom-gray-600 text-[12px] md:text-[16px] font-medium min-h-[48px] py-[10px] px-[18px] rounded-lg"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

const Unfinished = () => {
  const [data, setData] = useState(false);
  return !data ? (
    <div className="flex items-center justify-center">
      {" "}
      <NoActiveComp />{" "}
    </div>
  ) : (
    "salom"
  );
};

export default Unfinished;
