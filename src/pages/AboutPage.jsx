import CardInfo from "../components/about/CardInfo";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const {t} = useTranslation()
  return (
    <>
      <div className="container">
        <h2 className="text-center text-2xl md:text-3xl xl:text-4xl font-medium font-roboto text-black/70 space-x-1 mb-1">
          {t("about.title")}
        </h2>
        <div className="h-[1px] bg-black/60 mb-10 w-28 mx-auto"></div>

        <CardInfo ab={1} />
        <CardInfo ab={2} />
        <CardInfo ab={3} />
        <CardInfo ab={4} />
      </div>
    </>
  );
};

export default AboutPage;
