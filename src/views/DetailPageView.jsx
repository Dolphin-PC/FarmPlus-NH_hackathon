import React, { Fragment, useState } from "react";
import Faker from "faker";

import {
   Avatar,
   Button,
   Divider,
   Drawer,
   Fade,
   InputLabel,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   makeStyles,
   Tooltip,
} from "@material-ui/core";
import { Col } from "reactstrap";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PhoneIcon from "@material-ui/icons/Phone";
import {
   ArrowBack,
   Share,
   Dialpad,
   Inbox,
   Mail,
   ArrowDropUp,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addFavorite, tradeRequest } from "../actions/userActions";

import badge from "../assets/icon/badge.png";
import * as Color from "../assets/colors";
import DrawerText from "../components/Drawer/DrawerText";

const longText = `배지 X -  수수료 1.0%\n
동배지 -  수수료 0.9%
은배지 - 수수료 0.8%\n
금배지 - 수수료 0.7%\n
기준: 계약이행률, 상품의 품질, 경작지 관리 등을 산지유통인이 평가`;

const useStyles = makeStyles((theme) => ({
   customWidth: {
      maxWidth: 110,
   },
}));

const DetailPageView = () => {
   const classes = useStyles();

   const [openBottomDrawer, setOpenBottomDrawer] = useState(false);

   const current = useSelector((state) => state.post.current);
   const user = useSelector((state) => state.user);

   const history = useHistory();
   const dispatch = useDispatch();

   const height = window.outerHeight;

   const toggleDrawer = (open) => (event) => {
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
         return;
      }

      setOpenBottomDrawer(open);
   };

   const handleOnRequest = () => {
      if (window.confirm("거래를 신청하시겠습니까?")) {
         if (dispatch(tradeRequest(user, current))) {
            alert("거래 신청이 정상적으로 처리되었습니다.");
            setOpenBottomDrawer(false);
         } else {
            alert("거래 신청 오류!");
         }
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
                     {current.name}&ensp;
                     {user.user.isVIP === true ? (
                        <Tooltip
                           title={longText}
                           classes={{ tooltip: classes.customWidth }}
                           arrow
                        >
                           <img src={badge} alt="" style={{ height: 20 }} />
                        </Tooltip>
                     ) : null}
                     <br />
                     <small>{current.address}</small>
                  </p>
               </div>
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

   const DrawerContent = () => (
      <div>
         <div style={{ padding: 20, marginBottom: 100 }}>
            <InputLabel>게시글 제목</InputLabel>
            <h3>{current.title}</h3>
            <hr />
            <DrawerText
               left="크기"
               right={`${current.size.toLocaleString()} 평`}
            />
            <DrawerText
               left="가격"
               right={`${current.cost.toLocaleString()} 원`}
            />
            <DrawerText left="품종/품목" right={`${current.category}`} />
            <DrawerText left="지역/주소" right={current.address} />
            <DrawerText left="파종일" right={current.plantDay} />
            <DrawerText left="반출일" right={current.outDay} />
            <DrawerText left="토지등록번호" right={current.landNumber} />
         </div>
         <div className="Row">
            <Col lg="6" style={{ padding: 0 }}>
               <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={toggleDrawer(false)}
               >
                  취소
               </Button>
            </Col>
            <Col lg="6" style={{ padding: 0 }}>
               <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleOnRequest}
               >
                  신청
               </Button>
            </Col>
         </div>
      </div>
   );

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

         <div
            style={{
               position: "fixed",
               bottom: 0,
               width: "100%",
               textAlign: "center",
               padding: 10,
               backgroundColor: Color.mainColor,
               color: "white",
            }}
            onClick={() => setOpenBottomDrawer(true)}
         >
            <ArrowDropUp />
            <small>상세정보</small>
         </div>
         <Drawer
            anchor="bottom"
            open={openBottomDrawer}
            onClose={toggleDrawer(false)}
         >
            <DrawerContent />
         </Drawer>
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
