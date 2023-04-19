import { Box, Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginAndRegisterLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.userId) {
            navigate("/");
        }
    }, [user.userId]);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                backgroundColor: (theme) => theme.palette.primary.main,
                position: "absolute",
            }}
        >
            <Button color="secondary" onClick={() => navigate("/")} sx={{ m: 2 }}>
                Home
            </Button>
            <Container
                maxWidth={"md"}
                sx={{
                    bgcolor: (theme) => theme.palette.secondary.main,
                    minHeight: "80vh",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    p: 5,
                    borderRadius: { xs: 0, md: 5 },
                }}
            >
                {children}
            </Container>
        </Box>
    );
}
