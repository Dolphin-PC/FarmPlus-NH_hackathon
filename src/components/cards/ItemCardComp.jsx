import React from "react";
import { Col, Row } from "reactstrap";
import StarIcon from "@material-ui/icons/Star";
import Faker from "faker";

const ItemCardComp = (props) => {
   const { image, title, star, size, location } = props;

   return (
      <Row
         style={{
            // 중요! 화면 안깨지기 위함
            margin: 0,
            paddingTop: 10,
         }}
      >
         <Col xs="4">
            <img src={image} alt={image} className="ItemCardImageStyle" />
         </Col>
         <Col xs="7">
            <h5>{title}</h5>
            <StarIcon /> {star}
            <p>
               {size}&ensp;㎡&ensp;|&ensp;{location}
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
