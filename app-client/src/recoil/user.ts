import { atom } from "recoil";
import User from "../models/UserModel";

const usersState = atom({
  key: "user",
  default: [] as User[],
});

export default usersState;
