import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { forwardRef, useMemo } from 'react'
import { useFormState, FieldError } from 'react-hook-form'

export type TextFieldProps = Omit<MuiTextFieldProps, 'name'> & {
  name: string
}

const TextField: React.FC<TextFieldProps> = forwardRef(({ name, ...props }, ref) => {
  const { errors } = useFormState({ name })
  const error = errors[name] as FieldError | undefined

  return (
    <MuiTextField
      {...props}
      name={name}
      ref={ref}
      error={Boolean(error)}
      helperText={error?.message}
    />
  )
})

export default TextField
