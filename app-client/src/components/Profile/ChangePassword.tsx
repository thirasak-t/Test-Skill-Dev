import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordInput from "../Form/PasswordInput";
import { passwordRegExp } from "../../constants/RegExp";
import { ChangePasswordForm } from "../../models/contracts/Form";
import { useRecoilValue } from "recoil";
import userState from "../../recoil/user";
import { updatePassword } from "../../fetch/fetchUser";

const ChangePasswordSchema = yup.object({
    currentPassword: yup
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
    newPassword: yup
        .string()
        .required("กรุณากรอกรหัสผ่านที่มีความยาวไม่ต่ำกว่า 6 ตัวอักษร")
        .matches(passwordRegExp, "รหัสผ่านต้องไม่ต่ำกว่า 6 ตัวอักษร")
        .test("newPassword", "ต้องไม่มีตัวเรียงหรือตัวอักษรเรียงเป็นลำดับ เช่น 123456, abcdef", (val) => {
            for (let i = 0; i < val.length - 1; i++) {
                const charCode = val.charCodeAt(i);
                const nextCharCode = val.charCodeAt(i + 1);
                if (nextCharCode !== charCode + 1) {
                    return true;
                }
            }
            return false;
        })
        .notOneOf([yup.ref("currentPassword")], "รหัสผ่านเหมือนกัน"),
    confirmNewPassword: yup
        .string()
        .required("กรุณากรอกรหัสผ่านที่มีความยาวไม่ต่ำกว่า 6 ตัวอักษร")
        .matches(passwordRegExp, "รหัสผ่านต้องไม่ต่ำกว่า 6 ตัวอักษร")
        .test("confilmNewPassword", "ต้องไม่มีตัวเรียงหรือตัวอักษรเรียงเป็นลำดับ เช่น 123456, abcdef", (val) => {
            for (let i = 0; i < val.length - 1; i++) {
                const charCode = val.charCodeAt(i);
                const nextCharCode = val.charCodeAt(i + 1);
                if (nextCharCode !== charCode + 1) {
                    return true;
                }
            }
            return false;
        })
        .oneOf([yup.ref("newPassword"), ""], "รหัสผ่านไม่ตรงกัน"),
});

interface ChangePasswordProps {
    turnOffChangePassword: () => void;
}

function ChangePassword({ turnOffChangePassword }: ChangePasswordProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const user = useRecoilValue(userState);
    const {
        reset,
        control,
        formState: { isSubmitting },
        handleSubmit,
    } = useForm<ChangePasswordForm>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        resolver: yupResolver(ChangePasswordSchema),
    });

    const handleCancel = () => {
        reset();
        turnOffChangePassword();
    };

    const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
        updatePassword(data, user.userId).then(() => {
            turnOffChangePassword();
            toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
        });
    };

    return (
        <>
            <Typography
                fontWeight={"bold"}
                color={theme.palette.primary.main}
                sx={{
                    fontSize: { xs: 20, md: 24, xl: 30 },
                }}
            >
                Change Password
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
                <PasswordInput
                    sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                    variant="filled"
                    color="primary"
                    label={"Current Password"}
                    size="small"
                    autoComplete="off"
                    control={control}
                    name={"currentPassword"}
                />
                <PasswordInput
                    sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                    variant="filled"
                    color="primary"
                    label={"New Password"}
                    size="small"
                    autoComplete="off"
                    control={control}
                    name={"newPassword"}
                />
                <PasswordInput
                    sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                    variant="filled"
                    color="primary"
                    label={"Confirm New Password"}
                    size="small"
                    autoComplete="off"
                    control={control}
                    name={"confirmNewPassword"}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                    {isSubmitting ? (
                        <CircularProgress />
                    ) : (
                        <Button variant="contained" color="primary" type={"submit"} disabled={isSubmitting}>
                            Change
                        </Button>
                    )}
                    <Button variant="contained" color="secondary" onClick={handleCancel} disabled={isSubmitting}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </>
    );
}
export default ChangePassword;
