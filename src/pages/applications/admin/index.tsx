// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { applicationService } from 'src/services/application.service'
import { useEffect, useState, ChangeEvent } from 'react'
import Button from '@mui/material/Button'
import { ApplicationRequest } from 'src/models/application/application-request'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Column {
    id: 'userEmail' | 'actions' | 'regNumber' | 'program' | 'nationalId' | 'institution' | 'createdAt' | 'applicationStatus',
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: number) => string,
}

const columns: readonly Column[] = [

    { id: 'userEmail', label: 'User email', minWidth: 100 },
    {
        id: 'regNumber',
        label: 'Regnumber',
        minWidth: 70,
        format: (value: number) => value.toLocaleString('en-US')
    },
    {
        id: 'program',
        label: 'Program',
        minWidth: 100,
        format: (value: number) => value.toLocaleString('en-US')
    },
    {
        id: 'nationalId',
        label: 'Id number',
        minWidth: 100,
        format: (value: number) => value.toFixed(2)
    },
    {
        id: 'applicationStatus',
        label: 'Status',
        minWidth: 70,
        format: (value: number) => value.toFixed(2)
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 40,
        format: (value: number) => value.toFixed(2)
    }
]

interface Data {
    id: string
    userEmail: string
    regNumber: string
    program: string
    nationalId: string
    applicationStatus: string
    createdAt: string
}



const All = () => {
    // ** States
    const [values, setValues] = useState<any>({
        message: '',
        error: '',
        loading: true,
    })
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [applications, setApplication] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [openReject, setOpenReject] = useState(false);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenReject = () => {
        setOpenReject(true);
    };

    const handleCloseReject = () => {
        setOpenReject(false);
    };

    const getApplications = () => {
        return applicationService.all().then((data: any) => {
            setApplication(data);
            setValues({ ...values, message: '', error: '', loading: false })
        }).catch((error: any) => {
            console.log(error);
            setValues({ ...values, message: '', error: error.message, loading: false })
        })
    }

    const approve = (data: ApplicationRequest) => {
        setValues({ ...values, message: "", error: "", loading: true })
        console.log(data)

        return applicationService.approve(data).then((response: any) => {
            console.log(response);
            setValues({ ...values, message: `Application approved ${response.applicationStatus}`, loading: false })
            handleClose()
            setTimeout(() => {
                getApplications();
            }, 3000);
        })
            .catch((error: any) => {
                console.log(error);
                setValues({ ...values, error: error.response?.data?.message, loading: false })
            })
    }

    const reject = (data: ApplicationRequest) => {
        setValues({ ...values, message: "", error: "", loading: true })
        console.log(data)
        return applicationService.reject(data).then((response: any) => {
            console.log(response);
            setValues({ ...values, message: `Application rejected ${response.applicationStatus}`, loading: false })
            handleCloseReject()
            setTimeout(() => {
                getApplications();
            }, 3000);
        })
            .catch((error: any) => {
                console.log(error);
                setValues({ ...values, error: error.response?.data?.message, loading: false })
            })
    };


    useEffect(() => {
        getApplications();
    }, []);

    return (
        <><Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Approve this application"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to approve this application
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={() => approve(row)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog><Dialog
            open={openReject}
            onClose={handleCloseReject}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title">
                    {"Reject this application"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to reject this application
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReject}>Disagree</Button>
                    <Button onClick={() => reject(row)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog><Grid container spacing={6}>


                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='All applications' titleTypographyProps={{ variant: 'h6' }} />
                        {values.message ? <Alert

                            severity='success'
                            sx={{ '& a': { fontWeight: 400 } }}
                        >
                            <AlertTitle>{values.message}</AlertTitle>
                        </Alert> : ''}

                        {values.error ? <Alert

                            severity='error'
                            sx={{ '& a': { fontWeight: 400 } }}
                        >
                            <AlertTitle>{values.error}</AlertTitle>

                        </Alert> : ''}
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label='sticky table'>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map(column => (
                                                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {applications.length > 0 ? applications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                                            return (
                                                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                                                    {columns.map(column => {
                                                        const value = row[column.id]

                                                        return column.id !== 'actions' ? (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                            </TableCell>

                                                        ) : (
                                                            <TableCell key={column.id} align={column.align}>
                                                                <Button onClick={handleClickOpen} style={{ color: "blue", backgroundColor: '#F5F5F5', marginBottom: "2px" }}>Approve</Button>
                                                                <Button onClick={handleClickOpenReject} style={{ color: "red", backgroundColor: '#F5F5F5' }}>Reject</Button>
                                                            </TableCell>
                                                        )
                                                    })}

                                                </TableRow>

                                            )
                                        }) : (<Alert

                                            severity='warning'
                                            sx={{ '& a': { fontWeight: 400 } }}
                                        >
                                            <AlertTitle>No applications yet</AlertTitle>

                                        </Alert>)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component='div'
                                count={applications.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage} />
                        </Paper>
                    </Card>
                </Grid>
            </Grid></>
    )
}

export default All
