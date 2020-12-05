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

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { contract } from "../../data/data";

const ContractDialog = (props) => {
   const { onClose, open, requester, product, tradeId } = props;

   const [page, setPage] = useState("main");
   const [agreement, setAgreement] = useState({
      agree1: false,
      agree2: false,
      agree3: false,
      agree4: false,
      agree5: false,
      agree6: false,
      agree7: false,
      agree8: false,
      agree9: false,
      agree10: false,
      agree11: false,
      agree12: false,
      agree13: false,
   });

   const handleOnAgree = (event) => {
      setAgreement({
         ...agreement,
         [event.target.name]: event.target.checked,
      });
   };

   const handleOnBack = () => {
      setPage("main");
   };
   const handleOnAllCheck = () => {
      setAgreement({
         agree1: true,
         agree2: true,
         agree3: true,
         agree4: true,
         agree5: true,
         agree6: true,
         agree7: true,
         agree8: true,
         agree9: true,
         agree10: true,
         agree11: true,
         agree12: true,
         agree13: true,
      });
   };

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

   const AccordionRender = ({ summary, agreeName, content }) => {
      const check = agreement[agreeName];
      return (
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <FormControlLabel
                  control={
                     <Checkbox
                        checked={check}
                        name={agreeName}
                        onChange={handleOnAgree}
                     />
                  }
                  label={summary}
               />
            </AccordionSummary>
            <AccordionDetails>
               <Typography color="textSecondary">{content}</Typography>
            </AccordionDetails>
         </Accordion>
      );
   };
   AccordionRender.propTypes = {
      summary: PropTypes.string.isRequired,
      agreeName: PropTypes.bool.isRequired,
      content: PropTypes.string.isRequired,
   };

   const MainAccordionRender = () => {
      return (
         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               계약 내용
            </AccordionSummary>
            <AccordionDetails>
               <div>
                  <div className="Row">
                     <h5>매도인(갑)</h5>
                  </div>
               </div>
            </AccordionDetails>
         </Accordion>
      );
   };

   switch (page) {
      case "contract":
         return (
            <Dialog open={open} onClose={handleClose}>
               <DialogTitle>농산물 포전매매 표준계약서</DialogTitle>
               <DialogContent>
                  <p>
                     아래 목적물을 포전매매 함에 있어 매도인(이하 “갑”이라고
                     한다)과 매수인(이하 “을”이라고 한다)은 다음과 같이 계약을
                     체결하고 신의성실의 원칙에 따라 이를 이행하여야 한다.
                  </p>
                  <MainAccordionRender />
                  {contract.map((agree, index) => {
                     return <AccordionRender key={index} {...agree} />;
                  })}
                  <small>
                     [주의사항] 농수산물유통 및 가격안정에 관한 법률
                     제90조제1항제2호에 따라 이 표준계약서와 다른 계약서를
                     사용하면서 ‘표준계약서’로 거짓표시 하거나, ‘농림축산식품부’
                     및 ‘농림축산식품부 표식’을 사용하는 매수인에게는 1천만원
                     이하의 과태료가 부과됩니다.
                  </small>
               </DialogContent>
               <DialogActions
                  style={{ display: "flex", justifyContent: "space-between" }}
               >
                  <Button onClick={handleOnAllCheck} color="primary">
                     전체동의
                  </Button>
                  <div>
                     <Button onClick={handleOnBack} color="primary">
                        뒤로가기
                     </Button>
                     <Button onClick={handleOnBack} color="primary">
                        다음
                     </Button>
                  </div>
               </DialogActions>
            </Dialog>
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

export default ContractDialog;
