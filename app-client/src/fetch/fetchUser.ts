import User from "../models/UserModel";
import { RegisterProfileForm } from "../models/contracts/Form";
import { RequestUpdatePassword, RequestUpdateProfile } from "../models/contracts/UserContract";
import axiosHelper from "../utils/axiosHelper";

export async function createNewUser(Contract: RegisterProfileForm) {
    return await axiosHelper.post<User>("/api/User/register", Contract).then((res) => res.data);
}

export async function updateProfile(Contract: RequestUpdateProfile) {
    return await axiosHelper.post<User>("/api/User/update-profile", Contract).then((res) => res.data);
}

export async function updatePassword(Contract: RequestUpdatePassword, userId: string) {
    return await axiosHelper.put("/api/User/change-password/" + userId, Contract).then((res) => res.data);
}

export async function fetchCurrentUser(userId: string) {
    return await axiosHelper.get<User>("/api/User/current-user", { userId: userId }).then((res) => res.data);
}

export async function fetchCheckDuplicateUsername(username: string) {
    return await axiosHelper.get<boolean>("/api/User/check", { username: username }).then((res) => res.data);
}
