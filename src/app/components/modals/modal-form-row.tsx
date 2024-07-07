import { ReactNode } from 'react';
import { FormValidationError } from '../form/form-validation-error';

interface OwnProps {
    error: string | undefined,
    children: ReactNode,
    label: string
}

export const ModalFormRow = ({error, label, children}: OwnProps) => {
  return (
    <div className='modal-form-row'>
        <label className='modal-form-row-label'>
          {`${label}:`}
          {children}
        </label>        
        {error ? <FormValidationError error={error} /> : null}
    </div>
  );
}