import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   InputLabel,
} from "@material-ui/core";
import React from "react";
import { getToday } from "../../app/functions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ContractAccordionComp = ({ product, requester }) => {
   return (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            계약서 내용 확인
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
                     <small>{product.birthDay}</small>
                     <small>{product.address}</small>
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
                     <small>{requester.birthDay}</small>
                     <small>{requester.address}</small>
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
                  <small>파종일</small>&ensp;<b>{product.plantDay}</b>
               </InputLabel>
               <InputLabel>
                  <small>반출일</small>&ensp;<b>{product.outDay}</b>
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

export default ContractAccordionComp;
