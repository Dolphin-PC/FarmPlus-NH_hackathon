import React from "react";
import { Col, Row } from "reactstrap";
import StarIcon from "@material-ui/icons/Star";
import Faker from "faker";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_CURRENT, SET_NAV } from "../../actions/types";

const ItemCardComp = (props) => {
   const { imageUrls, title, star, size, location } = props;
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
                  height: 25,
                  overflow: "hidden",
                  textOverflow: "ellipsis2",
               }}
            >
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
