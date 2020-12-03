import React, { Fragment, useState } from "react";
import RateReviewIcon from "@material-ui/icons/RateReview";
import RequesterInfoDialog from "../dialogs/RequesterInfoDialog";

const NoticeCardComp = (props) => {
   const { noticeType, requester, product } = props;
   const [open, setOpen] = useState(false);

   const handleNoticeClick = () => {
      setOpen(true);
   };

   return (
      <div className="Row" style={{ marginTop: 10 }}>
         {noticeType === "거래신청" ? (
            <div className="Col">
               <RateReviewIcon style={{ fontSize: 50 }} />
               <small>{noticeType}</small>
            </div>
         ) : (
            <RateReviewIcon />
         )}
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
