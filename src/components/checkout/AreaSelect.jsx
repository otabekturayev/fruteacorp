import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const AreaSelect = ({
  isOpenMap,
  isError,
  options,
  onSelect,
  placeholder = "Select an area",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);
  const { i18n } = useTranslation();

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect({
      id: option?.id,
      deliveryPrice: option?.deliveryPrice,
      freeDelivery: option?.freeDelivery,
      freeDeliveryFrom: option?.freeDeliveryFrom,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpenMap) {
      setSelectedOption(null);
    }
  }, [isOpenMap]);

  return (
    <div ref={selectRef} className="relative w-full custom-select">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={`w-full p-2 border  rounded-md bg-white text-left text-[14px] ss:text-[16px] flex justify-between items-center ${
          isError ? "border-red-600" : "border-custom-green-400"
        }`}
      >
        <span>
          {selectedOption
            ? selectedOption[
                `area${
                  i18n.language === "uz"
                    ? "UZ"
                    : i18n.language === "ru"
                    ? "RU"
                    : "EN"
                }`
              ]
            : placeholder}
        </span>
        {isOpen ? (
          <GoChevronUp className="ml-2" />
        ) : (
          <GoChevronDown className="ml-2" />
        )}
      </button>
      {isOpen && (
        <ul className="absolute z-30 w-full bg-white border border-custom-green-400 rounded-md mt-1 max-h-48 overflow-auto shadow-lg">
          {options?.map((option) => (
            <li
              key={option?.id}
              onClick={() => handleSelect(option)}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                selectedOption?.id === option?.id ? "bg-custom-green-200" : ""
              }`}
            >
              {i18n.language === "uz" ? option?.areaUZ : i18n.language === "ru" ? option?.areaRU : option?.areaEN}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AreaSelect;
