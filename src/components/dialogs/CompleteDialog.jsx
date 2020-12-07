import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   InputLabel,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { receivedTransferAccountNumber } from "../../api/simplePayActions";
import ContractAccordionComp from "../accordions/ContractAccordionComp";

const CompleteDialog = (props) => {
   const { onClose, open, requester, product, tradeId } = props;

   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);

   const handleClose = () => {
      onClose();
   };
   const handleOnAccept = () => {
      // 구매자 일 경우, 거래 종료
      if (user.user.id === requester.id) {
         return alert("판매자에게 계약금이 전달되었습니다. 감사합니다.");
      }

      // 판매자 일 경우, 돈 입금이체 신청
      if (window.confirm("입금 이체를 신청하시겠습니까?")) {
         if (receivedTransferAccountNumber(user, product, tradeId)) {
            alert("정상적으로 처리되었습니다.");
            // TODO: 입금이체 성공 후, 해당 trade에 isComplete[true]처리
            onClose();
         } else {
            alert("오류가 발생했습니다.(console 확인)");
         }
      }
   };

   const DialogRender = (props) => {
      return (
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>거래 성사</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  아니오
               </Button>
               <Button onClick={handleOnAccept} color="primary">
                  예
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
         <ContractAccordionComp product={product} requester={requester} />

         <br />
         <InputLabel>거래를 완료하시겠습니까?</InputLabel>
      </DialogRender>
   );
};

export default CompleteDialog;
