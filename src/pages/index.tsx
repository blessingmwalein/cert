// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useEffect, useState } from 'react'
import { authService } from '../services/auth.service';
import router from 'next/router'
import { BalanceResponse } from 'src/models/payments/payment-request'
import { paymentService } from 'src/services/payment-service'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'


const Dashboard = () => {

  const [userDetails, setUserDetails] = useState<any>({})

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
  function getUser() {
    const userDetails = authService.decodeToken()
    setUserDetails(userDetails)
    getPaymentHistory()
  }

  const createNewVerification = () => {
    router.push("/verifications/user/verify/");
  }
  const createNewCertificate = () => {
    router.push("/certificates/admin/create/");
  }


  useEffect(() => {
    getUser()
  }
    , [])
  return !values.loading ? (
    <ApexChartWrapper>
      {userDetails.role[0].role === 'ROLE_USER' || userDetails.role[0].role === 'ROLE_HOLDER' ?
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <Trophy userDetails={userDetails} balanceData={balanceData} />
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
              </Box>
            </Card>
          </Grid>

        </Grid> :
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <Card sx={{ position: 'relative' }}>
              <CardContent>
                <Typography variant='h6'>Welcome {userDetails.username} 🥳</Typography>
                <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                  {/* Your currently balance */}
                </Typography>
             
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ position: 'relative' }}>
              <CardContent>
                {/* <Typography variant='h6'>Welcome {userDetails.username} 🥳</Typography> */}
                <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                  {/* Your currently balance */}
                </Typography>
                <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                  Verifications
                </Typography>
                <Button size='small' variant='contained' onClick={() => createNewVerification()}>
                  Create new
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ position: 'relative' }}>
              <CardContent>
                <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                  Certificates
                </Typography>
                <Button size='small' variant='contained' onClick={() => createNewCertificate()}>
                  Create new
                </Button>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      }
    </ApexChartWrapper>
  ) : <div>Loading ....</div>
}

export default Dashboard
