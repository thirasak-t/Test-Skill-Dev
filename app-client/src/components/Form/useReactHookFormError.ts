import { FieldErrors, get } from "react-hook-form";

const useReactHookFormError = (errors: FieldErrors<any>, name: string) => {
    const error = get(errors, name, undefined);

    const message = error?.message ?? "";
    return {
        error: Boolean(message),
        helperText: message,
    };
};

export default useReactHookFormError;
