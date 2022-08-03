// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import { PasswordResetRequest, User } from 'src/models/auth/auth-request'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { authService } from '../../services/auth.service';
import { userService } from 'src/services/user.service';

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean,
  message: string,
  error: string,
  loading: boolean,
  userDetails: User
}

const schema = Yup.object().shape({
  newPassword: Yup.string().required(),
  oldPassword: Yup.string().required(),
}).required();

const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false,
    message: '',
    error: '',
    loading: false,
    userDetails: {
      "sub": "",
      "userId": 1,
      "email": "",
      "username": "",
      "role": [
        {
          "id": 3,
          "role": "",
          "certHolderRole": false
        }
      ],
      "iat": 0,
      "exp": 0
    }
  })

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const { register, handleSubmit, setError, formState: { errors }, resetField } = useForm<PasswordResetRequest>(
    {
      resolver: yupResolver(schema)
    }
  );
  const onSubmit = handleSubmit((data: PasswordResetRequest) => {
    setValues({ ...values, message: "", error: "", loading: true })
    userService.updatePassword(data).then((data: any) => {
      console.log(data);
      setValues({ ...values, message: `${data.data} you have to login again in 3 seconds`, error: '', loading: false })
      setTimeout(() => {
        authService.logout();
      }, 3000);
    }
      , (error) => {
        if (error.response.status === 417) {
          setValues({ ...values, error: error.response.data.data, loading: false })
        }
      }
    )
  })


  useEffect(() => {
    if (localStorage) {
      let userData = authService.decodeToken();
      console.log(userData);
      setValues({ ...values, userDetails: userData });
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      {
        values.message ? <Alert

          severity='success'
          sx={{ '& a': { fontWeight: 400 } }}
        >
          <AlertTitle>{values.message}</AlertTitle>
        </Alert> : ''
      }

      {
        values.error ? <Alert

          severity='error'
          sx={{ '& a': { fontWeight: 400 } }}
        >
          <AlertTitle>{values.error}</AlertTitle>

        </Alert> : ''
      }
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth {...register('oldPassword')}>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    id='account-settings-current-password'
                    {...register('oldPassword')}
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth {...register('newPassword')}>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    id='account-settings-new-password'
                    {...register('newPassword')}
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>

        <Box sx={{ mt: 11 }}>
          <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit' disabled={values.loading}>
            {values.loading ? 'Saving...' : 'Save changes'}
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
export default TabSecurity
