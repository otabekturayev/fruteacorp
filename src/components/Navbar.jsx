import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo-1.png";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { TbShoppingBag, TbListSearch } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import uz from "../assets/uz.png";
import ru from "../assets/ru.png";
import en from "../assets/en.png";
import CategoryList from "./CategoryList";
import { isVisable } from "./auth/showModal";
import SearchModal from "./SearchModal";
import { useTranslation } from "react-i18next";
import FruteaCorpIcon from "./FruteaCorpIcon";

function Navbar() {
  const [openCategory, setOpenCategory] = useState(false);
  const [isModalSearch, setIsModalSearch] = useState(false);
  const [isModalSearchMob, setIsModalSearchMob] = useState(false);
  const navigate = useNavigate();
  const { onChangeIsOpenModalAuth, auth, cart } = useStore();
  const location = useLocation();
  const categoryRef = useRef(null);
  const { user, setSearch, search } = useStore();
  const searchRef = useRef(null);
  const searchRefMob = useRef(null);
  const { t, i18n } = useTranslation();
  const [size, setSize] = useState(30);

  const updateSize = () => {
    if (window.innerWidth >= 420) {
      setSize(35);
    } else {
      setSize(30);
    }
  };

  useEffect(() => {
    updateSize(); // Boshlang‘ich renderda tekshiradi
    window.addEventListener("resize", updateSize); // Ekran o‘lchami o‘zgarishiga kuzatuv qo‘shadi
    return () => window.removeEventListener("resize", updateSize); // Kuzatuvni tozalash
  }, []);

  useEffect(() => {
    setOpenCategory(false);
    setIsModalSearch(false);
    setIsModalSearchMob(false);
    setSearch("");
  }, [location]);

  const handleClickOutside = (event, ref, setModal) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setModal(false);
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event, searchRef, setIsModalSearch);
      handleClickOutside(event, searchRefMob, setIsModalSearchMob);
      handleClickOutside(event, categoryRef, setOpenCategory);
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function changeLng(text) {
    localStorage.setItem("fruteacorpLng", text);
    i18n.changeLanguage(text);
  }

  const onNavigate = (text) => {
    navigate(text);
  };

  const onNavigateUser = () => {
    if (auth) navigate("/user");
    isVisable("login", onChangeIsOpenModalAuth);
  };

  const searchProduct = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/products/search=${search}`);
      setSearch("");
    }
  };

  return (
    <div>
      <div className="hidden lg:flex bg-custom-green-200 w-full  justify-center text-[14px] font-medium text-custom-gray-800">
        <div className="border-r border-[#fff] pr-[10px] py-[10px]">
          {/* {t("header.discount")}{" "} */}
          <Link
            to="/products"
            className="hover:underline cursor-pointer font-semibold"
          >
            {t("header.now-buy")}
          </Link>
        </div>
        <Link
          to={"/faq"}
          className="py-[10px] px-[10px] border-r border-[#fff]"
        >
          {t("footer.faq")}
        </Link>
        {auth && (
          <Link
            to={"/user/orders"}
            className="py-[10px] px-[10px] border-r border-[#fff]"
          >
            {t("user.my-order")}
          </Link>
        )}
        <div className="flex gap-[10px] py-[10px] pl-[10px]">
          <span
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => changeLng("uz")}
          >
            <img className="w-full h-full" src={uz} alt="language uzbek" />
          </span>{" "}
          <span
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => changeLng("ru")}
          >
            <img className="w-full h-full" src={ru} alt="language russian" />
          </span>
          <span
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => changeLng("en")}
          >
            <img className="w-full h-full" src={en} alt="language english" />
          </span>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="fixed bottom-0 z-[99] py-[7px] w-full bg-white border-t-solid border-t-[1px] border-t-[rgba(54, 55, 64, .8)]">
          <nav className="container">
            <ul className="flex ">
              <li className="w-[20%] flex justify-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex flex-col items-center ss:text-[14px] ms:text-[12px] text-[10px] ss:font-medium gap-1 ${
                      isActive ? "text-custom-green-600" : "text-[#7e818c]"
                    }`
                  }
                >
                  <FruteaCorpIcon size={size} />
                  <span className="leading-[15px] text-center">
                    {t("header.home")}
                  </span>
                </NavLink>
              </li>
              <li className="w-[20%] flex justify-center">
                <NavLink
                  to="/category"
                  className={({ isActive }) =>
                    `flex flex-col items-center ss:text-[14px] ms:text-[12px] text-[10px] ss:font-medium gap-1 ${
                      isActive ? "text-custom-green-600" : "text-[#7e818c]"
                    }`
                  }
                >
                  <svg
                    data-v-2747b27c=""
                    width={size}
                    height={size}
                    viewBox="0 0 29 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ui-icon "
                  >
                    <g id="Icon">
                      <g id="Icon_2">
                        <path
                          d="M1.5 12.5C1.5 7.25329 5.75329 3 11 3C16.2467 3 20.5 7.25329 20.5 12.5C20.5 14.853 19.6445 17.0062 18.2276 18.6656L24.2795 24.6993C24.5728 24.9917 24.5735 25.4666 24.2811 25.7599C23.9886 26.0532 23.5138 26.054 23.2204 25.7615L17.1671 19.7264C15.5075 21.144 13.3537 22 11 22C5.75329 22 1.5 17.7467 1.5 12.5ZM11 4.5C6.58172 4.5 3 8.08172 3 12.5C3 16.9183 6.58172 20.5 11 20.5C15.4183 20.5 19 16.9183 19 12.5C19 8.08172 15.4183 4.5 11 4.5Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M22.75 6.00003C22.3358 6.00003 22 6.33582 22 6.75003C22 7.16424 22.3358 7.50003 22.75 7.50003H26.75C27.1642 7.50003 27.5 7.16424 27.5 6.75003C27.5 6.33582 27.1642 6.00003 26.75 6.00003H22.75Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M22.75 11.75C22.3358 11.75 22 12.0858 22 12.5C22 12.9142 22.3358 13.25 22.75 13.25H26.75C27.1642 13.25 27.5 12.9142 27.5 12.5C27.5 12.0858 27.1642 11.75 26.75 11.75H22.75Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M22.75 17.5C22.3358 17.5 22 17.8358 22 18.25C22 18.6642 22.3358 19 22.75 19H26.75C27.1642 19 27.5 18.6642 27.5 18.25C27.5 17.8358 27.1642 17.5 26.75 17.5H22.75Z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <span className="max-w-[72px] leading-[15px]">
                    {t("header.category")}
                  </span>
                </NavLink>
              </li>
              <li className="w-[20%] flex justify-center">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `flex flex-col items-center ss:text-[14px] ms:text-[12px] text-[10px] ss:font-medium relative gap-1 ${
                      isActive ? "text-custom-green-600" : "text-[#7e818c]"
                    }`
                  }
                >
                  <svg
                    data-v-2747b27c=""
                    width={size}
                    height={size}
                    viewBox="0 0 29 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ui-icon "
                  >
                    <g id="Icon">
                      <path
                        id="Icon_2"
                        d="M9.5 7C9.5 4.5444 11.4295 2 14.5 2C17.5705 2 19.5 4.54439 19.5 7H24V22.25C24 24.3211 22.3211 26 20.25 26H8.75C6.67893 26 5 24.3211 5 22.25V7H9.5ZM11 7H18C18 5.25561 16.6295 3.5 14.5 3.5C12.3705 3.5 11 5.2556 11 7ZM9.5 8.5H6.5V22.25C6.5 23.4926 7.50736 24.5 8.75 24.5H20.25C21.4926 24.5 22.5 23.4926 22.5 22.25V8.5H19.5V11.5H18V8.5H11V11.5H9.5V8.5Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                  <span className="max-w-[72px] leading-[15px]">
                    {t("header.basket")}
                  </span>
                  {cart?.items?.length > 0 && (
                    <span className="absolute -top-[5px] -right-[5px] bg-custom-green-600 text-[#fff] w-[20px] flex justify-center items-center text-[12px] h-[20px] rounded-[2px]">
                      {cart?.items?.length}
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="w-[20%] flex justify-center">
                <NavLink
                  to="/wishes"
                  className={({ isActive }) =>
                    `flex flex-col items-center ss:text-[14px] ms:text-[12px] text-[10px] ss:font-medium gap-1 ${
                      isActive ? "text-custom-green-600" : "text-[#7e818c]"
                    }`
                  }
                >
                  <svg
                    data-v-2747b27c=""
                    width={size}
                    height={size}
                    viewBox="0 0 29 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ui-icon "
                  >
                    <g id="Icon">
                      <path
                        id="Icon_2"
                        d="M9.02703 4C5.38324 4 2.5 6.96273 2.5 10.5391C2.5 16 9.99615 21.5 14.0055 24.8139C14.2885 25.062 14.7115 25.062 14.9945 24.8139C19 21.5 26.5 16 26.5 10.5391C26.5 6.96281 23.6178 4 19.973 4C17.2008 4 15.3841 5.6987 14.5 6.79192C13.6159 5.6987 11.7992 4 9.02703 4ZM4 10.5391C4 7.7779 6.22487 5.5 9.02703 5.5C11.7441 5.5 13.3368 7.65762 13.7573 8.32095C14.1013 8.86359 14.8987 8.86359 15.2427 8.32095C15.6632 7.65762 17.2559 5.5 19.973 5.5C22.776 5.5 25 7.77781 25 10.5391C25 15.1 18 20.5 14.5 23.2667C11 20.5 4 15.1 4 10.5391Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                  <span className="max-w-[72px] leading-[15px]">
                    {t("header.like")}
                  </span>
                </NavLink>
              </li>
              <li className="w-[20%] flex justify-center">
                <button
                  onClick={() => {
                    onNavigateUser();
                  }}
                  className={`flex flex-col items-center ss:text-[14px] ms:text-[12px] text-[10px] ss:font-medium gap-1 ${
                    location?.pathname === "/user"
                      ? "text-custom-green-600"
                      : "text-[#7e818c]"
                  }`}
                >
                  <svg
                    data-v-2747b27c=""
                    width={size}
                    height={size}
                    viewBox="0 0 29 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ui-icon "
                  >
                    <g id="Icon">
                      <g id="Icon_2">
                        <path
                          d="M14.5 3C11.4624 3 9 5.46243 9 8.5C9 11.5376 11.4624 14 14.5 14C17.5376 14 20 11.5376 20 8.5C20 5.46243 17.5376 3 14.5 3ZM10.5 8.5C10.5 6.29086 12.2909 4.5 14.5 4.5C16.7091 4.5 18.5 6.29086 18.5 8.5C18.5 10.7091 16.7091 12.5 14.5 12.5C12.2909 12.5 10.5 10.7091 10.5 8.5Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M14.5025 15C9.16883 15 4.5 19.0011 4.5 24C4.5 25.1046 5.39543 26 6.5 26H22.5C23.6046 26 24.5 25.1046 24.5 24C24.5 19.0057 19.8369 15 14.5025 15ZM6 24C6 19.9911 9.82583 16.5 14.5025 16.5C19.1783 16.5 23 19.9943 23 24C23 24.2761 22.7761 24.5 22.5 24.5H6.5C6.22386 24.5 6 24.2761 6 24Z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <span className="max-w-[72px] leading-[15px]">
                    {t("header.user")}
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="fixed top-0 py-[7px] w-full bg-[#fff] z-[90]">
          <div className="container ">
            <div className="flex items-center justify-between mb-[5px]">
              <Link to="/" className="w-[200px] cursor-pointer">
                <img className="sm:h-[30px] h-[20px]" src={logo} alt="logo" />
              </Link>
              <div className="flex gap-[10px]  pl-[10px]">
                <span
                  className="w-[20px] h-[20px] cursor-pointer"
                  onClick={() => changeLng("uz")}
                >
                  <img
                    className="w-full h-full"
                    src={uz}
                    alt="language uzbek"
                  />
                </span>{" "}
                <span
                  className="w-[20px] h-[20px] cursor-pointer"
                  onClick={() => changeLng("ru")}
                >
                  <img
                    className="w-full h-full"
                    src={ru}
                    alt="language russian"
                  />
                </span>
                <span
                  className="w-[20px] h-[20px] cursor-pointer"
                  onClick={() => changeLng("en")}
                >
                  <img
                    className="w-full h-full"
                    src={en}
                    alt="language english"
                  />
                </span>
              </div>
            </div>
            <div ref={searchRefMob} className="relative w-full">
              <form
                onSubmit={searchProduct}
                className="flex gap-[10px] items-center bg-custom-green-200  rounded-[10px] py-[5px] px-[10px]"
              >
                <button type="submit">
                  <IoIosSearch style={{ fontSize: "23px" }} />
                </button>
                <input
                  className=" placeholder:text-custom-green-600 ss:text-[16px] text-[14px] bg-transparent w-full focus:outline-none border-0 outline-0"
                  type="text"
                  placeholder={t("header.input-placeholder")}
                  onFocus={() => setIsModalSearchMob(true)}
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </form>
              {isModalSearchMob && (
                <div
                  className={`absolute top-[35px] z-[30] w-full bg-[#fff] rounded-[4px]`}
                >
                  <SearchModal height="max-h-[500px]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="hidden lg:flex h-[40px] mt-[20px]">
          <div className="flex items-center gap-[25px] mr-[7px]">
            <Link to="/" className="w-[250px] h-[40px] cursor-pointer">
              <img className="h-[40px]" src={logo} alt="logo" />
            </Link>
            <div ref={categoryRef} className="relative h-full ">
              <button
                onClick={() => setOpenCategory(!openCategory)}
                className="flex items-center transition-all duration-200 bg-custom-green-200 hover:bg-custom-green-400 px-[16px] h-full font-medium gap-2 text-[14px] rounded-[4px] text-custom-green-600"
              >
                {openCategory ? (
                  <IoCloseSharp style={{ fontSize: "23px" }} />
                ) : (
                  <BiCategoryAlt style={{ fontSize: "23px" }} />
                )}
                {t("header.category")}
              </button>
              <div
                className={`absolute z-50 top-[50px] transition-all duration-300 ${
                  openCategory ? "block" : "hidden"
                }`}
              >
                <CategoryList />
              </div>
            </div>
          </div>
          <div ref={searchRef} className="w-full ml-[2px] relative">
            <form
              onSubmit={searchProduct}
              className="w-full h-full flex justify-between border-solid border-custom-green-200 border-[1px] border-[rgba(54, 55, 64, .2)] rounded-[4px] "
            >
              <input
                className="pl-[16px] text-[14px] w-full focus:outline-none bg-transparent placeholder:text-custom-green-600"
                type="text"
                placeholder={t("header.input-placeholder")}
                onFocus={() => setIsModalSearch(true)}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button
                type="submit"
                className="bg-[#daf9da] px-[32px] hover:bg-custom-green-200"
              >
                <IoIosSearch style={{ fontSize: "24px" }} />
              </button>
            </form>

            {isModalSearch && (
              <div
                className={`absolute top-[40px] z-30 w-full bg-[#fff] rounded-[4px]`}
              >
                <SearchModal />
              </div>
            )}
          </div>
          <div className="flex gap-[8px] ml-[20px]">
            <button
              onClick={() => onNavigateUser()}
              className="flex items-center gap-[10px] font-medium  text-[14px] transition-all duration-200 hover:bg-custom-green-200 rounded-[4px] px-[8px]"
            >
              <FaRegUser style={{ fontSize: "20px" }} />
              <span className="hidden xl:block">
                {user ? user?.data?.firstName : t("register.open")}
              </span>
            </button>
            <button
              onClick={() => onNavigate("/wishes")}
              className="flex items-center gap-[10px] font-medium  text-[14px] transition-all duration-200 hover:bg-custom-green-200 rounded-[4px] px-[8px]"
            >
              <FaRegHeart style={{ fontSize: "20px" }} />
              <span className="hidden xl:block">{t("header.like")}</span>
            </button>
            <button
              onClick={() => onNavigate("/cart")}
              className=" flex items-center gap-[10px] font-medium  text-[14px] transition-all duration-200 hover:bg-custom-green-200 rounded-[4px] px-[8px]"
            >
              <TbShoppingBag style={{ fontSize: "20px" }} />
              <span className="hidden xl:block">{t("header.basket")}</span>
              {cart?.items?.length > 0 && (
                <span className=" bg-custom-green-600 text-[#fff] w-[20px] flex justify-center items-center text-[12px] h-[20px] rounded-[2px]">
                  {cart?.items?.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
