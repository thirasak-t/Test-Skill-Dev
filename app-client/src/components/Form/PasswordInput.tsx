import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import useReactHookFormError from "./useReactHookFormError";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordInput<T>({
    color,
    name,
    label,
    control,
    sx,
    size,
    variant,
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
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleToggleShowPassword = () => setShowPassword((_showPassword) => !_showPassword);

    return (
        <TextField
            color={color}
            {...field}
            label={label}
            {...error}
            sx={sx}
            size={size}
            variant={variant}
            type={showPassword ? "text" : "password"}
            disabled={disabled}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleToggleShowPassword}
                            onMouseDown={handleToggleShowPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
                ...InputProps,
            }}
        />
    );
}

export default PasswordInput;
