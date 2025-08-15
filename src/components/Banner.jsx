import { Swiper, SwiperSlide } from "swiper/react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useFetch } from "../hooks/useFetch";
import banner from "../assets/images/banner.jpg"
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css";

function Banner() {
  const { data, error, loading } = useFetch("/banner");
  return (
    <div className="container relative">
      {loading ? (
        <div className="rounded-[20px] aspect-w-4 aspect-h-3 min-h-[160px] max-h-[420px] overflow-hidden">
          {/* Skeleton yuklanayotgan paytda banner joyi uchun */}
          <Skeleton className="w-full rounded-[20px] h-[160px] ss:h-[195px] sm:h-[210px] md:h-[260px] lg:h-[350px] xl:h-[415px]" />
        </div>
      ) : (
        <Swiper
          loop={true}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            960: {
              slidesPerView: 1,
              spaceBetween: 10,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              pagination: { clickable: true, el: ".swiper-pagination" },
            },
          }}
          navigation={false}
          pagination={false}
          modules={[Navigation, Pagination, Autoplay]}
          className="rounded-[20px] aspect-w-4 aspect-h-3 min-h-[160px] max-h-[420px]"
        >
          {data?.length > 0 ? data?.map((item) => (
            <SwiperSlide key={item?.id}>
              <a
                href={item?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[160px] ss:h-[195px] sm:h-[210px] md:h-[260px] lg:h-[350px] xl:h-[415px] overflow-hidden block"
              >
                <img
                  src={`http://170.64.234.64:6262/images/${item?.image}`}
                  alt={item?.title}
                  className="w-full object-cover h-[160px] ss:h-[195px] sm:h-[210px] md:h-[260px] lg:h-[350px] xl:h-[415px]"
                />
              </a>
            </SwiperSlide>
          )) : <SwiperSlide >
          <a
            href='#'
            target="_blank"
            rel="noopener noreferrer"
            className="h-[160px] ss:h-[195px] sm:h-[210px] md:h-[260px] lg:h-[350px] xl:h-[415px] overflow-hidden block"
          >
            <img
              src={banner}
              alt='banner'
              className="w-full object-cover h-[160px] ss:h-[195px] sm:h-[210px] md:h-[260px] lg:h-[350px] xl:h-[415px]"
            />
          </a>
        </SwiperSlide>}

          <div className="w-[95%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 lg:flex justify-between hidden">
            <div className="cursor-pointer min-w-[40px] min-h-[40px] flex justify-center items-center swiper-button-prev bg-[#ffffffb3] rounded-full  border border-[#36374040]">
              <GrPrevious className="text-gray-400" />
            </div>
            <div className="cursor-pointer min-w-[40px] min-h-[40px] flex justify-center items-center swiper-button-next bg-[#ffffffb3] rounded-full  border border-[#36374040]">
              <GrNext className="text-gray-400" />
            </div>
          </div>
          <div className="swiper-pagination lg:block hidden"></div>
        </Swiper>
      )}
    </div>
  );
}

export default Banner;
