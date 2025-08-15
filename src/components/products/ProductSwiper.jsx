import { Swiper, SwiperSlide } from "swiper/react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import "swiper/css";
import ProductCard from "./ProductCard";
import { Navigation } from "swiper/modules";

const ProductSwiper = ({title = '', data, loading}) => {

  return (
    <section className="mb-10">
      <h2 className="text-[20px] md:text-[24px] xl:text-[28px] capitalize font-semibold font-inter mb-5">
        {title}
      </h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 5
          },
          370: {
            slidesPerView: 2,
          },
          515: {
            slidesPerView: 3,
          },
          680: {
            slidesPerView: 4,
          },
          960: {
            slidesPerView: 5,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
      >
        {loading ? <><SwiperSlide >
                <ProductCard product={null} />
              </SwiperSlide> <SwiperSlide >
                <ProductCard product={null} />
              </SwiperSlide> <SwiperSlide >
                <ProductCard product={null} />
              </SwiperSlide> <SwiperSlide >
                <ProductCard product={null} />
              </SwiperSlide> <SwiperSlide >
                <ProductCard product={null} />
              </SwiperSlide></>:
          data?.map((elem, index) => {
            return (
              <SwiperSlide key={index}>
                <ProductCard product={elem} loading={loading}/>
              </SwiperSlide>
            );
          })}

        <div className="w-[99%] absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-between">
          <div className="cursor-pointer w-[32px] h-[32px] md:w-[36px] md:h-[36px] hover:opacity-80 flex justify-center items-center swiper-button-prev bg-[#1d1d1d85] rounded-[20px]">
            <GrPrevious className="text-gray-100 " />
          </div>
          <div className="cursor-pointer w-[32px] h-[32px] md:w-[36px] md:h-[36px] hover:opacity-80 flex justify-center items-center swiper-button-next bg-[#1d1d1d85] rounded-[20px]">
            <GrNext className="text-gray-100 " />
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default ProductSwiper;
