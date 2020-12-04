import React, { Fragment, useState } from "react";
import RateReviewIcon from "@material-ui/icons/RateReview";
import RequesterInfoDialog from "../dialogs/RequesterInfoDialog";

const NoticeCardComp = (props) => {
   const { noticeType, requester, product } = props;
   const [open, setOpen] = useState(false);

   const handleNoticeClick = () => {
      setOpen(true);
   };

   const NoticeIconRender = () => {
      switch (noticeType) {
         case "거래신청":
            return (
               <div className="Col">
                  <RateReviewIcon style={{ fontSize: 50 }} />
                  <small>{noticeType}</small>
               </div>
            );
         default:
            return (
               <div className="Col">
                  <RateReviewIcon style={{ fontSize: 50 }} />
                  <small>{noticeType}</small>
               </div>
            );
      }
   };

   return (
      <div className="Row" style={{ marginTop: 10 }}>
         <NoticeIconRender />
         &emsp;
         <div onClick={handleNoticeClick}>
            <h5>{product.title}</h5>
            <small>from {requester.name}</small>
         </div>
         <RequesterInfoDialog
            open={open}
            onClose={() => setOpen(!open)}
            {...props}
         />
      </div>
   );
};

export default NoticeCardComp;
