import {
   Avatar,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   InputLabel,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, getUserInfo } from "../../actions/userActions";
import * as Color from "../../assets/colors";
import DrawerText from "../Drawer/DrawerText";

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
            <DialogTitle>거래요청</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
               {user.user.id === requester.id ? (
                  "거래 대기중입니다..."
               ) : (
                  <Fragment>
                     <Button onClick={handleOnDenied} color="primary">
                        거절
                     </Button>
                     <Button onClick={handleOnAccept} color="primary">
                        수락
                     </Button>
                  </Fragment>
               )}
            </DialogActions>
         </Dialog>
      );
   };
   return (
      <DialogRender>
         <div style={{ marginBottom: "20px" }}>
            <InputLabel>게시물 명</InputLabel>
            <p>{product.title}</p>
         </div>

         <div>
            <InputLabel>신청자 정보</InputLabel>
            <div className="Account-Bank-Box">
               <DrawerText left="이름" right={requester.name} />
               <DrawerText left="주소" right={requester.address} />
               <DrawerText left="전화번호" right={requester.phoneNumber} />
            </div>
            {/* <div className="Row Post" style={{ paddingRight: 10 }}>
               <Avatar style={{ backgroundColor: Color.mainColor }}>
                  {requester.name[0]}
               </Avatar>
               &emsp;
               <small style={{ margin: "auto 0" }}>{requester.name}</small>
            </div>

            <div className="Row Post" style={{ paddingRight: 10 }}>
               <Avatar style={{ backgroundColor: Color.secondColor }}>
                  <HomeIcon />
               </Avatar>
               &emsp;
               <small style={{ margin: "auto 0" }}>{requester.address}</small>
            </div>

            <div className="Row Post" style={{ paddingRight: 10 }}>
               <Avatar style={{ backgroundColor: Color.thirdColor }}>
                  <PhoneIcon />
               </Avatar>
               &emsp;
               <small style={{ margin: "auto 0" }}>
                  {requester.phoneNumber}
               </small>
            </div> */}
         </div>
      </DialogRender>
   );
};

export default RequesterInfoDialog;
