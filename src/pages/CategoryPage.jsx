import React from "react";
import { useFetch } from "../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { TreeNode } from "../components/TreeNode";

const CategoryPage = () => {
  const { data, loading } = useFetch("/categories");
  const { t } = useTranslation();

  return (
    <div className="container">
      <h3 className="text-[30px] font-semibold mb-[20px]">
        {t("filter.title")}
      </h3>
      <ul className="flex flex-col gap-[10px]">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <li key={index}>
                <Skeleton height={25} />
              </li>
            ))
          : <div className="">
          {data?.map((node) => (
              <TreeNode key={node?.id} node={node} isRoot={true}/>
          ))}
      </div>}
      </ul>
    </div>
  );
};

export default CategoryPage;