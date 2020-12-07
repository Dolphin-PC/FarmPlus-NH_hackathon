import {
   Avatar,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, getUserInfo } from "../../actions/userActions";

const RequesterInfoDialog = (props) => {
   const { onClose, open, requester, product, tradeId } = props;

   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);

   const handleClose = () => {
      onClose();
   };

   const handleOnDenied = () => {
      alert("거래 취소");
      onClose();
   };

   const handleOnAccept = () => {
      if (window.confirm("거래를 수락하시겠습니까?")) {
         if (dispatch(acceptRequest(user, tradeId, requester, product))) {
            alert("거래가 성사되었습니다!");
            dispatch(getUserInfo(user));
            onClose();
         }
      }
   };

   const DialogRender = (props) => {
      return (
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>거래신청이 들어왔습니다.</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
               <Button onClick={handleOnDenied} color="primary">
                  거절
               </Button>
               <Button onClick={handleOnAccept} color="primary">
                  수락
               </Button>
            </DialogActions>
         </Dialog>
      );
   };
   return (
      <DialogRender>
         <small>게시물 명</small>
         <br />
         {product.title}
         <br />
         <br />
         <small>신청자 정보</small>
         <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar>{requester.name[0]}</Avatar>
            &ensp;
            <p style={{ margin: 0 }}>
               {requester.name}
               <br />
               <small>{requester.address}</small>
            </p>
         </div>
         <div className="Row">
            <PhoneIcon />
            &ensp;
            <p style={{ margin: 0 }}>{requester.phoneNumber}</p>
         </div>
      </DialogRender>
   );
};

export default RequesterInfoDialog;
