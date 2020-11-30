import React, { useEffect } from "react";
import MainPageView from "./views/MainPageView";

import { Provider } from "react-redux";
import store from "./store";

import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPageView from "./views/LoginPageView";
import FavoritePageView from "./views/FavoritePageView";
import SettingPageView from "./views/SettingPageView";

import Navbar from "./components/common/Navbar";

import "./assets/css/app.css";
import DetailPageView from "./views/DetailPageView";
import RegisterPageView from "./views/RegisterPageView";
import FilterPageView from "./views/FilterPageView";

const App = () => {
   useEffect(() => {
      M.AutoInit();
   }, []);

   return (
      <Provider store={store}>
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={LoginPageView} />
               <Route exact path="/register" component={RegisterPageView} />
               <Navbar>
                  <Route exact path="/main" component={MainPageView} />
                  <Route exact path="/favorite" component={FavoritePageView} />
                  <Route exact path="/setting" component={SettingPageView} />
                  <Route exact path="/detail" component={DetailPageView} />
                  <Route exact path="/filter" component={FilterPageView} />
               </Navbar>
            </Switch>
         </BrowserRouter>
      </Provider>
   );
};

export default App;
