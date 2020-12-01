import React from "react";

const NoticeCardComp = ({ noticeType, requester, product }) => {
   return (
      <div className="Row">
         <p>{noticeType}</p>
         <div>
            <p>{product.title}</p>
            <p>{requester.name}</p>
         </div>
      </div>
   );
};

export default NoticeCardComp;
