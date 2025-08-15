import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store/store";
import { IoIosArrowRoundForward } from "react-icons/io";
import { isVisable } from "./showModal";
import api from "../../../axios";
import { toast } from "react-toastify";

const ForgotPassword = ({ setTitle }) => {
  const { i18n } = useTranslation();
  const { onChangeIsOpenModalAuth, setPhoneNumber } = useStore();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();

  const sendFormData = async (data) => {
    const formattedData = { phone: "998" + data.phone };
    try {
      
      // Uncomment and use the line below if you want to actually send the SMS
      const response = await api.post("auth/send-sms", formattedData);
      
      if(!response?.data?.success ){
        toast?.error(response?.message)
        throw new Error("Error");
      }

      setPhoneNumber(formattedData)
      isVisable("newpass", onChangeIsOpenModalAuth);

    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  setTitle(i18n.language === "uz" ? "Parolni tiklash" : "Сброс пароля");

  return (
    <form onSubmit={handleSubmit(sendFormData)} className="text-custom-gray-800 font-inter">
      <div className="mb-6">
        <label htmlFor="phone" className="block text-[16px] text-custom-gray-800 mb-1">
          {t("login.phone")}:
        </label>
        <div className={`border ${errors.phone ? "border-red-500" : "border-custom-gray-200"} bg-custom-gray-200 rounded-[8px] pl-4 flex items-center`}>
          <span>+998</span>
          <input
            type="text"
            id="phone"
            maxLength={9}
            {...register("phone", {
              required: { value: true, message: t("auth.required") },
              pattern: {
                value: /^[0-9]{9}$/,
                message: t("auth.patternPhone"),
              },
            })}
            className="bg-transparent w-full outline-0 border-0 pr-4 pl-2 py-2 text-[16px] font-normal focus:outline-none"
          />
        </div>
        {errors.phone && (
          <span className="text-red-500 text-[12px]">
            {errors.phone.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full mb-8 text-white text-[16px] font-medium tracking-[0.004em] rounded-[8px] py-2 transition hover:opacity-85 bg-custom-green-600"
      >
        {t("login.send")}
      </button>

      <div className="flex justify-center mb-2">
        <button
          onClick={() => isVisable("login", onChangeIsOpenModalAuth)}
          className="text-[14px] text-custom-gray-600 hover:text-custom-gray-800 transition font-inter flex items-center gap-x-2"
        >
          {t("register.open")} 
          <span className="text-[20px]">
            <IoIosArrowRoundForward />
          </span>
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
