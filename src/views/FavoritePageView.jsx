import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_NAV } from "../actions/types";

const FavoritePageView = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({
         type: SET_NAV,
         payload: window.location.href.split("/")[3],
      });
   }, []);
   return <div>Favorite</div>;
};

export default FavoritePageView;
