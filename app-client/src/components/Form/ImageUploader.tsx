import { TextField, TextFieldProps, Box, Typography } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import useReactHookFormError from "./useReactHookFormError";
import { useEffect, useState } from "react";

type units = "48" | "52" | "80" | "3/4" | "full";

type ImageUploadProps = {
    width?: units;
    height?: units;
    disable?: boolean;
    callback?: any;
};

function ImageUploader({
    name,
    label,
    control,
    sx,
    rules,
}: TextFieldProps & UseControllerProps<any> & ImageUploadProps) {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        field,
        formState: { errors },
    } = useController<any>({ name, control, rules });
    const error = useReactHookFormError(errors, name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImage(e.target.files?.[0]);
        setImagePreview(URL.createObjectURL(e.target.files?.[0]));
    };

    console.log(image);

    useEffect(() => {
        if (!image) return;
        let newImage = new File(
            [image],
            `${name.replaceAll(" ", "-")}.jpg` // ${image.name.split(".")[image.name.split(".").length - 1]}
        );
        console.log(newImage);
        console.log(field.value);
    }, [image]);

    // const handleUploadImage = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (isLoading) return;
    //     if (!image) return;
    //     let newImage = new File(
    //         [image],
    //         `${name.replaceAll(" ", "-")}.jpg` // ${image.name.split(".")[image.name.split(".").length - 1]}
    //     );
    //     setIsLoading(true);
    // };

    return (
        <Box sx={{ ...sx }}>
            <Typography sx={{ color: (theme) => theme.palette.primary.main }}>{label}</Typography>
            {image && (
                <img
                    src={imagePreview || `/assets/images/${name.replaceAll(" ", "-")}.jpg`}
                    alt="Uploaded image"
                    style={{ width: "200px", height: "200px", objectFit: "cover", justifyItems: "center" }}
                />
            )}
            <Box sx={{ display: "flex" }}>
                <TextField {...field} {...error} type="file" sx={{ width: 1 }} onChange={handleChange} />
            </Box>
        </Box>
    );
}

export default ImageUploader;
