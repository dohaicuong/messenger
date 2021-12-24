import { Button, Container, Grid, Link, Paper, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import TextField from '../../components/TextField'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, Navigate } from 'react-router-dom'
import { useMutation, graphql } from 'react-relay'
import { LoginPageMutation, UserLoginInput } from './__generated__/LoginPageMutation.graphql'
import { useSnackbar } from 'notistack'
import { useAuth } from '../../providers/auth'

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { token, signin } = useAuth()

  const [loginCommit, isLoggingIn] = useMutation<LoginPageMutation>(graphql`
    mutation LoginPageMutation($input: UserLoginInput!) {
      login(input: $input) {
        jwt
        user { firstName }
      }
    }
  `)

  const methods = useForm<UserLoginInput>()
  const onSubmit: SubmitHandler<UserLoginInput> = data => {
    loginCommit({
      variables: { input: data },
      onCompleted: (res, errors) => {
        if (errors?.length) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        signin(res.login.jwt)
        enqueueSnackbar(`Welcome, ${res.login.user.firstName}`, { variant: 'success' })
      }
    })
  }

  if (token) return <Navigate to='/app' />

  return (
    <Grid container height='100vh' alignItems='center' justifyContent='center'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Container maxWidth='xs'>
            <Paper style={{ padding: '16px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, fontSize: 50 }}>
                <SendIcon fontSize='inherit' />
              </div>

              <Typography textAlign='center' variant='h5' style={{ marginBottom: 24 }}>
                Sign in to your account
              </Typography>
              
              <TextField
                label='email'
                fullWidth
                margin='normal'
                type='email'
                {...methods.register('email')}
                disabled={isLoggingIn}
              />

              <TextField
                label='password'
                fullWidth
                margin='normal'
                type='password'
                {...methods.register('password')}
                disabled={isLoggingIn}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link underline='none' variant='subtitle2' component={RouterLink} to='/forgot-password'>
                  Forgot password?
                </Link>
              </div>

              <Button
                variant='contained'
                type='submit'
                fullWidth
                style={{ marginTop: 24, marginBottom: 8 }}
                disabled={isLoggingIn}
              >
                Login
              </Button>

              <Typography textAlign='center' variant='caption' component='p' style={{ marginTop: 32, marginBottom: 4 }}>
                Or sign up new account
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link underline='none' component={RouterLink} to='/signup'>
                  Create account
                </Link>
              </div>
            </Paper>
          </Container>
        </form>
      </FormProvider>
    </Grid>
  )
}

export default LoginPage
