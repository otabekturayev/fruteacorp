import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrFormNext } from "react-icons/gr";

const CategoryList = () => {
  const { data, loading } = useFetch("/categories");

  const { i18n } = useTranslation();

  return (
    <ul className="p-[20px] bg-[#fff] border border-custom-green-600 opacity-[0.95] rounded-[10px] flex flex-col gap-2">
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <li key={index}>
              <Skeleton height={25} width={200} />
            </li>
          ))
        : data?.map((category) => (
            <li key={category?.id} className="cursor-pointer text-[18px]">
              <Link
                to={`/products/categoryId=${category?.id}`}
                className="flex gap-[10px] items-center justify-between hover:text-custom-green-600 w-[300px]"
              >
                <div>
                  {i18n.language === "uz"
                    ? category?.title_uz
                    : i18n.language === "ru"
                    ? category?.title_ru
                    : category?.title_en}
                </div>
                <div>
                  <GrFormNext />
                </div>
              </Link>
            </li>
          ))}
    </ul>
  );
};

export default CategoryList;
