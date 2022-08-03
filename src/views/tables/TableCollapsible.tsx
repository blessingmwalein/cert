// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'


const Row = (props: { verification: any }) => {
  // ** Props
  const { verification } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {verification.id}
        </TableCell>
        <TableCell>{verification.verifier}</TableCell>
        <TableCell>{verification.legit}</TableCell>
        <TableCell>{verification.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Certificate Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Options</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.keys(verification.certificate).map(key => {
                      return (
                        <TableRow key={key}>
                          <TableCell>{key.toUpperCase()}</TableCell>
                          <TableCell>{verification.certificate[key]}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}


const TableCollapsible = (props: any) => {
  const { verifications } = props

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell>Verifier</TableCell>
            <TableCell>Legit</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {verifications.length > 0 ? verifications.map((verification: any) => (
            <Row key={verification.id} verification={verification} />
          )) : (<Alert
            severity='warning'
            sx={{ '& a': { fontWeight: 400, width: '100%', textAlign: 'center' } }}
          >
            <AlertTitle>No verifications yet</AlertTitle>

          </Alert>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCollapsible
