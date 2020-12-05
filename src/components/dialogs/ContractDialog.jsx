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
   InputLabel,
   Paper,
   TextField,
   Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getToday } from "../../app/functions";

import { contract } from "../../data/data";
import { Check } from "@material-ui/icons";
import { sendContract } from "../../actions/contractActions";

const ContractDialog = (props) => {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);
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
   const [isContractAgree, setIsContractAgree] = useState(false);

   useEffect(() => {
      user.user.trade.map((trade) => {
         if (trade.tradeId === tradeId) {
            if (trade.isContract) {
               setPage("deposit");
            }
         }
      });
   }, [page]);

   const handleOnAgree = (event) => {
      setAgreement({
         ...agreement,
         [event.target.name]: event.target.checked,
      });
   };

   const handleOnBack = () => {
      setPage("main");
   };
   const handleOnNext = () => {
      for (var i in agreement) {
         if (!agreement[i]) {
            return alert("모든 조항의 동의가 필요합니다.");
         }
      }

      setIsContractAgree(true);
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
      if (!isContractAgree)
         return alert("계약 정보 확인 및 동의가 필요합니다.");

      if (sendContract(user, tradeId)) {
         alert("계약서 전송에 성공하였습니다.");
         handleClose();
      }
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
               <div style={{ width: "100%" }}>
                  <div
                     className="Row"
                     style={{ border: "1px solid lightgray", padding: 10 }}
                  >
                     <p>매도인(갑)</p>&emsp;
                     <div className="Col">
                        <small>{product.name}</small>
                        <small>{product.phoneNumber}</small>
                        <small>product.birthDay</small>
                        <small>product.address</small>
                     </div>
                  </div>
                  <br />
                  <div
                     className="Row"
                     style={{ border: "1px solid lightgray", padding: 10 }}
                  >
                     <p>매수인(을)</p>&emsp;
                     <div className="Col">
                        <small>{requester.name}</small>
                        <small>{requester.phoneNumber}</small>
                        <small>requester.birthDay</small>
                        <small>requester.address</small>
                     </div>
                  </div>
                  <br />
                  <InputLabel>
                     <small>소재지</small>&ensp;<b>{product.location}</b>
                  </InputLabel>
                  <InputLabel>
                     <small>품목</small>&ensp;<b>{product.category}</b>
                  </InputLabel>
                  <InputLabel>
                     <small>품종</small>&ensp;<b>product.subCategory</b>
                  </InputLabel>
                  <InputLabel>
                     <small>계약면적</small>&ensp;
                     <b>{product.size.toLocaleString()} 평</b>
                  </InputLabel>
                  <InputLabel>
                     <small>파종일</small>&ensp;<b>product.plantDay</b>
                  </InputLabel>
                  <InputLabel>
                     <small>반출일</small>&ensp;<b>product.outDay</b>
                  </InputLabel>
                  <InputLabel>
                     <small>총 매매대금</small>&ensp;
                     <b>{product.cost.toLocaleString()} 원</b>
                  </InputLabel>
                  <br />
                  <InputLabel style={{ textAlign: "center" }}>
                     <small>계약일</small>&ensp;
                     <b>{getToday()}</b>
                  </InputLabel>
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
                     <Button onClick={handleOnNext} color="primary">
                        다음
                     </Button>
                  </div>
               </DialogActions>
            </Dialog>
         );

      case "deposit":
         return (
            <Dialog open={open} onClose={handleClose}>
               <DialogTitle>계약금 송금하기</DialogTitle>
               <DialogContent>거래 정보 표시</DialogContent>
               <DialogActions>
                  <Button onClick={handleOnNext} color="primary">
                     송금
                  </Button>
               </DialogActions>
            </Dialog>
         );

      default:
         return (
            <DialogRender>
               <Button
                  className="ContractButton"
                  onClick={() => setPage("contract")}
                  color="primary"
                  variant="outlined"
               >
                  <h5>
                     계약 정보 확인 및 동의{" "}
                     <Checkbox disabled checked={isContractAgree} />
                  </h5>
               </Button>
               {/* 
               <Button className="ContractButton">
                  <h5>상대 정보 확인 및 동의 <Checkbox disabled checked={isContractAgree} /></h5>
               </Button> */}
            </DialogRender>
         );
   }
};

export default ContractDialog;
