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
import { passwordRegExp, usernameRegExp } from "../constants/RegExp";
import { toast } from "react-hot-toast";

type RegisterProfileForm = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    img: string;
};

const RegisterProfileSchema = yup.object({
    username: yup
        .string()
        .required("กรุณากรอกชื่อผู้ใช้งานที่มีความยาว 4 - 12 ตัวอักษร")
        .matches(usernameRegExp, "ชื่อผู้ใช้ต้องเป็น A-Z, a-z, 0-9, _ (ขีดเส้นใต้) ที่มีความยาว 4 - 12 ตัวอักษร"),
    password: yup
        .string()
        .required("กรุณากรอกรหัสผ่านที่มีความยาวไม่ต่ำกว่า 6 ตัวอักษร")
        .matches(passwordRegExp, "รหัสผ่านต้องไม่ต่ำกว่า 6 ตัวอักษร")
        .test("password", "ต้องไม่มีตัวเรียงหรือตัวอักษรเรียงเป็นลำดับ เช่น 123456, abcdef", (val) => {
            for (let i = 0; i < val.length - 1; i++) {
                const charCode = val.charCodeAt(i);
                const nextCharCode = val.charCodeAt(i + 1);
                if (nextCharCode !== charCode + 1) {
                    return true;
                }
            }
            return false;
        }),
    firstname: yup
        .string()
        .required("กรุณากรอกชื่อจริงโดยมีขนาดไม่เกิน 60 ตัวอักษร")
        .max(60, "ชื่อจริงต้องไม่เกิน 60 ตัวอักษร"),
    lastname: yup.string().max(60, "นามสกุลต้องไม่เกิน 60 ตัวอักษร"),
    img: yup.string().required("กรุณาอัพโหลดรูปภาพที่มีขนาดไม่เกิน 5MB"),
});

function Register() {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const {
        watch,
        control,
        setValue,
        setError,
        formState: { isSubmitting },
        handleSubmit,
    } = useForm<RegisterProfileForm>({
        defaultValues: {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            img: "",
        },
        resolver: yupResolver(RegisterProfileSchema),
    });
    const img = watch("img");

    const onSubmit: SubmitHandler<RegisterProfileForm> = async (data) => {
        console.log(data);
        toast.success("ลงทะเบียนสำเร็จ");
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
                        img={img}
                        setValue={(_img: string) => setValue("img", _img)}
                        setError={(_error: string) => setError("img", { message: _error })}
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

export default Register;
