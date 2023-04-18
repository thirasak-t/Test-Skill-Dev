import { TextField, TextFieldProps, Box, Typography } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import useReactHookFormError from "./useReactHookFormError";
import Base64Image from "../Base64Image";

type units = "48" | "52" | "80" | "3/4" | "full";

type ImageUploadProps = {
    width?: units;
    height?: units;
    disable?: boolean;
    setValue?: any;
    setError?: any;
    img: string;
};

function ImageUploader({
    name,
    label,
    control,
    sx,
    rules,
    setValue,
    setError,
    img,
}: TextFieldProps & UseControllerProps<any> & ImageUploadProps) {
    const {
        formState: { errors },
    } = useController<any>({ name, control, rules });
    const error = useReactHookFormError(errors, name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files?.[0];
        if (!file) {
            setValue(null);
        } else if (!file.type.match(/image\/(jpeg|png|bmp|jpg)/)) {
            setError("ไม่ใช้ไฟล์รูปภาพ (.jpg, .jpeg, .png, .bmp)");
            setValue(null);
        } else if (file.size > 50 * 1024 * 1024) {
            setError("ขนาดไฟล์รูปมีขนาดเกิน 5MB");
            setValue(null);
        } else {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result?.toString().replace("data:", "").replace(/^.+,/, "");
                base64String ? setValue(base64String) : setValue(null);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ ...sx }}>
            {label && <Typography sx={{ color: (theme) => theme.palette.primary.main }}>{label}</Typography>}

            {img && (
                <Box sx={{ display: "flex", justifyContent: "center", margin: 1 }}>
                    <Base64Image height="200px" width="200px" img={img} />
                </Box>
            )}
            <Box sx={{ display: "flex" }}>
                <TextField {...error} type="file" sx={{ width: 1 }} onChange={handleChange} />
            </Box>
        </Box>
    );
}

export default ImageUploader;
