import { useEffect, useState } from "react";

import Slider from "react-slick";
import ItemCardComp from "../components/cards/ItemCardComp";
import { useDispatch, useSelector } from "react-redux";
import { SET_CATEGORY, SET_NAV } from "../actions/types";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import NewPostDialog from "../components/dialogs/NewPostDialog";
import { getPosts } from "../actions/postActions";

import { category, category_icon } from "../data/data";
import { getUserInfo } from "../actions/userActions";
import * as Color from "../assets/colors";
import { RootStateType } from "../reducers";

const MainPageView = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, posts } = useSelector((state: RootStateType) => state.post);
  const { filter } = useSelector((state: RootStateType) => state);
  const user = useSelector((state: RootStateType) => state.user);

  useEffect(() => {
    dispatch(getPosts());
    dispatch({
      type: SET_NAV,
      payload: window.location.href.split("/")[3],
    });
    dispatch(getUserInfo(user));
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
          <img src={icon.src} alt="icon" style={{ width: 32, margin: "10px auto" }}></img>
          <small>{text}</small>
        </div>
      );
    };
    return (
      <div
        className="LeftBorder30 Slider"
        style={{
          marginTop: 20,
          padding: 20,
          textAlign: "center",
          backgroundColor: "#C7B492",
        }}
      >
        <Slider {...sliderSettings} arrows={false}>
          {category.map((data, index) => (
            <ItemRender key={index} icon={category_icon[index]} text={data.text} />
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
        style={{
          position: "fixed",
          bottom: 70,
          right: 20,
          zIndex: 5,
          backgroundColor: Color.mainColor,
          color: "white",
        }}
        onClick={handleAdd}
      >
        <Add />
      </Fab>
    );
  };

  const PostRender = () => {
    if (error) return <p>에러가 발생했습니다...</p>;

    if (loading) return <p>로딩 중...</p>;

    let filterValue;
    if (filter.category === "전체") filterValue = posts;
    else filterValue = posts.filter((post) => post.category === filter.category);

    if (filter.location !== "전체") filterValue = filterValue.filter((post) => post.location === filter.location);

    return (
      <div className="Posts">
        {filterValue?.map((post, idx) => (
          <ItemCardComp key={idx} {...post} />
        ))}
      </div>
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
