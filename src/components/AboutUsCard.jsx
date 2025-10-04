import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import banner from "../assets/images/banner.jpg";

const AboutUsCard = () => {
  const { data, loading } = useFetch("/banner");
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomImage(data[randomIndex]);
    }
  }, [data]);

  if (loading) {
    return (
      <section className="mt-10 mb-10">
        <div className="container">
          <Skeleton
            height={415}
            className="w-full h-[160px] ss:h-[195px] sm:h-[210px] md:h-[260px] lg:h-[350px] xl:h-[415px] rounded-[20px]"
          />
        </div>
      </section>
    );
  }

  const imageUrl = data?.length
    ? `https://api.fruteacorp.uz/images/${randomImage?.image}`
    : banner;

  const ImageElement = (
    <div className="w-full h-auto overflow-hidden rounded-[20px]">
      <img
        src={imageUrl}
        alt="about us page"
        className="rounded-[20px] duration-[0.2s] cursor-pointer hover:scale-[1.01] w-full object-fill h-auto"
      />
    </div>
  );

  return (
    <section className="mt-10 mb-10">
      <div className="container">
        {randomImage?.link ? (
          <a
            href={randomImage.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ImageElement}
          </a>
        ) : (
          ImageElement
        )}
      </div>
    </section>
  );
};

export default AboutUsCard;
