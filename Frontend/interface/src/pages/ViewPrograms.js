import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
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
  InputAdornment,
} from '@mui/material';

import QRCode from 'qrcode.react';
import Layout from '../components/Layout/Layout'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ViewPrograms = () => {

  const [open2, setOpen2] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [qrCodeData, setQRCodeData] = useState(null);
  const [openQRCodeDialog, setOpenQRCodeDialog] = useState(false);

  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    programName: '',
    description: '',
    startDate: '',
    endDate: '',
    trainer: '',
    capacity: ''
  });


  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleUpdateProgram = (row) => {
    setOpen2(true);
    setUpdateFormData({
      _id: row._id,
      programName: row.programName,
      description: row.description,
      startDate: row.startDate,
      endDate: row.endDate,
      trainer: row.trainer,
      capacity: row.capacity
    });
  };

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  const generateQRCode = (rowData) => {
    const qrData = `Program Name: ${rowData.programName}\n` +
      `Start Date: ${new Date(rowData.startDate).toLocaleDateString()}\n` +
      `End Date: ${new Date(rowData.endDate).toLocaleDateString()}\n` +
      `Capacity: ${rowData.capacity}`;

    setQRCodeData(qrData);
    setOpenQRCodeDialog(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Program Name', 'Description', 'Start Date', 'End Date', 'Trainer', 'Capacity']],
      body: programs.map(program => [program.programName, program.description, new Date(program.startDate).toLocaleDateString(), new Date(program.endDate).toLocaleDateString(), program.trainer, program.capacity])
    });
    doc.save(`Programs.pdf`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/programs/get-programs`);
        setPrograms(response.data.programs);
        console.log(response.data.programs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8000/api/v1/programs/delete-program/${id}`);
      if (result) {
        handleClose2();
        toast.warning('Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  const handleUpdate = async () => {
    if (
      updateFormData.capacity >= 50
    ) {
      toast.error('Capacity should be less than 50');
      return;
    }
    try {
      const result = await axios.put(`http://localhost:8000/api/v1/programs/update-program/${updateFormData._id}`, updateFormData);

      if (result) {
        toast.success('Updated Successfully');
        handleClose2();
        refreshPage();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filteredPrograms = programs.filter((program) =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="enrollments">
      <div style={{ display: 'flex', alignItems: 'center', marginLeft:'20px', marginRight:'20px' }}>
        <TextField
          label="Search by Program Name"
          variant="outlined"
          size="small"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            style: { paddingRight: '8px' } // Add some padding to the right side
          }}
          sx={{ flexGrow: 1, marginRight: 2 }} // Grow to fill the space, add margin
        />
        <Button
          size="small"
          variant="outlined"
          startIcon={<SaveIcon />}
          color="info"
          onClick={() => generatePDF()}
        >
          Generate PDF
        </Button>
      </div>


      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Program Name</TableCell>
              <TableCell>Discription</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Trainer</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPrograms.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.programName}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{new Date(row.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(row.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{row.trainer}</TableCell>
                <TableCell>{row.capacity}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" startIcon={<VisibilityIcon />} color="warning"
                    onClick={() => handleUpdateProgram(row)}
                    sx={{ marginRight: 2 }}
                  > Update </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DocumentScannerIcon />}
                    color="success"
                    onClick={() => generateQRCode(row)}
                    sx={{ marginRight: 2 }}
                  >
                    Scan
                  </Button>

                  <Dialog open={openQRCodeDialog} onClose={() => setOpenQRCodeDialog(false)}>
                    <DialogTitle>QR Code</DialogTitle>
                    <DialogContent>
                      {qrCodeData && <QRCode value={qrCodeData} />}
                    </DialogContent>
                  </Dialog>


                  <Dialog open={open2} onClose={handleClose2} sx={{ border: '2px solid #ccc' }}>
                    <DialogTitle sx={{ textAlign: 'center' }}>Update Program</DialogTitle>
                    <DialogContent>
                      <div>
                        <TextField
                          required
                          id="outlined-read-only-input"
                          label="programName"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(e) => setUpdateFormData({ ...updateFormData, programName: e.target.value })}
                          value={updateFormData.programName}
                        />
                        <TextField
                          required
                          id="outlined-read-only-input"
                          label="Description"
                          fullWidth
                          multiline
                          rows={4}
                          margin="normal"
                          variant="outlined"
                          onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                          value={updateFormData.description}
                        />
                        <TextField
                          required
                          id="outlined-read-only-input"
                          label="Start Date"
                          fullWidth
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          onChange={(e) => setUpdateFormData({ ...updateFormData, startDate: e.target.value })}
                          value={updateFormData.startDate}
                        />
                        <TextField
                          required
                          id="outlined-read-only-input"
                          label="End Date"
                          fullWidth
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                          variant="outlined"
                          onChange={(e) => setUpdateFormData({ ...updateFormData, endDate: e.target.value })}
                          value={updateFormData.endDate}
                        />
                        <TextField
                          required
                          id="outlined-read-only-input"
                          label="Trainer"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(e) => setUpdateFormData({ ...updateFormData, trainer: e.target.value })}
                          value={updateFormData.trainer}
                        />
                        <TextField
                          required
                          id="outlined-read-only-input"
                          label="Capacity"
                          type="number"
                          fullWidth
                          margin="normal"
                          inputProps={{ max: 50 }}
                          variant="outlined"
                          onChange={(e) => setUpdateFormData({ ...updateFormData, capacity: e.target.value })}
                          value={updateFormData.capacity}
                        />
                      </div>
                      <DialogActions style={{ justifyContent: 'center' }}>
                        <Button size="small" startIcon={<SaveIcon />} onClick={handleUpdate} variant="outlined" color="primary">
                          Update
                        </Button>

                        <Button size="small" startIcon={<DeleteIcon />} variant="outlined" color="error" onClick={() => handleDelete(updateFormData._id)}>
                          Remove
                        </Button>
                      </DialogActions>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export default ViewPrograms;
