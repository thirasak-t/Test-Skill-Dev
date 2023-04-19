import React, { createContext, useCallback, useContext } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import userState from "../recoil/user";
import User from "../models/UserModel";
import LoginContract from "../models/contracts/AuthContract";
import { fetchLogin } from "../fetch/fetchAuth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(
    {} as {
        user: User;
        login: (data: LoginContract) => Promise<void>;
        logout: () => void;
    }
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const login = async (data: LoginContract) => {
        await fetchLogin(data as LoginContract).then((res: any) => {
            // localStorage.setItem("userToken", res.token);
            toast.success("ยินดีต้อนรับ " + res.username);
            setUser(res);
            localStorage.setItem("userId", res.userId);
            return res;
        });
    };

    const logout = useCallback(() => {
        setUser({} as User);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        toast.success("ออกจากระบบสำเร็จ");
        navigate("/");
    }, [setUser]);

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
