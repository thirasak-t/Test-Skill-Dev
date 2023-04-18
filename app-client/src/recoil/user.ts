import { atom } from "recoil";
import User from "../models/UserModel";

const userState = atom({
    key: "user",
    default: {} as User,
});

export default userState;
