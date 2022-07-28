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

interface DataType {
    logo: string
    title: string
    amount: string
    subtitle: string
    logoWidth: number
    logoHeight: number
}

const depositData = [
    {
        logoWidth: 28,
        logoHeight: 29,
        amount: '+$4,650',
        subtitle: 'Sell UI Kit',
        title: 'Gumroad Account',
        logo: '/images/logos/gumroad.png'
    },
    {
        logoWidth: 38,
        logoHeight: 38,
        amount: '+$92,705',
        title: 'Mastercard',
        subtitle: 'Wallet deposit',
        logo: '/images/logos/mastercard-label.png'
    },
    {
        logoWidth: 20,
        logoHeight: 28,
        amount: '+$957',
        title: 'Stripe Account',
        subtitle: 'iOS Application',
        logo: '/images/logos/stripe.png'
    },
    {
        logoWidth: 34,
        logoHeight: 32,
        amount: '+$6,837',
        title: 'American Bank',
        subtitle: 'Bank Transfer',
        logo: '/images/logos/american-bank.png'
    },
    {
        logoWidth: 33,
        logoHeight: 22,
        amount: '+$446',
        title: 'Bank Account',
        subtitle: 'Wallet deposit',
        logo: '/images/logos/citi-bank.png'
    }
]

const withdrawData = [
    {
        logoWidth: 29,
        logoHeight: 30,
        amount: '-$145',
        title: 'Google Adsense',
        subtitle: 'Paypal deposit',
        logo: '/images/logos/google.png'
    },
    {
        logoWidth: 34,
        logoHeight: 34,
        amount: '-$1870',
        title: 'Github Enterprise',
        logo: '/images/logos/github.png',
        subtitle: 'Security & compliance'
    },
    {
        logoWidth: 30,
        logoHeight: 30,
        amount: '-$450',
        title: 'Upgrade Slack Plan',
        subtitle: 'Debit card deposit',
        logo: '/images/logos/slack.png'
    },
    {
        logoWidth: 30,
        logoHeight: 30,
        amount: '-$540',
        title: 'Digital Ocean',
        subtitle: 'Cloud Hosting',
        logo: '/images/logos/digital-ocean.png'
    },
    {
        logoWidth: 36,
        logoHeight: 21,
        amount: '-$21',
        title: 'AWS Account',
        logo: '/images/logos/aws.png',
        subtitle: 'Choosing a Cloud Platform'
    }
]

// Styled Divider component
const Divider = styled(MuiDivider)<DividerProps>(({ theme }) => ({
    margin: theme.spacing(5, 0),
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('md')]: {
        borderRight: 'none',
        margin: theme.spacing(0, 5),
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}))


// Styled Box component
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}))

const CardBasic = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                <Typography variant='h5'>Balance available in wallet</Typography>
            </Grid>

            <Grid item xs={12} md={12}>
                <Card>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={7}>
                            <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
                                <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
                                    Lifetime Membership
                                </Typography>
                                <Typography variant='body2'>
                                    Here, I focus on a range of items and features that we use in life without giving them a second thought
                                    such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not
                                    fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for
                                    picking up women or men.
                                </Typography>
                                <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={5}>
                                        <StyledBox>
                                            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                                                <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                                                <Typography variant='body2'>Full Access</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                                                <Typography variant='body2'>15 Members</Typography>
                                            </Box>
                                        </StyledBox>
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                                            <StarOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                                            <Typography variant='body2'>Access all Features</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                                            <Typography variant='body2'>Lifetime Free Update</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                        <Grid
                            item
                            sm={5}
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
                                            899
                                        </Typography>
                                        <Typography variant='h6'>USD</Typography>
                                    </Box>
                                    <Typography variant='body2' sx={{ mb: 13.75, display: 'flex', flexDirection: 'column' }}>
                                        <span>5 Tips For Offshore</span>
                                        <span>Software Development</span>
                                    </Typography>
                                    <Button variant='contained'>Paynow</Button>
                                </Box>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
                    <Box sx={{ width: '100%' }}>
                        <CardHeader
                            title='Deposit History'
                            sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                            action={<Typography variant='caption'>View All</Typography>}
                            titleTypographyProps={{
                                variant: 'h6',
                                sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
                            }}
                        />
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
                                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Paynow #REF208349</Typography>
                                        <Typography variant='caption'>2022/07/34:13:05</Typography>
                                    </Box>
                                    <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'success.main' }}>
                                        +200.00
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>

                    <Divider flexItem />

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
                                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Application #REF208349</Typography>
                                        <Typography variant='caption'>2022/07/34:13:05</Typography>
                                    </Box>
                                    <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'danger.main' }}>
                                        -100.00
                                    </Typography>
                                </Box>
                            </Box>
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
                                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Verify Cert #REF208349</Typography>
                                        <Typography variant='caption'>2022/07/34:13:05</Typography>
                                    </Box>
                                    <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'danger.main' }}>
                                        -200.00
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

export default CardBasic
