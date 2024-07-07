import { useField } from "formik";
import { RequiredFieldError } from "./form-validation-error";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface FileInputOwnProps {
    label: string,
    id: string,
    name: string,
    accept?: string,
    setFile: Dispatch<SetStateAction<File | null>>
}

export const FileInput = ({label, setFile, accept, ...props}: FileInputOwnProps) => {
    const [field, meta] = useField(props);

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {        
            if(!event.target.files) return;
            const files: File[] = event.target.files
                ? Array.from(event.target.files)
                : [];
    
            const image = files[0];
            setFile(image)
        }
    return (
        <div className="field-with-label">
            <label className="form-row-label" htmlFor={props.id || props.name}>{label}</label>
            <input 
                className="form-input"
                {...field}
                {...props}
                type="file"
                accept={accept || 'image/jpeg,image/png'}
                onChange = {onImageChange}
                
            />
            {
                meta.touched && meta.error ? (<RequiredFieldError />) : null
            }
        </div>
    );
};
