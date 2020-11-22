import DialpadIcon from "@material-ui/icons/Dialpad";
import { Col } from "reactstrap";
import React, { Fragment, useEffect, useState } from "react";

import Slider from "react-slick";
import ItemCardComp from "../components/cards/ItemCardComp";
import { useDispatch, useSelector } from "react-redux";
import { SET_CATEGORY } from "../actions/types";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import NewPostDialog from "../components/dialogs/NewPostDialog";
import { getPosts } from "../actions/postActions";

import { category } from "../data/data";

const MainPageView = () => {
   const [openAdd, setOpenAdd] = useState(false);
   const dispatch = useDispatch();
   const { loading, error, posts } = useSelector((state) => state.post);

   useEffect(() => {
      dispatch(getPosts());
   }, []);

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
               {category.map((data, index) => (
                  <ItemRender
                     key={index}
                     icon={<DialpadIcon />}
                     text={data.text}
                  />
               ))}
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
            style={{ position: "fixed", bottom: 70, right: 20, zIndex: 5 }}
            onClick={handleAdd}
         >
            <Add />
         </Fab>
      );
   };

   const PostRender = () => {
      if (error) return <p>에러가 발생했습니다...</p>;

      if (loading) return <p>로딩 중...</p>;

      return (
         <Fragment>
            {!loading &&
               posts.map((post) => <ItemCardComp key={post.id} {...post} />)}
         </Fragment>
      );
   };
   return (
      <div className="MainStyle">
         <CategorySliderRender />
         <PostAddButton />
         <NewPostDialog open={openAdd} onClose={() => setOpenAdd(!openAdd)} />
         <hr />
         <PostRender />
         <hr />
         <div className="center">
            <small>- End -</small>
         </div>
      </div>
   );
};

export default MainPageView;
