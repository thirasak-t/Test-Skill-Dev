import { Box, AppBar, Typography, Button, IconButton, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
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

                        <Button sx={{ mr: 1 }} variant="text" color="secondary" onClick={() => navigate("/signup")}>
                            Sign Up
                        </Button>
                        <Button sx={{ mr: 1 }} variant="text" color="secondary" onClick={() => navigate("/login")}>
                            Log in
                        </Button>
                        {/* <IconButton onClick={() => {}}>
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton onClick={() => {}}>
                            <LogoutIcon />
                        </IconButton> */}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default NavBar;
