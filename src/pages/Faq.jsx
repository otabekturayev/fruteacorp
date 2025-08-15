import React from 'react'
import Accordion from '../components/Accordion'
import { useTranslation } from 'react-i18next'

const Faq = () => {
   
  const { t, i18n} = useTranslation()

  const faqs = {
    uz: [
      {
        question: "1. Fruteacorp nima?",
        answer: "Fruteacorp – bu faqat choy mahsulotlarini taklif etuvchi onlayn do'kon. Bizning saytimiz orqali turli xil sifatli choy mahsulotlarini buyurtma qilib, ularni uyga yetkazib berish xizmatidan foydalanishingiz mumkin."
      },
      {
        question: "2. Mahsulotlarni qayerdan sotib olsam bo'ladi?",
        answer: "Fruteacorp mahsulotlari faqat bizning rasmiy saytda mavjud. Faqat onlayn buyurtmalarni qabul qilamiz va do'konlarimiz mavjud emas."
      },
      {
        question: "3. Yetkazib berish xizmati qanday ishlaydi?",
        answer: "Toshkent shahri ichidagi yetkazib berish bepul amalga oshiriladi. Boshqa viloyatlarga yetkazib berish esa O‘zbekiston pochta xizmati orqali amalga oshiriladi va bu xizmat pullikdir."
      },
      {
        question: "4. Buyurtma qancha vaqtda yetkazib beriladi?",
        answer: "Toshkent shahri ichidagi buyurtmalar odatda 2-3 ish kuni ichida yetkazib beriladi. Boshqa viloyatlarga yetkazib berish vaqti pochta xizmatiga bog‘liq ravishda o‘zgarishi mumkin."
      },
      {
        question: "5. Boshqa viloyatlarga yetkazib berish narxi qancha?",
        answer: "Toshkentdan tashqaridagi viloyatlarga pochta orqali yetkazib berish pullikdir va narx pochta xizmatiga bog'liq. Buyurtma berganingizda, yetkazib berish xarajatlari haqida batafsil ma’lumot beriladi."
      },
      {
        question: "6. To'lov usullari qanday?",
        answer: "Biz faqat Payme va Click orqali to'lovlarni qabul qilamiz. To'lovni amalga oshirayotganda ushbu tizimlardan birini tanlashingiz mumkin."
      },
      {
        question: "7. Mahsulotni qanday kuzatishim mumkin?",
        answer: "Buyurtmangizni kuzatish uchun sizga buyurtma raqami va kuzatuv raqami taqdim etiladi. Bu ma'lumotni hisobingizdagi \"Buyurtmalarim\" bo'limidan topishingiz mumkin."
      },
      {
        question: "8. Buyurtmam yetkazilmagan bo'lsa, nima qilishim kerak?",
        answer: "Agar buyurtmangiz belgilangan muddatda yetkazilmagan bo'lsa, mijozlarni qo'llab-quvvatlash xizmatiga murojaat qiling. Sizga yetkazib berish jarayonini kuzatishda yordam beramiz."
      },
      {
        question: "9. Buyurtmani qanday qilib qaytarish mumkin?",
        answer: "Agar mahsulot yetkazib berilganda nuqsonli yoki noto'g'ri bo'lsa, qaytarish uchun mijozlarni qo'llab-quvvatlash xizmatiga murojaat qilishingiz mumkin. Qaytarish shartlari va ko'rsatmalar haqida sizga ma’lumot beramiz."
      },
      {
        question: "10. Qo'shimcha savollarim bo'lsa, qanday bog'lanishim mumkin?",
        answer: "Bizning mijozlarni qo'llab-quvvatlash xizmatimiz bilan bog'lanish uchun bizga qo'ng'iroq qiling. Elektron pochta orqali savollarni yuborishingiz ham mumkin."
      }
    ],
    ru: [
      {
        question: "1. Что такое Fruteacorp?",
        answer: "Fruteacorp — это интернет-магазин, предлагающий только чайные продукты. Через наш сайт вы можете заказать различные качественные чаи и воспользоваться услугой доставки на дом."
      },
      {
        question: "2. Где можно купить продукцию?",
        answer: "Продукция Fruteacorp доступна только на нашем официальном сайте. Мы принимаем заказы только онлайн, и у нас нет магазинов."
      },
      {
        question: "3. Как работает служба доставки?",
        answer: "Доставка по городу Ташкент осуществляется бесплатно. Доставка в другие регионы Узбекистана осуществляется через почтовую службу и является платной услугой."
      },
      {
        question: "4. Сколько времени занимает доставка?",
        answer: "Заказы по городу Ташкент обычно доставляются в течение 2-3 рабочих дней. Срок доставки в другие регионы может варьироваться в зависимости от почтовой службы."
      },
      {
        question: "5. Сколько стоит доставка в другие регионы?",
        answer: "Доставка в регионы за пределами Ташкента является платной, и стоимость зависит от почтовой службы. При оформлении заказа вам будет предоставлена подробная информация о стоимости доставки."
      },
      {
        question: "6. Какие способы оплаты доступны?",
        answer: "Мы принимаем оплату только через системы Payme и Click. При оплате вы можете выбрать одну из этих систем."
      },
      {
        question: "7. Как я могу отследить свой заказ?",
        answer: "Для отслеживания вашего заказа вам будут предоставлены номер заказа и номер для отслеживания. Эту информацию можно найти в разделе «Мои заказы» в вашем аккаунте."
      },
      {
        question: "8. Что делать, если мой заказ не был доставлен?",
        answer: "Если ваш заказ не был доставлен в назначенный срок, обратитесь в службу поддержки клиентов. Мы поможем вам отследить процесс доставки."
      },
      {
        question: "9. Как вернуть заказ?",
        answer: "Если товар был доставлен с дефектом или неверным, вы можете обратиться в службу поддержки клиентов для его возврата. Мы предоставим информацию о условиях и процедуре возврата."
      },
      {
        question: "10. Как связаться, если у меня есть дополнительные вопросы?",
        answer: "Для связи с нашей службой поддержки клиентов позвоните нам. Вы также можете отправить свои вопросы по электронной почте."
      }
    ],
     en: [
      {
        question: "1. What is Fruteacorp?",
        answer: "Fruteacorp is an online store offering only tea products. You can order various high-quality tea products through our website and use our home delivery service."
      },
      {
        question: "2. Where can I buy the products?",
        answer: "Fruteacorp products are only available on our official website. We only accept online orders and do not have physical stores."
      },
      {
        question: "3. How does the delivery service work?",
        answer: "Delivery within Tashkent city is free of charge. For other regions, delivery is made via Uzbekistan Post and is a paid service."
      },
      {
        question: "4. How long does it take for the order to be delivered?",
        answer: "Orders within Tashkent city are usually delivered within 2-3 business days. Delivery to other regions may vary depending on the postal service."
      },
      {
        question: "5. What is the delivery cost for other regions?",
        answer: "Delivery outside Tashkent is paid and the cost depends on the postal service. When placing an order, you will be given detailed information about the delivery charges."
      },
      {
        question: "6. What payment methods are accepted?",
        answer: "We only accept payments through Payme and Click. You can choose one of these systems when making your payment."
      },
      {
        question: "7. How can I track my order?",
        answer: "To track your order, you will be provided with an order number and a tracking number. You can find this information in the \"My Orders\" section of your account."
      },
      {
        question: "8. What should I do if my order has not been delivered?",
        answer: "If your order has not been delivered within the specified time, please contact customer support. We will assist you in tracking your delivery."
      },
      {
        question: "9. How can I return an order?",
        answer: "If the product is defective or incorrect upon delivery, you can contact customer support for returns. We will provide you with the return instructions and conditions."
      },
      {
        question: "10. How can I contact you if I have additional questions?",
        answer: "To contact our customer support service, you can call us. You can also send questions via email."
      }
    ]
  } 

  const selectedFaqs = faqs[i18n.language] || [];
  
  return (
    <section className='container'>
      <div>
      <h2 className=' text-[20px] sm:text-[24px] font-bold mb-[15px] sm:mb-[30px]'>{t("faq.title")}</h2>
        {selectedFaqs?.map((item, index) => (
          <Accordion key={index} header={item?.question} body={item?.answer} />
        ))}
      </div>
    </section>
  )
}

export default Faq