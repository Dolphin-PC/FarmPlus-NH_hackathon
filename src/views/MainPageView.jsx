import DialpadIcon from "@material-ui/icons/Dialpad";
import { Col } from "reactstrap";
import React, { Fragment, useState } from "react";

import Slider from "react-slick";
import ItemCardComp from "../components/cards/ItemCardComp";
import { useDispatch } from "react-redux";
import { SET_CATEGORY } from "../actions/types";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import NewProductDialog from "../components/dialogs/NewProductDialog";

const MainPageView = () => {
   const [openAdd, setOpenAdd] = useState(false);
   const dispatch = useDispatch();

   const CategorySliderRender = () => {
      const sliderSettings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 4,
         swipeToSlide: true,
      };
      const ItemRender = ({ icon, text }) => {
         const handleSetCategory = () => {
            dispatch({
               type: SET_CATEGORY,
               payload: text,
            });
         };
         return (
            <div onClick={handleSetCategory}>
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

   const PostAddButton = () => {
      const handleAdd = () => {
         setOpenAdd(true);
      };
      return (
         <Fab
            color="primary"
            style={{ position: "fixed", bottom: 70, right: 20 }}
            onClick={handleAdd}
         >
            <Add />
         </Fab>
      );
   };
   return (
      <div className="MainStyle">
         <CategorySliderRender />
         <PostAddButton />
         <NewProductDialog
            open={openAdd}
            onClose={() => setOpenAdd(!openAdd)}
         />
         <hr />
         <ItemCardComp />
         <ItemCardComp />
         <ItemCardComp />
         <ItemCardComp />
         <hr />
         <div className="center">
            <small>- End -</small>
         </div>
      </div>
   );
};

export default MainPageView;
