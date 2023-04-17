import React from "react";
import { Button, Container, Typography, Box, Link, useMediaQuery, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Form/Input";
import PasswordInput from "../components/Form/PasswordInput";

type loginForm = {
    username: string;
    password: string;
};

const LoginSchema = yup.object({
    username: yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
    password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});

function Login() {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const {
        control,
        formState: { isSubmitting },
        handleSubmit,
    } = useForm<loginForm>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<loginForm> = async (data) => {
        //login
    };
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
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    p: 5,
                    borderRadius: { xs: 0, md: 5 },
                }}
            >
                <Typography
                    fontWeight={"bold"}
                    color={theme.palette.primary.main}
                    sx={{
                        fontSize: { xs: 20, md: 24, xl: 30 },
                    }}
                >
                    Login
                </Typography>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: "350px",
                        width: matches ? "25vw" : "600px",
                        padding: matches ? "20px 10px" : "20px 20px",
                        gap: "1.2rem",
                        borderRadius: "1rem",
                        backgroundColor: "rgba(255, 255, 255, .15)",
                    }}
                >
                    <Input
                        sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                        variant="filled"
                        color="primary"
                        label={"username"}
                        size="small"
                        autoComplete="off"
                        control={control}
                        name={"username"}
                    />
                    <PasswordInput
                        sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                        variant="filled"
                        color="primary"
                        label={"password"}
                        size="small"
                        autoComplete="off"
                        control={control}
                        name={"password"}
                    />
                    {isSubmitting ? (
                        <CircularProgress />
                    ) : (
                        <Button variant="contained" color="primary" type={"submit"} disabled={isSubmitting}>
                            Login
                        </Button>
                    )}
                </form>
                <Link
                    onClick={() => {
                        navigate("/signup");
                    }}
                    m={2}
                    sx={{ cursor: "pointer" }}
                >
                    Sign Up
                </Link>
            </Container>
        </Box>
    );
}

export default Login;
