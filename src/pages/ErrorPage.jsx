import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const {t} = useTranslation()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4">{t("not-found.not-found-page")}</p>
        <p className="text-gray-500 mt-2">{t("not-found.text")}</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-custom-green-600 text-white py-2 px-4 rounded-lg hover:opacity-[0.8] transition-all duration-300"
        >
          {t("not-found.btn")}
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
