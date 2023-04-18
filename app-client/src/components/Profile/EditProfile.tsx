import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import ImageUploader from "../Form/ImageUploader";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../Form/Input";
import User from "../../models/UserModel";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SetterOrUpdater } from "recoil";
import { useEffect } from "react";

type EditProfileForm = {
    firstname: string;
    lastname: string;
    img: string;
};

const EditProfileSchema = yup.object({
    firstname: yup
        .string()
        .required("กรุณากรอกชื่อจริงโดยมีขนาดไม่เกิน 60 ตัวอักษร")
        .max(60, "ชื่อจริงต้องไม่เกิน 60 ตัวอักษร"),
    lastname: yup.string().max(60, "นามสกุลต้องไม่เกิน 60 ตัวอักษร"),
    img: yup.string().required("กรุณาอัพโหลดรูปภาพที่มีขนาดไม่เกิน 5MB"),
});

interface EditProfileProps {
    setEditIsOff: () => void;
    user: User;
    setUser: SetterOrUpdater<User>;
}

function EditProfile({ user, setEditIsOff, setUser }: EditProfileProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const {
        watch,
        reset,
        control,
        setValue,
        setError,
        formState: { isSubmitting, isDirty },
        handleSubmit,
    } = useForm<EditProfileForm>({
        defaultValues: {
            firstname: user.firstName,
            lastname: user.lastName,
            img: user.profileImage,
        },
        resolver: yupResolver(EditProfileSchema),
    });

    const handleCancel = () => {
        reset();
        setEditIsOff();
    };
    const img = watch("img");
    useEffect(() => {
        console.log(img);
    }, [img]);
    const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
        setEditIsOff();
        setUser((_user) => {
            return {
                ..._user,
                firstName: data.firstname,
                lastName: data.lastname,
                profileImage: data.img,
            } as User;
        });
        toast.success("แก้ไขโปรไฟล์สำเร็จ");
    };

    return (
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
            <ImageUploader
                control={control}
                name={"img"}
                sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                img={img}
                setValue={(_img: string) => {
                    setValue("img", _img);
                }}
                setError={(_error: string) => {
                    setError("img", { message: _error });
                }}
            />

            <Input
                sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                variant="filled"
                color="primary"
                size="small"
                autoComplete="off"
                control={control}
                name={"firstname"}
                label={"Firstname"}
            />
            <Input
                sx={{ width: matches ? 1 : "500px", minWidth: "300px" }}
                variant="filled"
                color="primary"
                size="small"
                autoComplete="off"
                control={control}
                name={"lastname"}
                label={"Lastname"}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
                {isSubmitting ? (
                    <CircularProgress />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        type={"submit"}
                        disabled={isSubmitting || (!isDirty && img === user.profileImage)}
                    >
                        Save
                    </Button>
                )}
                <Button variant="contained" color="secondary" onClick={handleCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
            </Box>
        </form>
    );
}
export default EditProfile;
