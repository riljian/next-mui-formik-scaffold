import {
  LoadingButton as MuiLoadingButton,
  LoadingButtonProps as MuiLoadingButtonProps,
} from '@mui/lab'
import { useFormikContext } from 'formik'
import { forwardRef } from 'react'

const FormikLoadingButton = forwardRef<
  HTMLButtonElement,
  Omit<MuiLoadingButtonProps, 'loading'>
>(function FormikLoadingButton(props, ref) {
  const { isSubmitting } = useFormikContext()
  return <MuiLoadingButton {...props} ref={ref} loading={isSubmitting} />
})

export default FormikLoadingButton
