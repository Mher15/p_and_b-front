import { useField } from "formik";
import { RequiredFieldError } from "./form-validation-error";

interface IOption {
    value: number,
    text: string
}

interface ISelectOwnProps {
    label: string,
    id: string,
    name: string,
    options: IOption[] 
}

export const Select = ({label, options, ...props}: ISelectOwnProps) => {
    const [field, meta] = useField(props);
    return (
        <div className="field-with-label">
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            <select className="form-select" {...field} {...props}>
                {options.map((option) => (
                    <option
                        className="form-select-option"
                        key={option.value}
                        value={option.value}
                    >
                        {option.text}
                    </option>
                ))}
            </select>
            {meta.touched && meta.error ? (
                <RequiredFieldError />
            ) : null}
        </div>
    );
  };        
