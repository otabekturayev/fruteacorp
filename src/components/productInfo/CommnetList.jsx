import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  const { t } = useTranslation();
  const [visibleComments, setVisibleComments] = useState(5);

  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 5);
  };

  return <>
  {
    comments?.length > 0 ? <div className="mt-[30px]">
    <h2 className="text-[24px] text-custom-gray-800 font-medium border-b pb-[20px] mb-[30px] border-custom-green-400">
      {t("product-info.comments")}, <span className="text-custom-gray-500">{comments?.length} {t("product-info.com")}</span>
    </h2>
    <ul>
      {comments?.slice(0, visibleComments)?.map((comment, index) => <CommentItem comment={comment} key={index}/>)}
    </ul>
    {
      visibleComments < comments?.length && (
        <div className="flex justify-center mt-[20px]">
          <button
            onClick={handleShowMore}
            className="px-3 py-2 bg-custom-green-600 text-white rounded"
          >
            {t("product-info.show-more")}
          </button>
        </div>
      )}
  </div> : <div className="mt-[30px] flex justify-center w-full">{t("product-info.no-comment")}</div>
  }
  </>;
};

export default CommentList;
