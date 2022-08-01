// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

import CardHeader from '@mui/material/CardHeader'

import MuiDivider, { DividerProps } from '@mui/material/Divider'
import { paymentService } from 'src/services/payment-service'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PaymentStatusResponse } from 'src/models/payments/payment-request'


interface State {
    message: string,
    error: string,
    loading: boolean,
    id: number
    paymentStatus: PaymentStatusResponse
}



const PaymentStatus = () => {
    const router = useRouter()
    const { id } = router.query

    const [values, setValues] = useState<State>({
        message: '',
        error: '',
        loading: true,
        id: 0,
        paymentStatus: {
            paid: 0,
            status: '',
            total: 0
        }
    })
    const confirmPayment = (id: number): any => {
        return paymentService.confirmPayment({ id: id }).then((data) => {
            console.log(data);
            setValues({ ...values, paymentStatus: data, loading: false })

        }).catch((error: any) => {
            console.log(error);
        })
    }

    useEffect(() => {
        confirmPayment(id);
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                <Typography variant='h5'>Payment status for order {id}</Typography>
            </Grid>


            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
                    <Box sx={{ width: '100%' }}>

                        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
                            <Box

                                sx={{ display: 'flex', alignItems: 'center', mb: 6 }}
                            >
                                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                                    <img src='/images/logos/stripe.png' alt="Paynow" width="20" height="28" />
                                </Box>
                                <Box
                                    sx={{
                                        ml: 4,
                                        width: '100%',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Paid : Yes</Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Status : Submitted for settlement</Typography>
                                        <Typography variant='caption'>Date : 2022/07/34:13:05</Typography>
                                    </Box>
                                    <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'success.main' }}>
                                        200.00
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>


                </Card>
            </Grid>

        </Grid>
    )
}

export default PaymentStatus

