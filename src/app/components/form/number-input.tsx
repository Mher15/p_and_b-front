import { useField } from "formik";
import { RequiredFieldError } from "./form-validation-error";

interface NumberInputOwnProps {
    label: string,
    id: string,
    name: string,
}

export const NumberInput = ({label, ...props}: NumberInputOwnProps) => {
    const [field, meta] = useField(props);
    return (
        <div className="field-with-label">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="form-input" {...field} {...props} type="number"/>
            {
                meta.touched && meta.error ? (<RequiredFieldError />) : null
            }
        </div>
    );
};
