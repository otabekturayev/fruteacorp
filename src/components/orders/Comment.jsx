import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../../axios";
import { useTranslation } from "react-i18next";
import { getUserData } from "../../hooks/getUserData";
import { useStore } from "../../store/store";


const Comment = ({ closeModal, productId, orderId }) => {
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const { user } = useStore(); 
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const ratingChanged = (newRating) => {
    setRating(newRating);
    setRatingError(false); 
  };

  const onSubmit = async (data) => {

    if (rating === 0) {
      setRatingError(true);
      return;
    }

    try {
      const response = await api.post(`/review/${orderId}`, {
        rate: rating,
        comment: data?.comment,
        productId: productId,
      });
      const accessToken = user?.token;
    const refreshToken = user?.refreshToken;
    getUserData(accessToken, refreshToken);
      toast.success(response?.data?.message)
    } catch (error) {
      toast.error(error.response.data.message);
    }
    reset();
    closeModal();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-[10px] z-[9999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg w-96 shadow-lg relative"
      >
        {/* Modal sarlavha */}

        <div className="flex justify-between items-center mb-[15px]">
          <div className="text-[20px] font-semibold">{t("commit-modal.title")}</div>{" "}
          <button
            onClick={closeModal}
            className="text-[25px] hover:text-custom-green-600"
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <div className="flex flex-col">
          <h3 className="text-gray-600 mb-2">{t("commit-modal.question")}</h3>
          <div className="self-center">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              activeColor="#ffd700"
              value={rating}
              a11y={true}
              classNames="flex gap-x-[5px]"
            />
          </div>
          {ratingError && (
            <p className="text-red-500 text-sm mt-1">
              {t("commit-modal.error")}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col">
          <label htmlFor="comment" className="block text-gray-600 mb-1">
            <span>{t("commit-modal.area-label")}</span>
            <textarea
              id="comment"
              maxLength={500}
              {...register("comment")}
              placeholder={t("commit-modal.placeholder")}
              className="w-full h-24 border border-custom-green-400 rounded-md p-2 focus:outline-none focus:border-custom-green-600 resize-none"
            ></textarea>
          </label>

          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 bg-custom-green-600 text-white px-4 py-2 rounded hover:opacity-[0.7] self-end"
          >
            {t("commit-modal.btn")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
