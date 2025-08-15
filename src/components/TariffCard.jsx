import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import axios from "../../axios"
import { useTranslation } from "react-i18next";

const TariffCard = ({ item }) => {
    
  const [items, setItems] = useState([]);

  useEffect(() => {
    const htmlString = item?.description;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const listItems = Array.from(doc.querySelectorAll("ul > li")).map((li) =>
      li.textContent.trim()
    );

    setItems(listItems);
  }, []);
  const buyTariff = async (id) => {
    try {
      const response = await api.post(`/subscriptions/purchase/${id}`);
      if(response?.status >= 200 && response.status <= 300){
        const paymeUrl = response?.data?.data?.paymeUrl;
      if (paymeUrl) {
        window.open(paymeUrl, "_blank"); 
      }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const { t } = useTranslation()

  return (
    <div className="max-w-[400px] bg-white rounded-2xl border border-custom-green-400 flex-col justify-between flex px-8 py-8 ">
      <div >
        <div className="flex-col items-center gap-3 flex">
          <div className="px-[26px] justify-center items-center inline-flex">
            <div className="text-center lg:text-[35px] text-[30px] font-semibold ">
              {item?.price} {t("tariff.usd")}
            </div>
          </div>
          <div>
            <div className="lg:text-[20px] text-[18px] font-semibold">
              {item?.duration} {t("tariff.month")}
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="flex-col gap-4 flex min-h-[200px]">
            {items?.map((item, index) => {
              return (
                <div className="gap-3 flex" key={index}>
                  <div className="w-6 h-6 bg-custom-green-400 rounded-xl flex items-center justify-center">
                    <FaCheck className="text-custom-green-600" />
                  </div>
                  <div className=" text-[#758195]">{item}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-5 py-3 bg-custom-green-600 rounded-lg border border-custom-green-600 ">
        <button onClick={() => buyTariff(item?.id)} className="text-white font-medium w-full">{t("tariff.buy-tariff")}</button>
      </div>
    </div>
  );
};

export default TariffCard;
