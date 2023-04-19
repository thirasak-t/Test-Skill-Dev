import User from "../models/UserModel";
import LoginContract, { UserToken } from "../models/contracts/AuthContract";
import axiosHelper from "../utils/axiosHelper";

export async function fetchLogin(Contract: LoginContract) {
    return await axiosHelper.post<User>("/api/Auth/login", Contract).then((res) => res.data);
}
