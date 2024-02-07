import React, { Fragment, useState } from "react";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import RequesterInfoDialog from "../dialogs/RequesterInfoDialog";
import ContractDialog from "../dialogs/ContractDialog";
import CompleteDialog from "../dialogs/CompleteDialog";

const NoticeCardComp = (props) => {
   const { noticeType, requester, product, deposit } = props;
   const [openRequesterInfoDialog, setOpenRequesterInfoDialog] = useState(
      false
   );
   const [openContractDialog, setOpenContractDialog] = useState(false);
   const [openCompleteDialog, setOpenCompleteDialog] = useState(false);

   const handleNoticeClick = () => {
      switch (noticeType) {
         case "거래대기":
            return setOpenRequesterInfoDialog(true);
         case "거래진행":
            if (deposit) {
               return setOpenCompleteDialog(true);
            } else {
               return setOpenContractDialog(true);
            }
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
                  <small>{noticeType}</small>
               </div>
            );
         case "거래진행":
            return (
               <div className="Col">
                  <CompareArrowsIcon style={{ fontSize: 50 }} />
                  <small>{noticeType}</small>
               </div>
            );
         case "거래완료":
            return (
               <div className="Col">
                  <CheckCircleIcon style={{ fontSize: 50 }} />
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
      <div
         style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}
      >
         <div className="Row" style={{ marginTop: 10 }}>
            <NoticeIconRender />
            &emsp;
            <div onClick={handleNoticeClick} style={{ marginTop: 10 }}>
               <h5>{product.title}</h5>
               <div
                  className="Row"
                  style={{ justifyContent: "space-between", marginTop: 8 }}
               >
                  <small>from {requester.id}</small>
                  {noticeType === "거래진행" ? (
                     <small style={{ color: "lightgray" }}>[거래해약]</small>
                  ) : (
                     ""
                  )}
               </div>
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
      </div>
   );
};

export default NoticeCardComp;
