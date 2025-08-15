import { useTranslation } from "react-i18next";

const CardInfo = ({ ab }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${
        ab % 2 === 0 ? "bg-about3 md:bg-about2" : "bg-about4 md:bg-about1 flex-row-reverse"
      } flex md:py-10 bg-cover bg-center bg-no-repeat mb-2 md:mb-0`}
    >
      <div className="md:w-2/3 xl:w-1/2 py-20 px-10 bg-white/80 text-black/85 lg:text-[19px] font-roboto tracking-[0.025em] font-normal flex flex-col gap-y-5">
        <p className="font-semibold text-[24px]">{t(`about.section${ab}.title`)}</p>
        <p>{t(`about.section${ab}.line1`)}</p>
        <p>{t(`about.section${ab}.line2`)}</p>
        {ab=== 4 && <p>{t(`about.section${ab}.line3`)}</p>} 
      </div>
    </div>
  );
};

export default CardInfo;
