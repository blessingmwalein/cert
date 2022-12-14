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
import { useEffect, useState } from 'react'
import { paymentService } from 'src/services/payment-service'
import { BalanceRequest, BalanceResponse } from '../../models/payments/payment-request';
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'


const CardBasic = () => {
    const [values, setValues] = useState<any>({
        message: '',
        error: '',
        loading: true,
        id: 0,
        history: [
        ]
    })
    const [history, setHistory] = useState<any>([]);
    const [balanceData, setBalanceData] = useState<BalanceResponse>({});
    const getPaymentHistory = (): any => {
        return paymentService.getHistory().then((data) => {
            console.log(data);
            // setValues({ ...values, message: '', error: '', loading: false })
            setHistory(data)
            getBalance()
        }).catch((error: any) => {
            console.log(error);
            setValues({ ...values, message: '', error: error.message, loading: false })
        })
    }

    const getBalance = (): any => {
        return paymentService.balance().then((data: any) => {
            console.log(data);
            setValues({ ...values, message: '', error: '', loading: false })
            setBalanceData(data)
        }).catch((error: any) => {
            console.log(error);
            setValues({ ...values, message: '', error: error.message, loading: false })
        })

    }
    useEffect(() => {
        getPaymentHistory();
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                <Typography variant='h5'>Balance available in wallet</Typography>
            </Grid>

            <Grid item xs={12} md={12}>
                <Card>
                    <Grid container spacing={6}>

                        <Grid
                            item
                            sm={12}
                            xs={12}
                            sx={{ paddingTop: ['0 !important', '1.5rem !important'], paddingLeft: ['1.5rem !important', '0 !important'] }}
                        >
                            <CardContent
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'action.hover',
                                    padding: theme => `${theme.spacing(18, 5, 16)} !important`
                                }}
                            >
                                <Box>
                                    <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Typography variant='h6'>$</Typography>
                                        <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important' }}>
                                            {balanceData.balance}
                                        </Typography>
                                        <Typography variant='h6'>ZWL</Typography> <br />
                                    </Box>
                                    <Button variant='contained'>Top up</Button>
                                </Box>
                            </CardContent>
                        </Grid>
                        <Grid item sm={12} xs={12}
                            >
                            <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>

                                <Box sx={{ width: '100%' }}>
                                    <CardHeader
                                        title='Payment History'
                                        sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                                        action={<Typography variant='caption'>View All</Typography>}
                                        titleTypographyProps={{
                                            variant: 'h6',
                                            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
                                        }}
                                    />
                                    {
                                        !values.loading ?
                                            <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
                                                {
                                                    history.map((item: any, index: number) => {
                                                        return (
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
                                                                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Transaction #{item.id}</Typography>
                                                                        <Typography variant='caption'>Complete : {item.complete ? "Yes" : "Pending"}</Typography>
                                                                        <Typography variant='caption'>Poll Url : {item.pollURl}</Typography>
                                                                        <Typography variant='caption'>Date : {item.transactionDate}</Typography>
                                                                    </Box>
                                                                    <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'danger.main' }}>
                                                                        Amount : ZWL{item.amount}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>)
                                                    })

                                                }

                                            </CardContent>
                                            : <div>Loading...</div>
                                    }
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>


        </Grid>
    )
}

export default CardBasic
