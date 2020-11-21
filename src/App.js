import React, { useEffect } from "react";
import MainPageView from "./views/MainPageView";

import { Provider } from "react-redux";
import store from "./store";

// Materialize-css
// import "materialize-css/dist/css/materialize.min.css";
// Material-ui 랑 충돌 일어남
import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPageView from "./views/LoginPageView";
import Navbar from "./components/common/Navbar";
import BottomNavbar from "./components/common/BottomNavbar";

const App = () => {
   useEffect(() => {
      M.AutoInit();
   }, []);

   const height = window.outerHeight;

   const MainStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: height,
      flexDirection: "column",
   };

   return (
      <Provider store={store}>
         <BrowserRouter>
            <div style={MainStyle}>
               <Switch>
                  <Route exact path="/" component={LoginPageView} />
                  <Navbar>
                     <Route exact path="/main" component={MainPageView} />
                  </Navbar>
               </Switch>
            </div>
         </BrowserRouter>
      </Provider>
   );
};

export default App;
