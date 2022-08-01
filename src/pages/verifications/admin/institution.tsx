// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { verificationService } from '../../../services/verification-service';
import { useEffect, useState } from 'react'
import { User } from 'src/models/auth/auth-request'


interface State {
    message: string,
    error: string,
    loading: boolean,
    userDetails: User,
}
const Verifications = () => {
    const [values, setValues] = useState<State>({
        message: '',
        error: '',
        loading: true,
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
        },
    })

    const [verifications, setVerifications] = useState<any>([
        {
            "certificate": {
                "broadCasted": true,
                "classification": "2.1",
                "createdAt": "2022-08-01T04:24:00.560Z",
                "dob": "27/02/2000",
                "enrol": "2018",
                "grad": "2022",
                "id": "2",
                "institution": "University of Zimbabwe",
                "nationalId": "63-2095320E63",
                "program": "BSC Computer Science",
                "regNumber": "R187437F",
                "signature": "BM",
                "student": "Blessing Mwale",
                "valid": true
            },
            "date": "2022-08-01T04:24:00.560Z",
            "id": 0,
            "legit": true,
            "verifier": "blessingmwalein@outlook.com"
        },
        {
            "certificate": {
                "broadCasted": true,
                "classification": "2.1",
                "createdAt": "2022-08-01T04:24:00.560Z",
                "dob": "27/02/2000",
                "enrol": "2018",
                "grad": "2022",
                "id": "2",
                "institution": "University of Zimbabwe",
                "nationalId": "63-2095320E63",
                "program": "BSC Computer Science",
                "regNumber": "R187437F",
                "signature": "BM",
                "student": "Blessing Mwale",
                "valid": true
            },
            "date": "2022-08-01T04:24:00.560Z",
            "id": 0,
            "legit": true,
            "verifier": "blessingmwalein@outlook.com"
        }
    ])


    function getAllVerifications() {
        verificationService.institution().then(res => {
            console.log(res);
            // setVerifications(res);
        }
        ).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllVerifications();
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Institution verifications' titleTypographyProps={{ variant: 'h6' }} />
                    <TableCollapsible verifications={verifications} />
                </Card>
            </Grid>
        </Grid>
    )
}

export default Verifications
