import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import telegram from "../assets/icons/social-media/telegram.svg";
import whatsap from "../assets/icons/social-media/whatsap.svg";
import { useTranslation } from "react-i18next";

const ContactModal = ({ setIsOpen, isOpen }) => {
  const toggleModal = () => {
    setIsOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const { t } = useTranslation()

  return (
    <div className={`justify-center items-center h-screen fixed z-[999999] transition-all duration-300 ${isOpen ? 'flex' : 'hidden'}`}>
      <div
        onClick={toggleModal}
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 px-[10px]"
      >
        <div
          onClick={handleModalClick}
          className="bg-white rounded shadow-lg p-[32px]"
        >
          <div className="flex items-center justify-between mb-[15px]">
            <h2 className="text-[16px] ">{t("footer.modal.title")}</h2>
            <button
              onClick={toggleModal}
              className=" p-[3px] bg-custom-green-400 text-[20px] text-custom-gray-800 rounded-full"
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="text-[13px] mb-[10px]">
          {t("footer.modal.text")}
          </div>
          <div className="flex flex-col gap-[10px]">
            <a target="_blank" href="https://t.me/fruteacorp" className="cursor-pointer flex items-center gap-[10px] p-[5px] hover:bg-custom-green-400 rounded-[10px]">
              <picture>
                <img src={telegram} alt="telegram icon" />
              </picture>
              <div>
                <div className="text-[12px] font-[600]">{t("footer.modal.telegram")}</div>
                <div className="text-[12px] text-custom-gray-500">
                  @fruteacorp
                </div>
              </div>
            </a>
            <a target="_blank" href="tel:+998998835888" className="cursor-pointer flex items-center gap-[10px] p-[5px] hover:bg-custom-green-400 rounded-[10px]">
              <picture>
                <img src={whatsap} alt="whatsap icon" />
              </picture>
              <div>
                <div className="text-[12px] font-[600]">+998 (99) 883-58-88</div>
                <div className="text-[12px] text-custom-gray-500">
                {t("footer.modal.call")}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
