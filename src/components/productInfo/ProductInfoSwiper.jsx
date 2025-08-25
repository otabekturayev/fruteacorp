import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

// import required modules
import { FreeMode, Navigation, Thumbs, Mousewheel } from "swiper/modules";

const ProductInfoSwiper = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="flex flex-row-reverse xl:min-w-[550px] xl:h-[558px] lg:min-w-[470px] lg:h-[475px] md:min-w-[350px] md:h-[360px] max-w-full sm:max-h-[500px] ss:max-h-[400px] max-h-[300px]">
        <Swiper
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          }}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 xl:w-[420px] xl:h-[558px] lg:w-[340px] lg:h-[475px] md:w-[250px] md:h-[360px] max-w-[75%]"
        >
          {images?.map((item, index) => (
            <SwiperSlide
              key={item?.image?.id || index} 
              className="xl:w-[420px] xl:h-[558px] lg:w-[340px] lg:h-[475px] md:w-[250px] md:h-[360px] max-w-[100%] "
            >
              <img
                className="object-contain w-full h-full xl:w-[500px] xl:h-[500px] select-none"
                src={`https://api.fruteacorp.uz/images/${item?.image?.name}`}
                alt={`Product image ${index + 1}`} 
              />
            </SwiperSlide>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] z-10 flex justify-between">
            <div className="cursor-pointer w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex justify-center items-center swiper-button-prev bg-[#72727285]  rounded-[20px] p-2 hover:opacity-80">
              <GrPrevious className="text-gray-100" />
            </div>
            <div className="cursor-pointer w-[32px] h-[32px] md:w-[36px] md:h-[36px] hover:opacity-80 flex justify-center items-center swiper-button-next bg-[#72727285] rounded-[20px]">
              <GrNext className="text-gray-100 " />
            </div>
          </div>
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3.5}
          breakpoints={{
            300: {
              slidesPerView: 3.5
            },
            600: {
              slidesPerView: 4
            },
            960: {
              slidesPerView: 4.5,
            },
          }}
          direction={"vertical"}
          mousewheel={true}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
          className="mySwiper"
        >
          {images?.map((item, index) => (
            <SwiperSlide
              key={item?.image?.id || index} 
              className="xl:w-[84px] xl:h-[112px] w-[60px] h-[80px] "
            >
              <img
                className="object-contain xl:w-[84px] xl:h-[112px] w-[60px] h-[80px] select-none cursor-pointer"
                src={`https://api.fruteacorp.uz/images/${item?.image?.name}`}
                alt={`Thumbnail image ${index + 1}`} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductInfoSwiper;
