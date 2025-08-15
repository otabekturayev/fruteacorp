import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "../../store/store";
import { LuEye } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";
import { isVisable } from "./showModal";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Register = ({ setTitle }) => {
  const { i18n } = useTranslation();
  const { onChangeIsOpenModalAuth } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const sendFormData = async (data) => {
    const newData = {
      phone: "+998" + data?.phone,
      password: data?.password,
      firstName: data?.firstname,
      lastName: data?.surname,
    };

    try {
      const response = await axios.post("/auth/signup", newData);

      if (response.status >= 200 && response.status < 300) {
        isVisable("login", onChangeIsOpenModalAuth);
        toast.success(t("message.register.success"));
      } else {
        toast.error(t("message.register.error"));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 5000);
  };

  
  return (
    <>
      {setTitle(i18n.language === "uz" ? "Ro'yxatdan o'tish" : "Регистрация")}
      <form
        onSubmit={handleSubmit(sendFormData)}
        className="text-custom-gray-800 font-inter"
      >
        <div className="mb-4 md:mb-6 relative">
          <label
            htmlFor="firstname"
            className="block text-[14px] md:text-[16px] text-custom-gray-800 mb-1"
          >
            {t("register.firstName")}:{" "}
          </label>
          <input
            type="text"
            id="firstname"
            {...register("firstname", {
              required: { value: true, message: t("auth.required") },
            })}
            className={`${
              errors?.firstname
                ? "border border-red-500"
                : "border border-custom-gray-200"
            } w-full bg-custom-gray-200 outline-0 rounded-[8px] px-4 py-2 text-[12px] md:text-[16px] font-normal font-inter focus:outline-none`}
          />
          {errors.firstname && (
            <span className="text-red-500 text-[12px] absolute -bottom-[17px] left-0">
              {errors?.firstname?.message}
            </span>
          )}
        </div>

        <div className="mb-4 md:mb-6 relative">
          <label
            htmlFor="surname"
            className="block text-[14px] md:text-[16px] text-custom-gray-800 mb-1"
          >
            {t("register.lastName")}:{" "}
          </label>
          <input
            type="text"
            id="surname"
            {...register("surname", {
              required: { value: true, message: t("auth.required") },
            })}
            className={`${
              errors?.surname
                ? "border border-red-500"
                : "border border-custom-gray-200"
            } w-full bg-custom-gray-200 outline-0 rounded-[8px] px-4 py-2 text-[12px] md:text-[16px] font-normal font-inter focus:outline-none`}
          />
          {errors.surname && (
            <span className="text-red-500 text-[12px] absolute -bottom-[17px] left-0">
              {errors?.surname?.message}
            </span>
          )}
        </div>

        <div className="mb-4 md:mb-6 relative">
          <label
            htmlFor="phone"
            className="block text-[14px] md:text-[16px] text-custom-gray-800 mb-1"
          >
            {t("register.phone")}:{" "}
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
                  message: t("auth.patternPhone"), // e.g., "Введите 9 цифр"
                },
              })}
              className={
                "bg-transparent w-full outline-0 border-0 pr-4 pl-2 py-2 font-normal focus:outline-none"
              }
            />
          </div>
          {errors.phone && (
            <span className="text-red-500 text-[12px] absolute -bottom-[17px] left-0">
              {errors?.phone?.message}
            </span>
          )}
        </div>

        <div className="mb-6 md:mb-6 relative">
          <label
            htmlFor="password"
            className="block text-[14px] md:text-[16px] text-custom-gray-800 mb-1"
          >
            {t("register.password")}:{" "}
          </label>
          <div
            className={`${
              errors?.password
                ? "border border-red-500"
                : "border border-custom-gray-200"
            } flex items-center bg-custom-gray-200 rounded-[8px]`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: { value: true, message: t("auth.required") },
                minLength: {
                  value: 6,
                  message: t("newPass.minLeng"),
                }
              })}
              className={
                "w-full bg-custom-gray-200 outline-0 rounded-[8px] px-4 py-2 text-[12px] md:text-[16px] font-normal focus:outline-none"
              }
            />
            <span
              className="pr-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <LuEye /> : <IoEyeOffOutline />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-[12px] absolute -bottom-[17px] left-0">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white mb-4 md:mb-8 text-[14px] md:text-[16px] font-medium tracking-[0.004em] rounded-[8px] py-2 transition hover:opacity-85 bg-custom-green-600"
        >
          {t("register.send")}
        </button>
      </form>

      <div className="flex justify-center">
        <button
          onClick={() => isVisable("login", onChangeIsOpenModalAuth)}
          className="text-[14px] text-custom-gray-600 hover:text-custom-gray-800 transition font-inter flex items-center gap-x-2"
        >
          {t("register.open")}{" "}
          <span className="text-[20px]">
            <IoIosArrowRoundForward />
          </span>
        </button>
      </div>
    </>
  );
};

export default Register;
