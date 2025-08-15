import React, { useState } from "react";
import { GrPrevious } from "react-icons/gr";

const Accordion = ({ header, body }) => {
  const [openAccordion, setOpenAccordion] = useState(false);
  return (
    <div className="w-full">
      <div
        onClick={() => setOpenAccordion(!openAccordion)}
        className="font-medium text-[16px] sm:text-[18px] flex justify-between items-center px-[14px] py-[16px] transition-all duration-300 hover:bg-custom-green-400 rounded-[10px] cursor-pointer"
      >
        <span>{header}</span>
        <span
          className={`transition-all duration-500 ${
            openAccordion ? "rotate-[180deg]" : ""
          }`}
        >
          <GrPrevious className="-rotate-90" />
        </span>
      </div>
      <div
        className={`transition-all duration-500 ${
          openAccordion ? "max-h-[900px]" : "max-h-0"
        }  overflow-hidden`}
      >
        <p className="p-[10px] pl-[20px] text-[14px] sm:text-[16px]">{body}</p>
      </div>
    </div>
  );
};

export default Accordion;
