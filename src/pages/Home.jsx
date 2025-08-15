import { useTranslation } from "react-i18next";
import AboutUsCard from "../components/AboutUsCard";
import Banner from "../components/Banner";
import FamousCard from "../components/products/ProductCardsCollection";
import ProductSwiper from "../components/products/ProductSwiper";
import { useFetch } from "../hooks/useFetch";
import { getRandomElements } from "../hooks/getRandomItems";

function Home() {
  const { t } = useTranslation();

  const {data, loading} = useFetch("/products/most-sold")
  const {data: products, loading: productsLoading} = useFetch("/products?limit=50")

  const swipers = [
    { title: t("home.popular"), data: data, laoding: loading },
    { title: t("home.other"), data: getRandomElements(products), loading: productsLoading }
  ];
  
  return (
    <>
      <Banner />
      <FamousCard title={t("home.products")} />
      <AboutUsCard />
      <div className="container">
        {swipers?.map((swiper, index) => (
          <ProductSwiper key={index} title={swiper?.title} data={swiper?.data} loading={swiper?.loading} />
        ))}
      </div>
    </>
  );
}

export default Home;
