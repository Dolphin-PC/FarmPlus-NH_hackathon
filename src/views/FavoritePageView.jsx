import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_NAV } from "../actions/types";
import { getUserInfo } from "../actions/userActions";
import ItemCardComp from "../components/cards/ItemCardComp";

const FavoritePageView = () => {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);
   useEffect(() => {
      dispatch({
         type: SET_NAV,
         payload: window.location.href.split("/")[3],
      });

      dispatch(getUserInfo(user));
   }, []);
   if (user.user.favorite === null || user.user.favorite === undefined) {
      return <div className="MainStyle">찜 목록이 없습니다...</div>;
   }
   return (
      <div className="MainStyle">
         {user.user.favorite.map((favor, index) => (
            <ItemCardComp key={index} {...favor} />
         ))}
      </div>
   );
};

export default FavoritePageView;
