import { Box, BoxProps } from '@mui/material'
import { useFormikContext } from 'formik'
import { DetailedHTMLProps, FormHTMLAttributes, forwardRef } from 'react'

interface Props
  extends Omit<
    DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    'onSubmit' | 'onReset'
  > {
  sx?: BoxProps['sx']
}

const FormikForm = forwardRef<HTMLFormElement, Props>(function FormikForm(
  props,
  ref
) {
  const { handleSubmit, handleReset } = useFormikContext()
  return (
    <Box
      {...props}
      ref={ref}
      component="form"
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  )
})

export default FormikForm
