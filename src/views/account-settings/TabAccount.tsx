// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { User } from '../../models/auth/auth-request';
import { authService } from 'src/services'
import { useForm } from 'react-hook-form'

interface State {
  userDetails: User
}

const TabAccount = () => {
  // ** State
  const [values, setValues] = useState<State>(
    {
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
    }
  )
  const { register, handleSubmit, setError, formState: { errors }, resetField, setValue } = useForm<PaymentRequest>();

  useEffect(() => {
    if (localStorage) {
      var userData = authService.decodeToken();
      console.log(userData);
      setValues({ ...values, userDetails: userData });
      setValue('email', userData.email, { shouldValidate: true })
      setValue('username', userData.username, { shouldValidate: true })
      setValue('role', userData.role[0].role, { shouldValidate: true })
    }
  }, []);

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>


          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Username' {...register('username')} placeholder='blessingmwalein' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              {...register('email')}
              placeholder='johnDoe@example.com'
              defaultValue='johnDoe@example.com'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='role'
              label='Role'
              {...register('role')}

            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
