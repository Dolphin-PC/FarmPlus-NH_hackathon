import React, { Fragment, useState } from "react";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import RequesterInfoDialog from "../dialogs/RequesterInfoDialog";
import ContractDialog from "../dialogs/ContractDialog";
import CompleteDialog from "../dialogs/CompleteDialog";

const NoticeCardComp = (props) => {
   const { noticeType, requester, product } = props;
   const [openRequesterInfoDialog, setOpenRequesterInfoDialog] = useState(
      false
   );
   const [openContractDialog, setOpenContractDialog] = useState(false);
   const [openCompleteDialog, setOpenCompleteDialog] = useState(false);

   const handleNoticeClick = () => {
      switch (noticeType) {
         case "거래대기":
            return setOpenRequesterInfoDialog(true);
         case "거래진행중":
            return setOpenContractDialog(true);
         case "거래완료":
            return setOpenCompleteDialog(true);
         default:
            return;
      }
   };

   const NoticeIconRender = () => {
      switch (noticeType) {
         case "거래대기":
            return (
               <div className="Col">
                  <RateReviewIcon style={{ fontSize: 50 }} />
               </div>
            );
         case "거래진행중":
            return (
               <div className="Col">
                  <CompareArrowsIcon style={{ fontSize: 50 }} />
               </div>
            );
         case "거래완료":
            return (
               <div className="Col">
                  <CheckCircleIcon style={{ fontSize: 50 }} />
               </div>
            );
         default:
            return (
               <div className="Col">
                  <RateReviewIcon style={{ fontSize: 50 }} />
               </div>
            );
      }
   };

   return (
      <div className="Post">
         <div className="Row" style={{ marginTop: 10 }}>
            <NoticeIconRender />
            &emsp;
            <div onClick={handleNoticeClick}>
               <h5>{product.title}</h5>
               <small>from {requester.id}</small>
            </div>
            <RequesterInfoDialog
               open={openRequesterInfoDialog}
               onClose={() =>
                  setOpenRequesterInfoDialog(!openRequesterInfoDialog)
               }
               {...props}
            />
            <ContractDialog
               open={openContractDialog}
               onClose={() => setOpenContractDialog(!openContractDialog)}
               {...props}
            />
            <CompleteDialog
               open={openCompleteDialog}
               onClose={() => setOpenCompleteDialog(!openCompleteDialog)}
               {...props}
            />
         </div>
         <small>{noticeType}</small>
      </div>
   );
};

export default NoticeCardComp;
