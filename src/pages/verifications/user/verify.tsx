// ** MUI Imports
import Grid from '@mui/material/Grid'
import { ChangeEvent, forwardRef, MouseEvent, useState } from 'react'
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
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { VerifyRequest } from 'src/models/application/application-request'
import { VerifyRequest } from 'src/models/verification/verification-request'
import { verificationService } from 'src/services/verification-service'
// import { applicationService } from 'src/services/application.service'

interface State {
    message: string,
    error: string,
    loading: boolean
}

const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const schema = Yup.object().shape({
    certificateId: Yup.string().required(),
    institution: Yup.string().required(),
    nationalId: Yup.string().required(),
    verifier: Yup.string().required(),
}).required();



const Verify = () => {

    const [values, setValues] = useState<State>({
        message: '',
        error: '',
        loading: false
    })

    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm<VerifyRequest>(
        {
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = handleSubmit((data: VerifyRequest) => {
        setValues({ ...values, message: "", error: "", loading: true })
        console.log(data)

        return verificationService.verify(data).then((response) => {
            console.log(response);

            setValues({ ...values, message: `Verification send`, loading: false })
            reset()
        })
            .catch((error: any) => {
                console.log(error);
                setValues({ ...values, error: error.response?.data?.message, loading: false })

            })
    });


    return (
        <DatePickerWrapper>
            <Grid container spacing={6}>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Verify a certificate' titleTypographyProps={{ variant: 'h6' }} />
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
                        <Divider sx={{ margin: 0 }} />
                        <form onSubmit={onSubmit}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                            1. Certificate Details
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label='Certificate Id' placeholder='12121' {...register('certificateId')} helperText={errors.certificateId && errors.certificateId?.message} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth type='email' label='Verifier' placeholder='bmwale@gmail.com' {...register('verifier')} helperText={errors.verifier && errors.verifier?.message} />
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
                                        <TextField fullWidth helperText="Please use this format 63-2095320E63" label='National Id' placeholder='63-2095320E63' {...register('nationalId')} />
                                        <FormHelperText sx={{ ml: 3.5 }} id='form-layouts-basic-password-helper'>
                                            {errors.nationalId && errors.nationalId?.message}
                                        </FormHelperText>
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
                                                <MenuItem value='UZ'>University of Zimbabwe</MenuItem>
                                                <MenuItem value='HIT'>Harare Institute of Technology</MenuItem>
                                                <MenuItem value='MSU'>Midlands State University</MenuItem>
                                                <MenuItem value='GZ'>Great Zimbabwe University</MenuItem>
                                                <MenuItem value='CUT'>Chinhoyi University ogf Technology</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormHelperText id='form-layouts-basic-password-helper'>
                                            {errors.institution && errors.institution?.message}
                                        </FormHelperText>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider sx={{ margin: 0 }} />
                            <CardActions>
                                <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' disabled={values.loading}>
                                    {values.loading ? 'Verifying...' : 'Verify'}
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

export default Verify
