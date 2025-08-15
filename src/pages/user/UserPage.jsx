import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import { useStore } from "../../store/store";

const UserPage = () => {
  const { user } = useStore();
  const { t } = useTranslation();

  const navLinkClass = (isActive) =>
    `${
      isActive
        ? "bg-custom-green-200"
        : "hover:bg-custom-green-200 hover:bg-opacity-65"
    } py-3 text-[14px] sm:text-[18px] px-[10px] w-full flex rounded-[8px] font-inter font-normal transition text-custom-gray-800`;

  return (
    <div className="mb-6">
      <div className="container">
        <h2 className="text-[24px] font-semibold text-custom-gray-800 font-inter mb-10">
          {user?.data?.firstName} {user?.data?.lastName}
        </h2>
        <div className="flex flex-col lg:flex-row gap-y-5 gap-x-5 w-full">
          <div className="w-[322px]">
            <ul className="flex lg:flex-col gap-1">
              <li>
                <NavLink
                  to={"/user/orders"}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  {t("user.my-order")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/user/settings"}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  {t("user.my-info")}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="w-full lg:calc">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
