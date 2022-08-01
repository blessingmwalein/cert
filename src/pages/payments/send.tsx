// ** MUI Imports
import Grid from '@mui/material/Grid'
import { ChangeEvent, forwardRef, MouseEvent, useEffect, useState } from 'react'
// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
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
import { User } from '../../models/auth/auth-request';
import { paymentService } from '../../services/payment-service';
import { PaymentRequest, PaynowResponse } from 'src/models/payments/payment-request'
import { authService } from '../../services/auth.service';

interface State {
    message: string,
    error: string,
    loading: boolean,
    userDetails: User
}


const schema = Yup.object().shape({
    amount: Yup.number().required(),
}).required();


const Send = () => {

    const [values, setValues] = useState<State>({
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

    const { register, handleSubmit, setError, formState: { errors }, resetField } = useForm<PaymentRequest>(
        {
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = handleSubmit((data: PaymentRequest) => {
        setValues({ ...values, message: "", error: "", loading: true })
        console.log(data)
        data.userId = values.userDetails.userId.toString();

        paymentService.send(data).then((data: PaynowResponse) => {
            console.log(data);
            if (data.status === "OK") {
                setValues({ ...values, message: "Payment initiated you are being redirected to paynow in 5 seconds", error: "", loading: false })
                resetField('amount');
                setTimeout(() => {
                    window.location.href = data.redirectURL;
                } , 5000);
            } else {
                setValues({ ...values, message: "Failed to initiate payment try againe", error: "", loading: false })
                resetField('amount');
            }
        }
            , (error) => {
                setValues({ ...values, message: "", error: error.message, loading: false })
                // resetFields();
            }
        )
    })


    useEffect(() => {
        if (localStorage) {
            var userData = authService.decodeToken();
            console.log(userData);
            setValues({ ...values, userDetails: userData });
        }
    }, []);

    return (
        <DatePickerWrapper>
            <Grid container spacing={6}>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Send payment' titleTypographyProps={{ variant: 'h6' }} />
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
                                            1. Payment Details
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField fullWidth label='Amount' placeholder='0.00' {...register('amount')} helperText={errors.amount && errors.amount?.message} />
                                    </Grid>

                                </Grid>
                            </CardContent>
                            <Divider sx={{ margin: 0 }} />
                            <CardActions>
                                <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' disabled={values.loading}>
                                    {values.loading ? 'Sending...' : 'Send'}
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

export default Send
