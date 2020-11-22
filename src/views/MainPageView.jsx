import DialpadIcon from "@material-ui/icons/Dialpad";
import { Col } from "reactstrap";
import React, { Fragment } from "react";

import Slider from "react-slick";
import ItemCardComp from "../components/cards/ItemCardComp";

const MainPageView = () => {
   const CategorySliderRender = () => {
      const sliderSettings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 4,
         swipeToSlide: true,
      };
      const ItemRender = ({ icon, text }) => {
         return (
            <div>
               {icon}
               <br />
               <small>{text}</small>
            </div>
         );
      };
      return (
         <div
            className="LeftBorder30"
            style={{
               marginTop: 20,
               padding: 20,
               textAlign: "center",
               backgroundColor: "#C7B492",
            }}
         >
            <Slider {...sliderSettings} arrows={false}>
               <ItemRender icon={<DialpadIcon />} text="전체" />
               <ItemRender icon={<DialpadIcon />} text="감자" />
               <ItemRender icon={<DialpadIcon />} text="고구마" />
               <ItemRender icon={<DialpadIcon />} text="사과" />
               <ItemRender icon={<DialpadIcon />} text="배" />
               <ItemRender icon={<DialpadIcon />} text="양파" />
               <ItemRender icon={<DialpadIcon />} text="수박" />
            </Slider>
         </div>
      );
   };

   return (
      <div className="MainStyle">
         <CategorySliderRender />
         <hr />
         <ItemCardComp />
         <ItemCardComp />
         <ItemCardComp />
         <ItemCardComp />
      </div>
   );
};

export default MainPageView;
