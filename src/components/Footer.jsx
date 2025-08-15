import { Link } from "react-router-dom";
import instagramIcon from "../assets/icons/social-media/instagram.svg";
import telegramIcon from "../assets/icons/social-media/telegram.svg";
import facebookIcon from "../assets/icons/social-media/facebook.svg";
import youtubeIcon from "../assets/icons/social-media/youtube.svg";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ContactModal from "./ContactModal";

function Footer() {

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
 
   const { t } = useTranslation()
   
  return (
    <div className="container">
      <ContactModal setIsOpen={setIsOpen} isOpen={isOpen}/> 
      <div className="pt-5 pb-[50px] lg:pb-10">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-y-4 mb-4 sm:gap-y-6 border-b border-custom-green-400 pb-10 md:pb-14">
          <ul className="flex flex-col sm:flex-row sm:gap-x-5 gap-y-5 text-center text-[16px] font-medium text-custom-gray-800">
            <li className="transition hover:text-custom-green-600">
              <Link to={"/about"}>{t("footer.about")}</Link>
            </li>
            <li className="transition hover:text-custom-green-600">
              <button onClick={openModal}>{t("footer.contact")}</button>
            </li>
            <li className="transition hover:text-custom-green-600">
              <Link to={"/faq"}>{t("footer.faq")}</Link>
            </li>
          </ul>

          <ul className="flex gap-x-4">
            <li>
              <Link target="_blank" to={"https://www.instagram.com/fruteacorp/"}>
                <img src={instagramIcon} alt="icon" />
              </Link>
            </li>
            <li>
              <Link target="_blank" to={"https://t.me/fruteacorp/"}>
                <img src={telegramIcon} alt="icon" />
              </Link>
            </li>
            <li>
              <Link target="_blank" to={"https://www.facebook.com/fruteacorp/"}>
                <img src={facebookIcon} alt="icon" />
              </Link>
            </li>
          </ul>
        </div>

        {/* <div className="flex flex-col items-center gap-y-3 md:gap-x-10 md:justify-between mx-auto md:flex-row">
          <div className="flex flex-col items-center gap-y-3 md:flex-row md:gap-x-5">
            <Link to={"/"} className="text-custom-gray-800 font-medium md:w-max transition hover:text-custom-gray-300">
            {t("footer.secret")}
            </Link>
            <Link to={"/"} className="text-custom-gray-800 font-medium md:w-max transition hover:text-custom-gray-300">
            {t("footer.use")}
            </Link>
          </div>
          <Link
            to={"/"}
            className="text-center text-[11px] font-normal text-[#7e818c] max-w-[288px] md:max-w-full transition hover:text-custom-gray-300"
          >
            {t("footer.fruteacorp")}
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
