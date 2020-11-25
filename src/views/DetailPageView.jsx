import React from "react";
import Faker from "faker";
import { Avatar, Button } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhoneIcon from "@material-ui/icons/Phone";
import { ArrowBack, Share, Dialpad } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_NAV } from "../actions/types";

const DetailPageView = (props) => {
   const { imageUrls, title, category, _location, content, interest } = props;

   const history = useHistory();
   const dispatch = useDispatch();

   const height = window.outerHeight;

   const TopIconRender = () => {
      const handleBack = () => {
         history.push("/main");
         dispatch({ type: SET_NAV, payload: "main" });
      };
      const handleShare = () => {
         alert("share!");
      };
      const handleOption = () => {
         alert("option!");
      };
      return (
         <>
            <ArrowBack
               style={{
                  position: "fixed",
                  top: 10,
                  left: 20,
                  color: "white",
               }}
               onClick={handleBack}
            />
            <div
               style={{
                  position: "fixed",
                  top: 10,
                  right: 20,
                  color: "white",
               }}
            >
               <Share onClick={handleShare} />
               &emsp;
               <Dialpad onClick={handleOption} />
            </div>
         </>
      );
   };
   const UserContactCard = () => {
      return (
         <div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "space-between",
               }}
            >
               <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar>H</Avatar>
                  &ensp;
                  <p style={{ margin: 0 }}>
                     마피아
                     <br />
                     <small>주소</small>
                  </p>
               </div>
               <div style={{ marginTop: "auto" }}>
                  <FavoriteIcon style={{ fontSize: 30 }} />
                  &emsp;
                  <PhoneIcon style={{ fontSize: 30 }} />
               </div>
            </div>
         </div>
      );
   };

   const BottomRender = () => {
      return (
         <div
            style={{
               position: "fixed",
               bottom: 0,
               width: "100%",
               height: 100,
               backgroundColor: "white",
               display: "flex",
               alignItems: "center",
            }}
         >
            <Col xs="6">
               <p style={{ marginBottom: "auto" }}>1,000,000 원</p>
               <p style={{ marginBottom: "auto" }}>10,000 평</p>
            </Col>
            <Col xs="6">
               <Button color="primary" variant="contained">
                  거래 신청하기
               </Button>
            </Col>
         </div>
      );
   };

   return (
      <div>
         <TopIconRender />
         <img
            src={imageUrls}
            alt="#"
            style={{ height: height / 2, width: "100%", objectFit: "cover" }}
         />
         <div style={{ padding: 10, marginBottom: 100 }}>
            <UserContactCard />
            <hr />
            <h3>{title}</h3>
            <small>
               {category} / {_location}
            </small>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <hr />
            <small>관심 {interest}</small>
         </div>

         <BottomRender />
      </div>
   );
};

DetailPageView.defaultProps = {
   imageUrls: Faker.random.image(),
   title: Faker.random.words(),
   _location: "강원도",
   category: "감자",
   content: Faker.lorem.lines(),
   interest: Faker.random.number() % 10,
};

export default DetailPageView;
