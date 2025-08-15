import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GoChevronDown} from "react-icons/go";

// TreeNode komponenti - har bir tugun uchun rekursiv komponent
export const TreeNode = ({ node, isRoot = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Bolalar tugunlari mavjudligini tekshirish
  const hasChild = node?.childCategories && node?.childCategories?.length > 0;

  const toggleOpen = (e) => {
    // faqat ikonka bosilganda ochish va yopish
    if (e.target.closest("span")) {
      setIsOpen(!isOpen);
    }
  };

  const handleNodeClick = () => {
    navigate(`/products/categoryId=${node?.id}`);
  };

  return (
    <div
      className={`mb-[5px] ${
        isRoot ? "border-b border-custom-green-400 pb-2" : ""
      }`}
    >
      <div className="flex items-center justify-between cursor-pointer">
        <span
          className="text-[16px] font-medium w-full"
          onClick={handleNodeClick}
        >
          {i18n.language === "uz"
            ? node?.title_uz
            : i18n.language === "ru"
            ? node?.title_ru
            : node?.title_en}
        </span>
        {hasChild && (
          <span className="mr-2 text-[25px] font-semibold" onClick={toggleOpen}>
            {isOpen ? (
              <GoChevronDown className="ml-2 text-[25px] " />
            ) : (
              <GoChevronDown className="ml-2 text-[25px] -rotate-90" />
            )}
          </span>
        )}
      </div>
      {/* Tugun ochilgan bo'lsa, bolalarini rekursiv render qilish */}
      {isOpen && hasChild && (
        <div className="pl-4">
          {node?.childCategories?.map((childNode) => (
            <TreeNode key={childNode?.id} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};
