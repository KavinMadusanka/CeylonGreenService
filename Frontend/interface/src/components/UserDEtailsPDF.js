import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

export default class UserDEtailsPDF extends React.Component {
    render() {
        const allUSers = this.props.allUSers
        return (
            <div style={{ padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '28px', fontFamily: 'Platypi, serif', fontWeight: 'bold' }}>Ceylon Green Cleaning Service. </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: '18px', fontFamily: 'Platypi, serif', fontWeight: 'bold' }}>All User Details. </Typography>
                </div>
                <div>
                    <Box >
                        <TableContainer>
                            <Table >
                                <TableHead>
                                    <TableRow sx={{ border: '1px solid black' }}>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>#</TableCell>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>Name</TableCell>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>Home Address</TableCell>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                                        <TableCell align='center' style={{ fontWeight: 'bold' }}>Email Address</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allUSers.map((row, i) => (
                                        <TableRow sx={{ border: '1px solid black' }} key={row._id}>
                                            <TableCell align='center'>{i + 1}</TableCell>
                                            <TableCell align='center'>{row.name}</TableCell>
                                            <TableCell align='center'>{row.address}</TableCell>
                                            <TableCell align='center'>{row.pNumber}</TableCell>
                                            <TableCell align='center'>{row.email}</TableCell>
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

