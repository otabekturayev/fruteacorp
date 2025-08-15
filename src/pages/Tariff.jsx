import React from "react";
import { useFetch } from "../hooks/useFetch";
import TariffCard from "../components/TariffCard";
import { useTranslation } from "react-i18next";

const Tariff = () => {
  const { t } = useTranslation()
  
  const { data} = useFetch("/subscriptions");

  return (
    <div className="container">
      <div>
        <div className="text-center  lg:text-[40px] text-[30px] font-semibold font-['Roboto'] leading-[48px] lg:mb-[30px] mb-[20px]">
          {t("tariff.title")}
        </div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {
              data?.map(item => {
               return <TariffCard key={item?.id} item={item}/>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tariff;
