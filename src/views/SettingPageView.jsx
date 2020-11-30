import React, { Fragment, useEffect } from "react";
import { Badge, Col, Row } from "reactstrap";
import { Settings, ChevronRight } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { SET_NAV } from "../actions/types";

const SettingPageView = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({
         type: SET_NAV,
         payload: window.location.href.split("/")[3],
      });
   }, []);
   const GyuljaehamRender = () => {
      return (
         <div
            className="LeftBorder30"
            style={{
               backgroundColor: "#142F56",
               width: "100%",
               padding: 20,
            }}
         >
            <h4 style={{ color: "white" }}>결재함</h4>
            <Row style={{ color: "white" }}>
               <Col xs="4" className="center">
                  <h5>0</h5>
                  결재대상
               </Col>
               <Col xs="4" className="center">
                  <h5>0</h5>결재진행
               </Col>
               <Col xs="4" className="center">
                  <h5>0</h5>결재완료
               </Col>
            </Row>
         </div>
      );
   };

   const MyMenuRender = () => {
      return (
         <div
            className="LeftBorder30"
            style={{
               marginTop: 30,
               backgroundColor: "#C7B492",
               padding: 20,
            }}
         >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
               <h4>My Menu</h4>
               <div>
                  <Settings /> 설정
               </div>
            </div>
            <Row>
               <Col xs="5" style={borderBottomStyle}>
                  거래내역조회
                  <ChevronRight />
               </Col>
               <Col xs="5" style={borderBottomStyle}>
                  송금
                  <ChevronRight />
               </Col>
               <Col xs="5" style={borderBottomStyle}>
                  지방세납부
                  <ChevronRight />
               </Col>
               <Col xs="5" style={borderBottomStyle}>
                  환율조회
                  <ChevronRight />
               </Col>
            </Row>
         </div>
      );
   };

   const MessageRender = () => {
      return (
         <div style={{ padding: 20 }}>
            <h4>
               메시지가
               <br />
               도착했습니다.
            </h4>

            <Badge color="info">이체</Badge>
            <p>(주)사계절무역상사로부터 30,000,000원이 입금되었습니다.</p>
         </div>
      );
   };
   return (
      <div className="MainStyle">
         <div style={{ paddingLeft: 30, paddingTop: 30 }}>
            <p>내 정보</p>

            <h3>
               <b>박찬영</b> 님<br />
               안녕하세요.
            </h3>
            <GyuljaehamRender />
            <MyMenuRender />
            <MessageRender />
         </div>

         <div
            style={{
               position: "fixed",
               bottom: 0,
               height: 500,
               width: "100%",
               backgroundColor: "#E7E1D9",
               zIndex: -1,
            }}
         />
      </div>
   );
};

const borderBottomStyle = {
   display: "flex",
   justifyContent: "space-between",
   margin: 10,
   borderBottom: "1px solid grey",
};

export default SettingPageView;
