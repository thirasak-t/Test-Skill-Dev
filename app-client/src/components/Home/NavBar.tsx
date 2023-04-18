import { Box, AppBar, Typography, Button, IconButton, Toolbar, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState from "../../recoil/user";
import { useEffect, useMemo, useState } from "react";
import MenuDropDown, { menuOption } from "./MenuDropDown";
import { useAuth } from "../AuthProvider";

function NavBar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const user = useRecoilValue(userState);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [options, setOptions] = useState<menuOption[]>([]);
    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutOption = useMemo(() => {
        return {
            icon: <LogoutIcon />,
            label: "Logout",
            onClick: () => logout(),
        };
    }, []);

    const profileOption = useMemo(() => {
        return {
            icon: <AccountCircleIcon />,
            label: "Profile",
            onClick: () => {
                navigate("/profile");
            },
        };
    }, []);

    useEffect(() => {
        setOptions([profileOption, logoutOption]);
    }, [logoutOption, profileOption]);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/")}
                            >
                                Home
                            </Typography>
                        </Box>

                        {user.userId ? (
                            <>
                                <IconButton onClick={handleMenu}>
                                    <Avatar
                                        src={`data:image/(jpeg|png|bmp|jpg);base64,${user.profileImage}`}
                                        sx={{ width: { xs: 24, sm: 36 }, height: { xs: 24, sm: 36 } }}
                                    />
                                </IconButton>
                                <MenuDropDown
                                    anchorEl={anchorEl}
                                    options={options}
                                    open={open}
                                    handleClose={handleClose}
                                />
                            </>
                        ) : (
                            <>
                                <Button
                                    sx={{ mr: 1 }}
                                    variant="text"
                                    color="secondary"
                                    onClick={() => navigate("/register")}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    sx={{ mr: 1 }}
                                    variant="text"
                                    color="secondary"
                                    onClick={() => navigate("/login")}
                                >
                                    Log in
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default NavBar;
