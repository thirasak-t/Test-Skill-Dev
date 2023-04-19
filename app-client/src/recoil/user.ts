import { atom } from "recoil";
import User from "../models/UserModel";
import { fetchCurrentUser } from "../fetch/fetchUser";

async function getUser() {
    const userId = localStorage.getItem("userId") || "";

    if (userId) {
        const user = await fetchCurrentUser(userId)
            .then((res: User) => {
                const user = res;

                return {
                    userId: user.userId,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    profileImage: user.profileImage,
                } as User;
            })
            .catch(() => {
                return {} as User;
            });

        return user;
    }
    return {} as User;
}
const userState = atom({
    key: "user",
    default: getUser(),
});

export default userState;
