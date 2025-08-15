import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "../../store/store";
import { isVisable } from "../../components/auth/showModal";
import { useNavigate } from "react-router-dom";
import axios from "./../../../axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SettingsForm = () => {
  const { clearUser, onChangeIsOpenModalAuth, user, setUser } = useStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userInfo = JSON.parse(localStorage.getItem("user-store"));

  const defaultValues = {
    lastName: userInfo?.state?.user?.data?.lastName || "",
    firstName: userInfo?.state?.user?.data?.firstName || "",
  };

  const handleLogout = () => {
    clearUser();
    isVisable("close", onChangeIsOpenModalAuth);
    localStorage.removeItem("accessToken");
    navigate("/"); 
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const watchedFields = watch();

  useEffect(() => {
    const isChanged = Object.keys(defaultValues).some(
      (key) => watchedFields[key] !== defaultValues[key]
    );
    setShowButtons(isChanged);
  }, [watchedFields]);

  const onSubmit = async (data) => {
    const updatedData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };
    setIsLoading(true);
    try {
      const response = await axios.patch(`/users/self`, updatedData);
      setUser({
        ...user,
        data: {
          ...user?.data,
          firstName: response?.data?.data?.firstName,
          lastName: response?.data?.data?.lastName,
        },
      });
      toast.success(t("message.settings-form.success")); 
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || t("message.settings-form.error");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    reset(defaultValues);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <InputField
          label={t("user.lastName")}
          name="lastName"
          register={register}
          errors={errors}
          requiredMessage="Familiya is required"
          maxLength={50}
        />

          <InputField
          label={t("user.firstName")}
          name="firstName"
          register={register}
          errors={errors}
          requiredMessage="Ism is required"
          maxLength={50}
        />

        <div>
          <label className="block text-sm font-medium text-custom-gray-800">
            {t("user.phone")}
          </label>
          <input
            type="text"
            value={userInfo?.state?.user?.data?.phone || ""}
            disabled
            className="mt-1 p-2 block w-full border rounded-md bg-custom-green-400"
          />
        </div>

        {showButtons && (
          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="bg-custom-green-600 hover:bg-custom-green-500 text-white py-2 px-4 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? t("user.loading") : t("user.save")}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
            >
              {t("user.cancel")}
            </button>
          </div>
        )}
      </form>
      <button onClick={handleLogout} className="mt-4 text-red-500">
        {t("user.logout")}
      </button>
    </>
  );
};

const InputField = ({ label, name, register, errors, requiredMessage, maxLength }) => (
  <div>
    <label className="block text-sm font-medium text-custom-gray-800">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      {...register(name, {
        required: requiredMessage,
        maxLength: { value: maxLength, message: `${label} should not exceed ${maxLength} characters` }
      })}
      className={`mt-1 p-2 block w-full border rounded-md focus:outline-none ${
        errors[name] ? 'border-red-500' : 'border-custom-green-400'
      }`}
    />
    {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
  </div>
);

export default SettingsForm;
