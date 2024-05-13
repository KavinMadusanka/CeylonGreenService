import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

export default class ContactDetailsView extends React.Component {
    render() {
        const allContact = this.props.allContact;

        return (
            <div style={{ padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '28px', fontFamily: 'Platypi, serif', fontWeight: 'bold' }}>Ceylon Green Cleaning Service. </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '18px', fontFamily: 'Platypi, serif', fontWeight: 'bold' }}>All Contact Us Details. </Typography>
                </div>
                <div>
                    <Box >
                        <TableContainer>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>#</TableCell>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>Name</TableCell>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>Email Address</TableCell>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>Message</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allContact.map((row, i) => (
                                        <TableRow key={row._id}>
                                            <TableCell align='center' >{i + 1}</TableCell>
                                            <TableCell align='center' >{row.name}</TableCell>
                                            <TableCell align='center' >{row.phone}</TableCell>
                                            <TableCell align='center' >{row.email}</TableCell>
                                            <TableCell align='center' >{row.message}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>
        )
    }
}

