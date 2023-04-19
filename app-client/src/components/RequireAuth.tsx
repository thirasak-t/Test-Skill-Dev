import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthProvider";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.userId) {
            navigate("/login");
        }
    }, [user.userId]);

    return children;
};
