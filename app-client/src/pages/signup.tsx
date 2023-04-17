import React from "react";
import { Button, Container, Typography, Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Form/Input";
import PasswordInput from "../components/Form/PasswordInput";
import ImageUploader from "../components/Form/ImageUploader";

type SignUpForm = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    img: File;
};

const SignUpSchema = yup.object({
    username: yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
    password: yup.string().required("กรุณากรอกรหัสผ่าน"),
    firstname: yup.string().required("กรุณากรอกชื่อ"),
    img: yup.string().required("กรุณาอัพโหลดรูปภาพโปรไฟล์"),
});

function SignUp() {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const {
        watch,
        control,
        setValue,
        formState: { isSubmitting },
        handleSubmit,
    } = useForm<SignUpForm>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(SignUpSchema),
    });

    const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
        //Register
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
                    minHeight: "80vh",

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
                    Register
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
                    <Input
                        sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                        variant="filled"
                        color="primary"
                        label={"first name"}
                        size="small"
                        autoComplete="off"
                        control={control}
                        name={"firstname"}
                    />
                    <Input
                        sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                        variant="filled"
                        color="primary"
                        label={"last name"}
                        size="small"
                        autoComplete="off"
                        control={control}
                        name={"lastname"}
                    />
                    <ImageUploader
                        label={"Profile Image"}
                        control={control}
                        name={"img"}
                        sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                    />

                    {isSubmitting ? (
                        <CircularProgress />
                    ) : (
                        <Button variant="contained" color="primary" type={"submit"} disabled={isSubmitting}>
                            Register
                        </Button>
                    )}
                </form>
            </Container>
        </Box>
    );
}

export default SignUp;
