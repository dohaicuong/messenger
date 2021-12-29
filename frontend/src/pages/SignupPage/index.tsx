import { Button, Container, Grid, Paper, Typography, Link } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../../common/TextField'
import { Link as RouterLink, Navigate } from 'react-router-dom'
import { useMutation, graphql } from 'react-relay'
import { useAuth } from '../../providers/auth'
import { SignupPageMutation, UserSignupInput } from './__generated__/SignupPageMutation.graphql'
import { useSnackbar } from 'notistack'

const SignupPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { token, signin } = useAuth()

  const [signupCommit, isSignningup] = useMutation<SignupPageMutation>(graphql`
    mutation SignupPageMutation($input: UserSignupInput!) {
      signup(input: $input) {
        jwt
        user { id firstName }
      }
    }
  `)

  const methods = useForm<UserSignupInput>()
  const onSubmit: SubmitHandler<UserSignupInput> = data => {
    signupCommit({
      variables: {
        input: data
      },
      onCompleted: (res, errors) => {
        if (errors?.length) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        signin(res.signup.jwt, res.signup.user.id)
        enqueueSnackbar(`Welcome, ${res.signup.user.firstName}`, { variant: 'success' })
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
                Create a new account
              </Typography>

              <TextField
                label='email'
                fullWidth
                margin='normal'
                type='email'
                required
                {...methods.register('email')}
                disabled={isSignningup}
              />

              <TextField
                label='password'
                fullWidth
                margin='normal'
                type='password'
                required
                {...methods.register('password')}
                disabled={isSignningup}
              />

              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    label='first name'
                    fullWidth
                    margin='normal'
                    required
                    {...methods.register('firstName')}
                    disabled={isSignningup}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    label='last name'
                    fullWidth
                    margin='normal'
                    required
                    {...methods.register('lastName')}
                    disabled={isSignningup}
                  />
                </Grid>
              </Grid>

              <TextField
                label='avatar'
                fullWidth
                margin='normal'
                {...methods.register('avatar')}
                disabled={isSignningup}
              />

              <Button
                variant='contained'
                type='submit'
                fullWidth
                style={{ marginTop: 24, marginBottom: 8 }}
                disabled={isSignningup}
              >
                Create account
              </Button>

              <Typography textAlign='center' variant='caption' component='p' style={{ marginTop: 32, marginBottom: 4 }}>
                Already have an account
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link underline='none' component={RouterLink} to='/'>
                  Sign in
                </Link>
              </div>
            </Paper>
          </Container>
        </form>
      </FormProvider>
    </Grid>
  )
}

export default SignupPage
