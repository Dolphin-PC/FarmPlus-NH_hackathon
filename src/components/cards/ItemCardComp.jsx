import React from "react";
import { Col, Row } from "reactstrap";
import StarIcon from "@material-ui/icons/Star";
import Faker from "faker";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT, SET_NAV } from "../../actions/types";
import { makeStyles, Tooltip } from "@material-ui/core";
import badge from "../../assets/icon/badge.png";

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

const ItemCardComp = (props) => {
   const classes = useStyles();

   const { imageUrls, title, star, size, location } = props;
   const user = useSelector((state) => state.user);
   const history = useHistory();

   const dispatch = useDispatch();

   // Dese : 'detail' 이동 && Redux Current Data Binding
   const handleOnClickItem = () => {
      dispatch({
         type: SET_NAV,
         payload: "detail",
      });
      dispatch({
         type: SET_CURRENT,
         payload: props,
      });
      history.push("/detail");
   };

   return (
      <Row
         style={{
            // 중요! 화면 안깨지기 위함
            margin: 0,
            paddingTop: 10,
         }}
         onClick={handleOnClickItem}
         className="Post"
      >
         <Col xs="4">
            <img
               src={imageUrls[0]}
               alt={title}
               className="ItemCardImageStyle"
            />
         </Col>
         <Col xs="7">
            <h5
               style={{
                  height: 26,
                  overflow: "hidden",
                  textOverflow: "ellipsis2",
               }}
            >
               {user.user.isVIP === true ? (
                  <Tooltip
                     title={longText}
                     classes={{ tooltip: classes.customWidth }}
                     arrow
                  >
                     <img src={badge} alt="" style={{ height: 20 }} />
                  </Tooltip>
               ) : null}
               &ensp;
               {title}
            </h5>
            <StarIcon /> {star}
            <p>
               {size.toLocaleString()}&ensp;㎡&ensp;|&ensp;{location}
            </p>
         </Col>
      </Row>
   );
};

ItemCardComp.defaultProps = {
   image: Faker.random.image(),
   title: Faker.random.word(),
   star: Faker.random.number() % 5,
   size: `${Faker.random.number()} m`,
   location: Faker.random.locale(),
};

export default ItemCardComp;
