import { useField } from "formik";
import { RequiredFieldError } from "./form-validation-error";

interface TextAreaOwnProps {
    label: string,
    id: string,
    name: string,
    rows: number
}

export const TextArea = ({label, ...props}: TextAreaOwnProps) => {
    const [field, meta] = useField(props);
    return (
        <div className="field-with-label">
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-text-area" {...field} {...props} />
            {meta.touched && meta.error ? (
                <RequiredFieldError />
            ) : null}
        </div>
    );
  };
