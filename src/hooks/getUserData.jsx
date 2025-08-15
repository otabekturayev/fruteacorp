import axios from "../../axios";
import { useStore } from "../store/store"; 


export const getUserData = async (accessToken, refreshToken) => {
  try {
    const response = await axios.get("/auth/getme", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const setUser = useStore.getState().setUser;
    const userDataWithToken = {
      ...response.data,
      token: accessToken,
      refreshToken: refreshToken,
    };
    setUser(userDataWithToken);
  } catch (error) {
    throw error;
  }
};