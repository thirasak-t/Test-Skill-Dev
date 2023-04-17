import { TextField, TextFieldProps } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import useReactHookFormError from "./useReactHookFormError";

function Input({
    color,
    name,
    label,
    control,
    sx,
    size,
    variant,
    type,
    disabled,
    InputProps,
    InputLabelProps,
    rules,
}: TextFieldProps & UseControllerProps<any>) {
    const {
        field,
        formState: { errors },
    } = useController<any>({ name, control, rules });
    const error = useReactHookFormError(errors, name);
    return (
        <TextField
            color={color}
            {...field}
            label={label}
            {...error}
            sx={sx}
            size={size}
            variant={variant}
            type={type}
            disabled={disabled}
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
        />
    );
}

export default Input;
