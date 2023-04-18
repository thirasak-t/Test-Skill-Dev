import React, { createContext, useCallback, useContext } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import userState from "../recoil/user";
import User from "../models/UserModel";
import LoginContract from "../models/contracts/AuthContract";
import { fetchLogin } from "../fetch/fetchAuth";

const AuthContext = createContext(
    {} as {
        user: User;
        login: (data: LoginContract) => Promise<void>;
        logout: () => void;
    }
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useRecoilState(userState);

    const login = async (data: LoginContract) => {
        await fetchLogin(data as LoginContract).then((res: any) => {
            localStorage.setItem("userToken", res.token);
            toast.success("ยินดีต้อนรับ" + data.username);
        });
    };

    const logout = useCallback(() => {
        setUser({} as User);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
    }, [setUser]);

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
