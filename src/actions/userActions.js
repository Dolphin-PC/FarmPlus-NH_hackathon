import Axios from "axios";
import { serverUrl } from "../app/info";

export const newUser = async (user) => {
   console.info(user);
   await Axios.post(`${serverUrl}/users`, {
      user,
   })
      .then(() => {
         return true;
      })
      .catch((err) => {
         console.error(err);
         return false;
      });
};
