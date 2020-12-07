import React from "react";
import Faker from "faker";
import { Avatar, Button } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhoneIcon from "@material-ui/icons/Phone";
import { ArrowBack, Share, Dialpad } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CURRENT } from "../actions/types";
import { addFavorite, tradeRequest } from "../actions/userActions";

const DetailPageView = () => {
   const current = useSelector((state) => state.post.current);
   const user = useSelector((state) => state.user);

   const history = useHistory();
   const dispatch = useDispatch();

   const height = window.outerHeight;

   const handleOnRequest = () => {
      if (window.confirm("거래를 신청하시겠습니까?")) {
         dispatch(tradeRequest(user, current));
      }
   };

   const TopIconRender = () => {
      const handleBack = () => {
         history.goBack();
         // dispatch({ type: CLEAR_CURRENT });
      };
      const handleShare = () => {
         alert("Share");
      };
      const handleOption = () => {
         alert("Option!");
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
      const handleOnPhone = () => {
         alert(current.phoneNumber);
      };
      const handleOnFavorite = async () => {
         dispatch(addFavorite(user, current));
      };
      return (
         <div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "space-between",
               }}
            >
               <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar>{current.name[0]}</Avatar>
                  &ensp;
                  <p style={{ margin: 0 }}>
                     {current.name}
                     <br />
                     <small>{current.address}</small>
                  </p>
               </div>
               {/* TODO: 이 부분이나 적당한 부분에 뱃지 추가하면 될듯 */}
               <div style={{ marginTop: "auto" }}>
                  <FavoriteIcon
                     style={{ fontSize: 30 }}
                     onClick={handleOnFavorite}
                  />
                  &emsp;
                  <PhoneIcon style={{ fontSize: 30 }} onClick={handleOnPhone} />
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
               <p style={{ marginBottom: "auto" }}>
                  {current.cost.toLocaleString()}&ensp;원
               </p>
               <p style={{ marginBottom: "auto" }}>
                  {current.size.toLocaleString()}&ensp;평
               </p>
            </Col>
            <Col xs="6">
               <Button
                  color="primary"
                  variant="contained"
                  onClick={handleOnRequest}
               >
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
            src={current.imageUrls[0]}
            alt="#"
            style={{ height: height / 2, width: "100%", objectFit: "cover" }}
         />
         <div style={{ padding: 10, marginBottom: 100 }}>
            <UserContactCard />
            <hr />
            <h3>{current.title}</h3>
            <small>
               {current.category} / {current.location}
            </small>
            <p>{current.content}</p>
            <hr />
            <small>관심 {current.star}</small>
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
