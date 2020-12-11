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
        <div style={{ width: "100%" }} className="font-Spoqa">
          <div
            className="Row"
            style={{ border: "1px solid lightgray", padding: 10 }}
          >
            <div
              className="col-xs-2 text-center"
              style={{ writingMode: "tb-rl" }}
            >
              매도인(갑)
            </div>
            <div className="col-xs-10" style={{ paddingLeft: "7px" }}>
              <small>{product.name}</small>
              <br />
              <small>{product.phoneNumber}</small>
              <br />
              <small>{product.birthDay}</small>
              <br />
              <small>{product.address}</small>
            </div>
          </div>
          <br />
          <div
            className="Row"
            style={{ border: "1px solid lightgray", padding: 10 }}
          >
            <div
              className="col-xs-2 text-center"
              style={{ writingMode: "tb-rl" }}
            >
              매수인(을)
            </div>
            <div className="col-xs-10" style={{ paddingLeft: "7px" }}>
              <small>{requester.name}</small>
              <br />
              <small>{requester.phoneNumber}</small>
              <br />
              <small>{requester.birthDay}생년월일</small>
              <br />
              <small>{requester.address}주소지</small>
            </div>
          </div>
          <br />
          <InputLabel>
            <div className="Contract-Key">
              <small>소재지</small>
            </div>
            <div className="text-right Contract-Value">
              <b>{product.location}</b>
            </div>
          </InputLabel>
          <InputLabel>
            <div className="Contract-Key">
              <small>품목</small>
            </div>
            <div className="text-right Contract-Value">
              <b>{product.category}</b>
            </div>
          </InputLabel>
          <InputLabel>
            <div className="Contract-Key">
              <small>품종</small>
            </div>
            <div className="text-right Contract-Value">
              <b> {/*product.subCategory*/} 품종</b>
            </div>
          </InputLabel>
          <InputLabel>
            <div className="Contract-Key">
              <small>계약면적</small>
            </div>
            <div className="text-right Contract-Value">
              <b>{product.size.toLocaleString()} 평</b>
            </div>
          </InputLabel>
          <InputLabel>
            <div className="Contract-Key">
              <small>파종일</small>
            </div>
            <div className="text-right Contract-Value">
              <b>{product.plantDay}</b>
            </div>
          </InputLabel>
          <InputLabel>
            <div className="Contract-Key">
              <small>반출일</small>
            </div>
            <div className="text-right Contract-Value">
              <b>{product.outDay}</b>
            </div>
          </InputLabel>
          <InputLabel>
            <div className="Contract-Key">
              <small>총 매매대금</small>
            </div>
            <div className="text-right Contract-Value">
              <b>{product.cost.toLocaleString()} 원</b>
            </div>
          </InputLabel>
          <br />
          <InputLabel style={{ textAlign: "center", color: "black" }}>
            <small>계약일</small>&ensp;
            <b>{getToday()}</b>
          </InputLabel>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ContractAccordionComp;
