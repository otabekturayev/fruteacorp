import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "../../store/store";
import { LuEye } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { isVisable } from "./showModal";
import axios from "./../../../axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getUserData } from "../../hooks/getUserData";

const Login = ({ setTitle }) => {
  const { i18n } = useTranslation();
  const { onChangeIsOpenModalAuth,getWish } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const sendFormData = async (data) => {
    const newData = {
      phone: "+998" + data?.phone,
      password: data?.password,
    };

    try {
      const response = await axios.post("auth/signin", newData);
      const accessToken = response?.data?.data?.accessToken?.token;
      const refreshToken = response?.data?.data?.refreshToken?.token;
      await getUserData(accessToken, refreshToken)
      getWish()
      toast.success(t("message.login.success"));
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || t("message.login.error"));
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 5000);
  };

  return (
    <>
      {setTitle(i18n.language === "uz" ? "Kirish" : "Вход")}
      <form
        onSubmit={handleSubmit(sendFormData)}
        className="text-custom-gray-800 font-inter"
      >
        <div className="mb-4 md:mb-6 relative">
          <label
            htmlFor="phone"
            className="block text-[14px] md:text-[16px] text-custom-gray-800 mb-1"
          >
            {t("login.phone")}:{" "}
          </label>
          <div
            className={`${
              errors?.phone
                ? "border border-red-500"
                : "border border-custom-gray-200"
            } bg-custom-gray-200 rounded-[8px] pl-4 flex items-center text-[12px] md:text-[16px]`}
          >
            <span>+998</span>
            <input
              type="text"
              id="phone"
              {...register("phone", {
                required: { value: true, message: t("auth.required") },
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: t("auth.patternPhone"), 
                },
              })}
              className="bg-transparent w-full outline-0 border-0 pr-4 pl-2 py-2 font-normal focus:outline-none"
            />
          </div>
          {/* {errors.phone && (
            <span className="text-red-500 text-[12px]">
              {errors?.phone?.message}
            </span>
          )} */}
        </div>

        <div className="mb-4 md:mb-6 relative">
          <label
            htmlFor="password"
            className="block text-[14px] md:text-[16px] text-custom-gray-800 mb-1"
          >
            {t("login.password")}:{" "}
          </label>
          <div
            className={`${
              errors?.password
                ? "border border-red-500"
                : "border border-custom-gray-200"
            } flex items-center bg-custom-gray-200 rounded-[8px] text-[12px] md:text-[16px]`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: {value: true, message: t("auth.required")},
                minLength: {
                  value: 6,
                  message: t("newPass.minLeng"),
                }
              })}
              className="w-full bg-custom-gray-200 outline-0 rounded-[8px] px-4 py-2 font-normal focus:outline-none"
            />
            <span
              aria-label="Toggle password visibility"
              className="pr-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <LuEye /> : <IoEyeOffOutline />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mb-6 md:mb-8 text-white text-[14px] md:text-[16px] font-medium tracking-[0.004em] rounded-[8px] py-2 transition hover:opacity-85 bg-custom-green-600"
        >
          {t("login.send")}
        </button>
      </form>

      <div className="flex justify-center mb-2">
        <button
          onClick={() => isVisable("register", onChangeIsOpenModalAuth)}
          className="text-[14px] text-custom-gray-600 hover:text-custom-gray-800 transition font-inter flex items-center gap-x-2"
        >
          {t("login.registration")}{" "}
          <span className="text-[20px]">
            <IoIosArrowRoundForward />
          </span>
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => isVisable("forgot", onChangeIsOpenModalAuth)}
          className="text-[12px] text-custom-gray-600 hover:text-custom-gray-800 transition font-inter flex items-center gap-x-2"
        >
          {t("login.forgot-password")}{" "}
          <span className="text-[20px]">
            <IoIosArrowRoundForward />
          </span>
        </button>
      </div>
    </>
  );
};

export default Login;
