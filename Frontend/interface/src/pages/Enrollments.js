import Layout from '../components/Layout/Layout'
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';
import Save from '@mui/icons-material/Save';
import jsPDF from 'jspdf';
import 'jspdf-autotable';;

const Enrollments = () => {

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [enrolls, setEnrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [newEnroll, setNewEnroll] = useState({
    employeeId: '',
    programId: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/v1/enrollments/enrollments`);
        const data = await response.json();
        setEnrolls(data.enrollments);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/v1/programs/get-programs`);
        const data = await response.json();
        setPrograms(data.programs);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/v1/employees/get-employees`);
        const data = await response.json();
        setEmployees(data.employees);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleCreateEnroll = (field, value) => {
    setNewEnroll((prevData) => ({ ...prevData, [field]: value }));
  };

  const empEnroll = async () => {
    console.log(newEnroll)
    try {
      const result = await fetch(`http://localhost:9000/api/v1/enrollments/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEnroll),
      });
      const data = await result.json();

      if (result.ok) {
        console.log('Enroll Published successfully:', data);
        toast.success(data.message);
        refreshPage();
        handleClose();
      } else {
        console.error('Error enrolling employee:', data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error enrolling employee:', error);
      toast.error('An error occurred while creating the teacher.');
    }
  };

  const handleDeleteEnroll = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:9000/api/v1/enrollments/enrollment/${id}`);

      if (result) {
        toast.warning('Enrollent Removed');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['No', 'Program Name', 'Employee Name']],
      body: enrolls.map((program, i) => 
        [i+1, program.programId ? `${program.programId.programName}` : 'N/A', program.employeeId ? `${program.employeeId.firstname} ${program.employeeId.lastname}` : 'N/A'])
    });
    doc.save(`Enrolls.pdf`);
  };

  return (
    <Layout title="enrollments">

      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '20px', marginRight: '20px', marginTop:'20px' }}>
        <Button
          size="small"
          variant="outlined"
          onClick={handleClickOpen}>
          Enroll to Program
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Save />}
          color="info"
        onClick={() => generatePDF()}
        >
          Generate PDF
        </Button>
      </div>

      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Enroll to Program</DialogTitle>
          <DialogContent>
            <div style={{ minWidth: '400px' }}>
              <Typography component="legend">Program</Typography>
              <Select
                fullWidth
                margin="normal"
                labelId="category-label"
                value={newEnroll.programId}
                onChange={(e) => handleCreateEnroll('programId', e.target.value)}
              >
                {programs.map(item => (
                  <MenuItem key={item._id} value={item._id}>{item.programName}</MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <Typography component="legend">Employee</Typography>
              <Select
                fullWidth
                margin="normal"
                labelId="category-label"
                value={newEnroll.employeeId}
                onChange={(e) => handleCreateEnroll('employeeId', e.target.value)}
              >
                {employees.map(item => (
                  <MenuItem key={item._id} value={item._id}>{item.firstname} {item.lastname}</MenuItem>
                ))}
              </Select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={empEnroll} variant='outlined'>Enroll</Button>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Program Title</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrolls.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.employeeId ? `${row.employeeId.firstname} ${row.employeeId.lastname}` : 'N/A'}</TableCell>
                <TableCell>{row.programId ? `${row.programId.programName}` : 'N/A'}</TableCell>
                <TableCell>
                  <Button size="small" startIcon={<DeleteIcon />} variant="outlined" color="error" onClick={() => handleDeleteEnroll(row._id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export default Enrollments