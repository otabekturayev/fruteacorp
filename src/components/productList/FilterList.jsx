import React, { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect";
import { useFetch } from "../../hooks/useFetch";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css";
import { GrFormNext } from "react-icons/gr";

const FilterList = () => {
  const { t, i18n } = useTranslation();
  const { categoryId } = useParams();
  
  const [categoryIdString, setCategoryIdString] = useState(null);
  const navigate = useNavigate();
  const { data, loading } = useFetch(!categoryIdString ? "/categories" : `/categories/${categoryIdString?.split("=")?.[1]}`);
  const arrayData = Array.isArray(data) ? data : [data];
  const { data: allCategory } = useFetch("/categories");

  const handleSelect = (id) => {
    navigate(`/products/categoryId=${id}`);
  };

  useEffect(() => {
    if (categoryId?.includes('categoryId=')) {
      setCategoryIdString(categoryId);
    } else {
      setCategoryIdString(null);
    }
  }, [categoryId]);
  
  return (
    <div className="lg:min-w-[270px] lg:max-w-[270px] pt-[10px] flex lg:flex-col gap-[15px] ss:gap-[30px] min-w-full">
      <div className="w-[100%]">
        <h4 className="font-semibold mb-[10px] text-[18px]">
          {t("filter.title")}
        </h4>
        <div className="lg:hidden block">
          <CustomSelect
            options={allCategory}
            onSelect={handleSelect}
            placeholder={t("filter.input")}
          />
        </div>
        <ul className="text-[16px] pl-[5px] opacity-[0.9] hidden lg:flex flex-col gap-[5px] mb-[15px]">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <Skeleton height={25} />
                </li>
              ))
            : arrayData?.map((category) => (
                <li key={category?.id} className="cursor-pointer group text-[#000] opacity-[1] text-[18px]">
                  <NavLink
                    to={category?.parentId ? `/products/categoryId=${category?.parentId}` : !categoryId ? `/products/categoryId=${category?.id}` : "/products"}
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-[8px] hover:text-custom-green-600 hover:opacity-[0.8]  ${isActive ? "" : ""}`
                    }
                  >
                    <div className="flex gap-[10px] items-center">{categoryIdString && <div><GrFormNext className="rotate-180" /></div>} 
                    <div>{i18n.language === "uz"
                      ? category?.title_uz
                      : i18n.language === "ru" ? category?.title_ru : category?.title_en}</div> </div>
                    
                      <div>{category?.childCategories?.length > 0 && !categoryIdString && <GrFormNext  />}</div>
                  </NavLink>
                  {categoryIdString && category?.childCategories && category?.childCategories?.length > 0 && (
                    <ul className="pl-4 mt-1 ">
                      
                      {category?.childCategories.map((child) => (
                        <li key={child?.id} className="text-[16px] text-gray-600 hover:text-custom-green-600 flex items-center justify-between mb-[3px]">
                          <NavLink
                            to={`/products/categoryId=${child?.id}`}
                            className={({ isActive }) =>
                              `flex items-center justify-between w-full ${isActive ? "" : ""}`
                            }
                          >
                            <div className="m">
                              {i18n.language === "uz"
                                ? child?.title_uz
                                : i18n.language === "ru" ? child?.title_ru : child?.title_en}
                            </div>
                            <div>{child?.childCategories?.length > 0 && <GrFormNext  />}</div>
                          </NavLink>
                        </li>
                        
                      ))}
                    </ul>
                  )}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterList;