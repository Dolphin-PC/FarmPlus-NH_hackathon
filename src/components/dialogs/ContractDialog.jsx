import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Avatar,
   Button,
   Checkbox,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   FormControlLabel,
   Paper,
   Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest } from "../../actions/userActions";
import ContractPaperDialog from "./ContractPaperDialog";

const ContractDialog = (props) => {
   const { onClose, open, requester, product, tradeId } = props;
   const [page, setPage] = useState("main");

   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);

   const handleClose = () => {
      setPage("main");
      onClose();
   };

   const handleOnAccept = () => {
      alert("계약서 전송 이벤트");
   };

   const DialogRender = (props) => {
      return (
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>계약서 작성</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
               <Button onClick={handleOnAccept} color="primary">
                  전송
               </Button>
            </DialogActions>
         </Dialog>
      );
   };

   const ContractRender = (props) => {
      const [isAllCheck, setisAllCheck] = useState("false");
      const handleOnBack = () => {
         setPage("main");
      };
      const handleOnAllCheck = () => {
         alert("전체 동의");
         setPage("main");
      };

      return (
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>농산물 포전매매 표준계약서</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
               <Button onClick={handleOnBack} color="primary">
                  뒤로가기
               </Button>
               <Button
                  disabled={isAllCheck}
                  onClick={handleOnAllCheck}
                  color="primary"
               >
                  동의
               </Button>
            </DialogActions>
         </Dialog>
      );
   };
   const AccordionRender = (props) => {
      return (
         <Accordion>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-label="Expand"
               aria-controls="additional-actions1-content"
               id="additional-actions1-header"
            >
               <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label="I acknowledge that I should stop the click event propagation"
               />
            </AccordionSummary>
            <AccordionDetails>
               <Typography color="textSecondary">
                  The click event of the nested action will propagate up and
                  expand the accordion unless you explicitly stop it.
               </Typography>
            </AccordionDetails>
         </Accordion>
      );
   };

   switch (page) {
      case "contract":
         return (
            <ContractRender>
               <p>
                  아래 목적물을 포전매매 함에 있어 매도인(이하 “갑”이라고
                  한다)과 매수인(이하 “을”이라고 한다)은 다음과 같이 계약을
                  체결하고 신의성실의 원칙에 따라 이를 이행하여야 한다.
               </p>
               <AccordionRender />
               <small>
                  [주의사항] 농수산물유통 및 가격안정에 관한 법률
                  제90조제1항제2호에 따라 이 표준계약서와 다른 계약서를
                  사용하면서 ‘표준계약서’로 거짓표시 하거나, ‘농림축산식품부’ 및
                  ‘농림축산식품부 표식’을 사용하는 매수인에게는 1천만원 이하의
                  과태료가 부과됩니다.
               </small>
            </ContractRender>
         );

      default:
         return (
            <DialogRender>
               <Button
                  className="ContractButton"
                  onClick={() => setPage("contract")}
               >
                  <h5>계약 정보 확인 및 동의</h5>
               </Button>

               <Button className="ContractButton">
                  <h5>상대 정보 확인 및 동의</h5>
               </Button>
            </DialogRender>
         );
   }
};

const ButtonStyle = {
   padding: 20,
};

export default ContractDialog;
