import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { useField } from 'formik'
import { forwardRef } from 'react'

interface Props
  extends Omit<MuiTextFieldProps, 'value' | 'onBlur' | 'onChange' | 'error'> {
  name: string
}

const FormikTextField = forwardRef<HTMLInputElement, Props>(
  function FormikTextField(props, ref) {
    const { name, helperText = ' ' } = props
    const [{ value, onBlur, onChange }, { touched, error }] = useField(name)
    const shouldShowError = touched && !!error
    return (
      <MuiTextField
        {...props}
        ref={ref}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={shouldShowError}
        helperText={shouldShowError ? error : helperText}
      />
    )
  }
)

export default FormikTextField
