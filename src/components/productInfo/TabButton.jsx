import React from "react";

const TabButton = ({ label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`font-medium relative cursor-pointer ${
        active ? "text-custom-green-600" : ""
      }`}
    >
      {label}
      {active && (
        <span className="absolute w-full h-[1px] bg-custom-green-600 -bottom-[25px] left-[1px]" />
      )}
    </div>
  );
};

export default TabButton;
