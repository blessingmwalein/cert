// ** MUI Imports
import Grid from '@mui/material/Grid'
import { ChangeEvent, forwardRef, MouseEvent, useEffect, useState } from 'react'
// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'
import FormHelperText from '@mui/material/FormHelperText'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { certificateService } from 'src/services/certificate-service'
import { CreateCertificateRequest } from 'src/models/certificates/certificate-request'
import { userService } from 'src/services'

interface State {
  message: string
  error: string
  loading: boolean
}

const schema = Yup.object()
  .shape({
    userEmail: Yup.string().email().required(),
    institution: Yup.string().required(),
    nationalId: Yup.string().required(),
    program: Yup.string().required(),
    regNumber: Yup.string().required(),
    dob: Yup.string().required(),
    classification: Yup.string().required(),
    enrol: Yup.string().required(),
    grad: Yup.string().required()
  })
  .required()

const Create = () => {
  const [values, setValues] = useState<State>({
    message: '',
    error: '',
    loading: false
  })
  const [institutions, setInstitutions] = useState<any>([])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    resetField,
    reset
  } = useForm<CreateCertificateRequest>({
    resolver: yupResolver(schema)
  })
  const onSubmit = handleSubmit((data: CreateCertificateRequest) => {
    setValues({ ...values, message: '', error: '', loading: true })

    console.log(data)

    return certificateService
      .create(data)
      .then((response: any) => {
        console.log(response)

        setValues({ ...values, message: `Certificate created `, loading: false })
        reset()
      })
      .catch((error: any) => {
        console.log(error)
        setValues({ ...values, error: error.response?.data?.message, loading: false })
      })
  })

  const getInstitutions = () => {
    return userService
      .getRegisteredInstitutions()
      .then((data: any) => {
        console.log(data)
        setInstitutions(data)
        setValues({ ...values, message: '', error: '', loading: false })
      })
      .catch((error: any) => {
        console.log(error)
        setValues({ ...values, message: '', error: error.message, loading: false })
      })
  }
  //create function to get all institutions

  useEffect(() => {
    getInstitutions()
  }, [])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Create a certifiacte' titleTypographyProps={{ variant: 'h6' }} />
            {values.message ? (
              <Alert severity='success' sx={{ '& a': { fontWeight: 400 } }}>
                <AlertTitle>{values.message}</AlertTitle>
              </Alert>
            ) : (
              ''
            )}

            {values.error ? (
              <Alert severity='error' sx={{ '& a': { fontWeight: 400 } }}>
                <AlertTitle>{values.error}</AlertTitle>
              </Alert>
            ) : (
              ''
            )}
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={onSubmit}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      1. Application Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Reg Number'
                      placeholder='R187437F'
                      {...register('regNumber')}
                      helperText={errors.regNumber && errors.regNumber?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='email'
                      label='Email'
                      placeholder='bmwale@gmail.com'
                      {...register('userEmail')}
                      helperText={errors.userEmail && errors.userEmail?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ marginBottom: 0 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      2. Personal Info
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      helperText='Please use this format 63-2095320E63'
                      label='National Id'
                      placeholder='63-2095320E63'
                      {...register('nationalId')}
                    />
                    <FormHelperText sx={{ ml: 3.5 }} id='form-layouts-basic-password-helper'>
                      {errors.nationalId && errors.nationalId?.message}
                    </FormHelperText>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      helperText={errors.program && errors.program?.message}
                      label='Programme'
                      placeholder='Programme...'
                      {...register('program')}
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <MessageOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Dob'
                      type='date'
                      placeholder='27/02/1999'
                      {...register('dob')}
                      helperText={errors.dob && errors.dob?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='classification'
                      label='Classification'
                      placeholder='2.1'
                      {...register('classification')}
                      helperText={errors.classification && errors.classification?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth {...register('institution')}>
                      <InputLabel id='form-layouts-separator-select-label'>Institution</InputLabel>
                      <Select
                        label='Institution'
                        defaultValue='UZ'
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        {...register('institution')}
                      >
                        {institutions.map((institution: any) => (
                          <MenuItem key={institution.id} value={institution.institution}>
                            {institution.institution}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormHelperText id='form-layouts-basic-password-helper'>
                      {errors.institution && errors.institution?.message}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Enrol'
                      type='number'
                      placeholder='2018'
                      {...register('enrol')}
                      helperText={errors.enrol && errors.enrol?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type='grad'
                      label='Graduation'
                      type='number'
                      placeholder='2022'
                      {...register('grad')}
                      helperText={errors.grad && errors.grad?.message}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ margin: 0 }} />
              <CardActions>
                <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' disabled={values.loading}>
                  {values.loading ? 'Creating...' : 'Create'}
                </Button>
                <Button size='large' color='secondary' variant='outlined'>
                  Cancel
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Create
