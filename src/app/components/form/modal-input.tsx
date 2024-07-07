import { useField } from "formik";
import { RequiredFieldError } from "./form-validation-error";

interface InputOwnProps {
    label: string,
    id: string,
    name: string,
}

export const Input = ({label, ...props}: InputOwnProps) => {
    const [field, meta] = useField(props);
    return (
        <input className="form-input" {...field} {...props} type="text"/>
            {
                meta.touched && meta.error ? (<RequiredFieldError />) : null
            }
    );
  };

interface AuthInputOwnProps {
    placeholder: string,
    id: string,
    name: string,
}
  
export const AuthInput = ({placeholder, ...props}: AuthInputOwnProps) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input className="form-input" {...field} {...props} type="text" placeholder={placeholder}/>
            {
                meta.touched && meta.error ? (<RequiredFieldError />) : null
            }
        </>
    );
};
