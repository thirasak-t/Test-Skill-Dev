import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import NavBar from "../components/Home/NavBar";
import { useRecoilState } from "recoil";
import userState from "../recoil/user";
import EditProfile from "../components/Profile/EditProfile";
import ProfileInformation from "../components/Profile/ProfileInformation";
import ChangePassword from "../components/Profile/ChangePassword";
function Profile() {
    const [user, setUser] = useRecoilState(userState);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                backgroundColor: (theme) => theme.palette.secondary.main,
                position: "absolute",
            }}
        >
            <NavBar />
            <Container
                maxWidth={"md"}
                sx={{
                    minHeight: "80vh",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    p: 5,
                    borderRadius: { xs: 0, md: 5 },
                }}
            >
                {isEdit ? (
                    <EditProfile user={user} setUser={setUser} setEditIsOff={() => setIsEdit(false)} />
                ) : isChangePassword ? (
                    <ChangePassword turnOffChangePassword={() => setIsChangePassword(false)} />
                ) : (
                    <ProfileInformation
                        setEditIsOn={() => setIsEdit(true)}
                        turnOnChangePassword={() => setIsChangePassword(true)}
                        user={user}
                    />
                )}
            </Container>
        </Box>
    );
}

export default Profile;
