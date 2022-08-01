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
import { certificateService } from 'src/services/certificate-service'
import { useEffect, useState, ChangeEvent } from 'react'

interface Column {
    id: 'grad' | 'student' | 'regNumber' | 'program' | 'nationalId' | 'institution' | 'createdAt' | 'signature' | 'classification' | 'dob' | 'enrol ' | 'actions',
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: number) => string,
}


const columns: readonly Column[] = [
    { id: 'regNumber', label: 'regNumber', minWidth: 70 },
    { id: 'student', label: 'Student', minWidth: 100 },
    {
        id: 'grad',
        label: 'Grad',
        minWidth: 50,
        format: (value: number) => value.toLocaleString('en-US')
    },
    {
        id: 'program',
        label: 'Program',
        minWidth: 200,
        format: (value: number) => value.toLocaleString('en-US')
    },
    {
        id: 'nationalId',
        label: 'Id number',
        minWidth: 100,
        format: (value: number) => value.toFixed(2)
    },
    {
        id: 'signature',
        label: 'Signature',
        minWidth: 70,
        format: (value: number) => value.toFixed(2)
    },
    {
        id: 'classification',
        label: 'Classification',
        minWidth: 40,
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
    const [certificates, setCertificates] = useState<any>([]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const getCerficates = () => {
        return certificateService.institution().then((data: any) => {
            setCertificates(data);
            setValues({ ...values, message: '', error: '', loading: false })

        }).catch((error: any) => {
            console.log(error);
            setValues({ ...values, message: '', error: error.message, loading: false })
        })
    }

    const rejectCertificate = (certificateId: string) => {
        return certificateService.reject(certificateId).then((data: any) => {
            setValues({ ...values, message: 'Certificate rejected', error: '', loading: false })
            getCerficates();
        }
        ).catch((error: any) => {
            console.log(error);
            setValues({ ...values, message: '', error: error.message, loading: false })

        })
    }
    const signCertificate = (certificateId: string) => {
        return certificateService.reject(certificateId).then((data: any) => {
            setValues({ ...values, message: 'Certificate signed', error: '', loading: false })
            getCerficates();
        }
        ).catch((error: any) => {
            console.log(error);
            setValues({ ...values, message: '', error: error.message, loading: false })

        })
    }

    useEffect(() => {
        getCerficates();
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='All certificates' titleTypographyProps={{ variant: 'h6' }} />
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
                                    {certificates.length > 0 ? certificates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
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
                                                            <Link href="#" onClick={rejectCertificate(row.id)}>Reject</Link>
                                                            <Link href="#">{"    "}</Link>
                                                            <Link href="#" onClick={signCertificate(row.id)}>Sign</Link>
                                                        </TableCell>
                                                    )
                                                })}

                                            </TableRow>
                                        )
                                    }) : (<Alert
                                        severity='warning'
                                        sx={{ '& a': { fontWeight: 400 } }}
                                    >
                                        <AlertTitle>No certificates yet</AlertTitle>

                                    </Alert>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component='div'
                            count={certificates.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Card>
            </Grid>
        </Grid>
    )
}

export default All
