// import React, { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { useStore } from "../../store/store";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import { isVisable } from "./showModal";
import { useTranslation } from "react-i18next";
import ForgotPassword from "./ForgotPassword";
import NewPass from "./NewPass";

const AuthModal = () => {
  const { i18n } = useTranslation()
  const { isOpenModalAuth, onChangeIsOpenModalAuth } = useStore();
  const [title, setTitle] = useState(i18n.language === 'uz' ? "Kirish" : "Вход")

  const onChangeVisable = () => {
    if (isOpenModalAuth?.login) {
      return <Login setTitle={setTitle}/>;
    }

    if (isOpenModalAuth?.register) {
      return <Register setTitle={setTitle}/>;
    }

    if (isOpenModalAuth?.forgotPassword) {
      return <ForgotPassword setTitle={setTitle}/>;
    }

    if (isOpenModalAuth?.newPass) {
      return <NewPass setTitle={setTitle}/>;
    }
  };

  return (
    <div className="w-full h-[100vh] px-4 fixed top-0 left-0 z-[99999999999999] bg-modal-bg flex items-center justify-center">
      <div className="bg-white rounded-[8px] p-8 relative pt-5 w-[410px]">
        <h2 className="text-[18px] md:text-[24px] text-custom-gray-800 font-semibold tracking-[0.01em] font-inter mb-2 md:mb-5">
          {title}
        </h2>
        <span
          onClick={() => {
            isVisable("close", onChangeIsOpenModalAuth);
          }}
          className="absolute top-5 right-5 text-[18px] md:text-[24px] flex items-center justify-center p-1 bg-custom-gray-200 transition hover:bg-custom-gray-300 hover:bg-opacity-65 rounded-full cursor-pointer text-custom-gray-600"
        >
          <IoIosClose />
        </span>
        {onChangeVisable()}
      </div>
    </div>
  );
};

export default AuthModal;
