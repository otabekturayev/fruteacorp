import React, { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { isVisable } from "./showModal";
import { toast } from "react-toastify";
import api from "../../../axios";
// import api from "../../api"; // assuming API configuration is set

const NewPass = ({ setTitle }) => {
  const [smsCode, setSmsCode] = useState(Array(5).fill("")); // 5-digit SMS code
  const [timer, setTimer] = useState(120); // 2-minute timer
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [codeError, setCodeError] = useState(false); // Error for incomplete SMS code
  const { onChangeIsOpenModalAuth, phoneNumber } = useStore();
  const { t, i18n } = useTranslation();

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendAvailable(true);
    }
  }, [timer]);

  // Handle SMS code input
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newSmsCode = [...smsCode];
      newSmsCode[index] = value;
      setSmsCode(newSmsCode);
      setCodeError(false); // Reset code error on input change

      if (value && index < 4) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  // Resend code
  const handleResendCode = async() => {
    setSmsCode(Array(5).fill("")); // Reset SMS code fields
    setTimer(120); // Reset timer to 2 minutes

    try {
      const response = await api.post("auth/send-sms", phoneNumber);
      
      if(!response?.data?.success ){
        toast?.error(response?.message)
        throw new Error("Error");
      }

    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      }
    }

    setIsResendAvailable(false);
    setCodeError(false); // Reset code error on resend
  };

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
  } = useForm();
  const password = watch("password");

  const sendFormData = async (data) => {
    const newData = {
      password: data.password,
      code: smsCode.join(""),
      phone: phoneNumber?.phone,
    };

    // Ensure SMS code is complete and timer is active
    const isSmsCodeComplete = smsCode.every((digit) => digit !== "");
    if (!isSmsCodeComplete || timer <= 0) {
      setCodeError(true);
      return;
    }

    if (newData.password && isSmsCodeComplete) {
      try {
        const response = await api.post("auth/change-password", newData);

        if (!response?.data?.success) {
          toast.error(response?.message);
          throw new Error("Error");
        }

        toast.success(t("message.newPass.success"));
        isVisable("login", onChangeIsOpenModalAuth);
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  setTitle(i18n.language === "uz" ? "Yangi parol" : "Новый пароль");

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg md:text-xl font-bold mb-4">{t("sms.btn")}</h2>
      <div className="flex space-x-2 mb-4">
        {smsCode.map((digit, index) => (
          <input
            key={index}
            id={`input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            maxLength="1"
            className={`p-2 border border-custom-green-400 rounded text-center w-10 text-lg placeholder:text-custom-green-600 focus-visible:outline-0 focus-visible:border-custom-green-600 ${
              digit === "" && codeError ? "border-red-500" : "border-custom-green-400"
            }`}
            placeholder="•"
          />
        ))}
      </div>
      {codeError && (
        <p className="text-red-500 text-sm mb-2">
          {t("sms.title") || "Please enter the complete SMS code."}
        </p>
      )}
      <div className="flex items-center gap-x-2">
        {isResendAvailable ? (
          <button
            onClick={handleResendCode}
            className="bg-gray-500 w-max text-white p-2 rounded text-[14px] hover:bg-gray-600"
          >
            {t("sms.repBtn")}
          </button>
        ) : (
          <p className="text-gray-500">
            {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}{" "}
            daqiqa
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(sendFormData)} className="mt-4 md:mt-8 w-full">
        <div className="mb-5 md:mb-6 relative">
          <label htmlFor="password" className="block text-[14px] md:text-[16px] mb-1">
            {t("newPass.newPass")}:
          </label>
          <div
            className={`flex items-center rounded border ${
              formErrors.password ? "border-red-500" : "border-custom-green-400"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: { value: true, message: t("auth.required") },
                minLength: { value: 6, message: t("newPass.minLeng") },
              })}
              className="w-full outline-none px-4 py-2 text-[16px] focus:outline-none"
            />
            <span
              className="pr-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <LuEye /> : <IoEyeOffOutline />}
            </span>
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-xs md:text-sm mt-1 absolute -bottom-[17px] left-0">
              {formErrors.password.message}
            </p>
          )}
        </div>

        <div className="mb-5 md:mb-6 relative">
          <label htmlFor="confirmPassword" className="block text-[14px] md:text-[16px] mb-1">
            {t("newPass.repNewPass")}:
          </label>
          <div
            className={`flex items-center rounded border ${
              formErrors.confirmPassword ? "border-red-500" : "border-custom-green-400"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: { value: true, message: t("auth.required") },
                validate: (value) => value === password || t("newPass.repPass"),
              })}
              className="w-full outline-none px-4 py-2 text-[16px] focus:outline-none"
            />
            <span
              className="pr-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <LuEye /> : <IoEyeOffOutline />}
            </span>
          </div>
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-xs md:text-sm mt-1 absolute -bottom-[17px] left-0">
              {formErrors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-custom-green-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-custom-green-700"
        >
          {t("sms.btn")}
        </button>
      </form>
    </div>
  );
};

export default NewPass;
