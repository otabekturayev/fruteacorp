import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GrFormPreviousLink } from "react-icons/gr";
import { YMaps, Map } from "react-yandex-maps";
import { IoCloseSharp } from "react-icons/io5";
import marker from "./map-marker.svg";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FaLocationArrow } from "react-icons/fa6";
import AreaSelect from "./AreaSelect";
import { useFetch } from "../../hooks/useFetch";



const ModalMap = ({ setIsOpenMap, setAddressData, isOpenMap, area, setArea }) => {
  const {data} = useFetch("/areas")
  const mapRef = useRef(null);
  const { register, handleSubmit, setValue} = useForm();
  const [coordinates, setCoordinates] = useState([41.2995, 69.2401]);
  const [address, setAddress] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [cor, setCor] = useState([]);
  const [isError, setIsError] = useState(false)
  // const [input, setInput] = useState(null)

  const { t, i18n } = useTranslation();

  const onMapMove = (e) => {
    const mapInstance = e.get("map");
    const centerCoords = mapInstance.getCenter();
    setCoordinates(centerCoords);
    fetchAddress(centerCoords[0], centerCoords[1]);
    setCor(centerCoords);
  };

  const fetchAddress = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          {
            headers: {
              "accept-language": "uz"
            }
          }
        );
      
        const data = response.data;
        if (data?.display_name) {
              setAddress(data?.display_name); 
              setValue("address", data?.display_name); 
            } else {
              console.log("No address found for the given coordinates.");
            }
      } catch (error) {
        console.error("Geokoding xatosi:", error);
      }
    
  };

  // const fetchLocationByAddress = async (address) => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=10&countrycodes=UZ`, {
  //         headers: {
  //           "accept-language": "uz"
  //         }
  //       }
  //     );
  
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Manzil qidirishda xato:", error);
  //     toast.error("Manzilni qidirishda xatolik yuz berdi.");
  //   }
  // };

  // useEffect(() => {
  //    if(input){
  //     fetchLocationByAddress(input)
  //    }
  // }, [input])


  const onSubmit = (data) => {
    if(area){
      setAddressData({ ...data, lat: cor?.[0], long: cor?.[1] });
      setIsOpenMap(false);
      setModalOpen(false);
      setAddress("");
    }else{
      setIsError(true)
    }
  };

  useEffect(() => {
    if(area){
      setIsError(false)
    }
  }, [area])

  function isOpenModal() {
    if (address) {
      setModalOpen(true);
    }
  }


  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoordinates = [latitude, longitude];
          setCoordinates(userCoordinates); 
          setCor(userCoordinates); 
          fetchAddress(latitude, longitude);
          if (mapRef.current) {
            mapRef.current.panTo(userCoordinates, {
              delay: 3000,
            });
            setTimeout(() => {
              mapRef.current.setZoom(20); 
            }, 1000); 
            
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Joylashuvingizni olishda xatolik yuz berdi.");
        }
      );
    } else {
      toast.error(
        "Geolokatsiya funksiyasi sizning browseringizda qo'llab-quvvatlanmaydi."
      );
    }
  };

  useEffect(() => {
    if (isOpenMap) {
      getUserLocation();
    }
  }, [isOpenMap]);

  return (
    <div className="w-[100%] flex h-screen relative z-[99999]">
      <div className="sm:hidden block absolute bottom-0 w-full z-[9999] p-[8px] bg-[#fff] rounded-t-[10px]">
        <input
          className="w-full px-[10px] py-[5px] rounded-[10px] bg-custom-green-400 focus:outline-none"
          type="text"
          value={address}
          placeholder="Shahar, ko'cha, uy"
          readOnly
        />
        <button
          onClick={isOpenModal}
          className="w-full font-medium bg-custom-green-600 text-[#fff] rounded-[10px] p-[10px] mt-[8px]"
        >
          {t("map.delivering")}
        </button>
      </div>
      <div
        className="absolute top-[20px] right-[20px] z-20 w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex justify-center items-center cursor-pointer text-[28px] rounded-[50%] bg-custom-green-400"
        onClick={() => setIsOpenMap(false)}
      >
        <IoCloseSharp />
      </div>
      <div
        className={`lg:max-w-[464px] h-screen sm:min-w-[340px] sm:p-[32px] p-[16px] bg-[#fff]  sm:static absolute z-[9999999] w-full transition-all duration-600  top-0 ${
          modalOpen ? "left-0" : "-left-[100%]"
        }`}
      >
        <button
          onClick={() => setIsOpenMap(false)}
          className="w-[28px] h-[28px] mb-[16px] bg-custom-green-400 rounded-[50%] sm:flex hidden justify-center items-center text-[20px]"
        >
          <GrFormPreviousLink />
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="w-[28px] h-[28px] mb-[16px] bg-custom-green-400 rounded-[50%] flex justify-center items-center text-[20px] sm:hidden "
        >
          <GrFormPreviousLink />
        </button>
        <div className="py-[16px] sm:block hidden">
          <h3 className="text-[24px] font-medium">{t("map.title")}</h3>
          <p className="mt-[8px]">{t("map.choose-map")}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input className="p-[10px] block w-full border  border-custom-green-400 rounded-[10px] focus:outline-none" type="text" onChange={(e) => setInput(e.target.value)}/> */}
          <div className="mb-[10px]">
              <span className="text-[12px]">{t("map.choose-area")} *</span>
              <AreaSelect isOpenMap={isOpenMap} isError={isError}  options={data} onSelect={setArea} placeholder={t("map.choose-area")}/>
          </div>
          <div className="mb-[10px]">
            <label>
              <span className="text-[12px]">{t("map.streetName")}*</span>
              <input
                type="text"
                {...register("address", { required: true })}
                className="p-[10px] block w-full border border-custom-green-400 rounded-[10px] focus:outline-none"
                placeholder={t("map.streetName")}
                value={address}
                readOnly
              />
            </label>
          </div>
          {/* <div className="flex gap-[15px] mb-[10px] w-full">
            <label className="w-full">
              <span className="text-[12px]">{t("map.house")}</span>
              <input
                type="text"
                {...register("house")}
                className="p-[10px] block w-full border  border-custom-green-400 rounded-[10px] focus:outline-none"
                placeholder={t("map.house")}
              />
            </label>
            <label className="w-full">
              <span className="text-[12px]">{t("map.way")}</span>
              <input
                type="text"
                {...register("way")}
                className="p-[10px] block w-full border  border-custom-green-400 rounded-[10px] focus:outline-none"
                placeholder={t("map.way")}
              />
            </label>
          </div> */}
          {/* <div className="flex gap-[15px] mb-[10px]">
            <label className="w-full">
              <span className="text-[12px]">{t("map.floor")}</span>
              <input
                type="text"
                {...register("floor")}
                className="p-[10px] block w-full border  border-custom-green-400 rounded-[10px] focus:outline-none"
                placeholder={t("map.floor")}
              />
            </label>
            <label className="w-full">
              <span className="text-[12px]">{t("map.entry-code")}</span>
              <input
                type="text"
                {...register("domofon")}
                className="p-[10px] block w-full border  border-custom-green-400 rounded-[10px] focus:outline-none"
                placeholder={t("map.entry-code")}
              />
            </label>
          </div> */}
          <div className="mb-[10px]">
            <label>
              <span className="text-[12px]">{t("map.delivery-info")}</span>
              <input
                type="text"
                {...register("message")}
                className="p-[10px] block w-full border  border-custom-green-400 rounded-[10px] focus:outline-none"
                placeholder={t("map.delivery-info")}
              />
            </label>
            <div className="text-[12px] text-custom-gray-500 mt-[10px]">
              {t("map.delivery-comment")}
            </div>
          </div>
          <button
            className="bg-custom-green-600 text-[#fff] w-full p-[13px] rounded-[10px] hover:opacity-[0.8]"
            type="submit"
          >
            {t("map.delivering")}
          </button>
        </form>
      </div>
      <div className="w-full h-screen">
        <YMaps query={{ lang: i18n.language === "uz" ? "uz_UZ" : i18n.language === "ru" ? "ru_RU" : "en_US" }}>
          <div className="relative w-full h-full">
            <Map
              instanceRef={(ref) => (mapRef.current = ref)}
              defaultState={{ center: coordinates, zoom: 12 }}
              width="100%"
              height="100%"
              onBoundsChange={onMapMove}
            ></Map>
            <div
              className="absolute z-[99999] left-[50%] -translate-x-1/2 -translate-y-1/2"
              style={{ top: "calc(50% - 30px)" }}
            >
              <img className="w-[70px] h-[55px]" src={marker} alt="Marker" />
            </div>
            <div className="absolute z-[99999] bottom-[15%] sm:bottom-[5%] right-[3%] border w-[40px] h-[40px] text-[23px] flex items-center justify-center rounded-[50%] bg-custom-green-400">
              <button onClick={getUserLocation}>
                <FaLocationArrow />
              </button>
            </div>
          </div>
        </YMaps>
      </div>
    </div>
  );
};

export default ModalMap;
