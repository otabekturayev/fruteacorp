import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const CustomSelect = ({
  options,
  onSelect,
  placeholder = "Biror variant tanlang",
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option?.id);
    setIsOpen(false);
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prevExpanded) =>
      prevExpanded.includes(categoryId)
        ? prevExpanded.filter((id) => id !== categoryId)
        : [...prevExpanded, categoryId]
    );
  };

  const renderOptions = (options, level = 0) => {
    return options?.map((option) => (
      <React.Fragment key={option?.id}>
        <li
        className={`p-2 hover:bg-custom-green-200 cursor-pointer flex items-center justify-between${
          level === 0 ? " border-b border-custom-green-400" : "" 
        }${
          level > 0 ? `pl-${level * 4}` : ""
        }`}
      >
          <span onClick={() => handleSelect(option)} className="w-full" >
            {i18n.language === "uz"
              ? option?.title_uz
              : i18n.language === "ru"
              ? option?.title_ru
              : option?.title_en}
          </span>
          {option?.childCategories?.length > 0 && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleCategory(option?.id);
              }}
              className="mr-2 cursor-pointer"
            >
              {expandedCategories?.includes(option?.id) ? (
              <GoChevronDown className="ml-2 text-[25px] " />
            ) : (
              <GoChevronDown className="ml-2 text-[25px] -rotate-90" />
            )}
            </span>
          )}
        </li>
        {/* Agar kategoriya kengaytirilgan bo'lsa, bola kategoriyalarni ko'rsatish */}
        {expandedCategories?.includes(option?.id) &&
          option?.childCategories &&
          renderOptions(option?.childCategories, level + 1)}
      </React.Fragment>
    ));
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    setSelectedOption(null); // Har ochilganda tanlangan variantni qayta o'rnatish
    setExpandedCategories([]); // Har ochilganda barcha kategoriyalarni yopish
  };

  return (
    <div className="relative w-full">
      <div
        onClick={handleDropdownToggle}
        className="w-full p-2 border border-custom-green-400 rounded-md bg-white text-left text-[14px] ss:text-[16px] flex justify-between items-center"
      >
        <span>
          {selectedOption
            ? i18n.language === "uz"
              ? selectedOption?.title_uz
              : i18n.language === "ru"
              ? selectedOption?.title_ru
              : selectedOption?.title_en
            : placeholder}
        </span>
        {isOpen ? (
          <GoChevronUp className="ml-2" />
        ) : (
          <GoChevronDown className="ml-2" />
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-30 w-full bg-white border border-custom-green-400 rounded-md mt-1 max-h-[500] overflow-auto shadow-lg">
          {renderOptions(options)}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
