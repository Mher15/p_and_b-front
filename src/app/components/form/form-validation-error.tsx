interface Props {
    error: string
}

export const FormValidationError = ({error}: Props) => (
    <span className="form-validation-error">{error}</span>
);

export const RequiredFieldError = () => <FormValidationError error="Необходимо заполнить поле"/>;