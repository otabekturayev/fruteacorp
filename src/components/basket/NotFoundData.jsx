import { Link } from "react-router-dom";
import notProductImg from "../../assets/images/not-product.png";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { useStore } from "../../store/store";

const NotFoundData = () => {

  const { user } = useStore()
 
  const { t } = useTranslation()

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
   
  return (
    <div className="w-full flex justify-center flex-col items-center mb-20">
      <div className="max-w-[300px] mb-6 rounded-[30px]">
      {!imageLoaded && <Skeleton className="w-[300px] h-[300px]"/>}
        <img
          src={notProductImg}
          alt="not data"
          className={`${imageLoaded ? "block" : "hidden"}`}
          onLoad={handleImageLoad}
        />
      </div>
      <h3 className="font-inter text-[1.375rem] font-semibold mb-4">
        {t("basket.no-data")}
      </h3>
      <p className="font-inter text-[0.8rem] font-normal mb-4">
      {t("basket.add-product")}
      </p>
      <Link
        to={"/"}
        className="bg-green-600 rounded-[4px] hover:opacity-85 transition text-white font-inter text-[0.875rem] font-medium py-[7px] px-[14px]"
      >
        {user ? t("basket.home") : t("wishes.login-user")}
      </Link>
    </div>
  );
};

export default NotFoundData;
