import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

import './DataTable.css'

import download from 'downloadjs'



const BASE_URL = process.env.REACT_APP_BASE_URL
export default function BasicTable() {
  const tableHeadStyle = { fontWeight: 'bold', fontSize: '17px' }

  let [state, setState] = React.useState([])

  React.useEffect(() => {
    axios.get(`${BASE_URL}`)
      .then((res) => {
        setState(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const onDownload = (filename) => {
    axios.get(`${BASE_URL}/download/${filename}`, { responseType: 'blob' })
      .then(async (res) => {
        download(res.data, filename);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const onDelete = (id, filename) => {
    axios.delete(`${BASE_URL}/delete/${id}/${filename}`)
      .then(async (res) => {
        console.log(res);
        setState([...state.filter((data) => data._id !== id)])
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <TableContainer component={Paper} sx={{ width: 1200 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableHeadStyle}>Sl.No</TableCell>
            <TableCell align="center" sx={tableHeadStyle}>File</TableCell>
            <TableCell align="center" sx={tableHeadStyle}>Size</TableCell>
            <TableCell align="center" sx={tableHeadStyle}>Type</TableCell>
            <TableCell align="center" sx={tableHeadStyle}>Created on</TableCell>
            <TableCell align="center" sx={tableHeadStyle}>Updated on</TableCell>
            <TableCell align="center" sx={tableHeadStyle}>Delete</TableCell>
            <TableCell align="center" sx={tableHeadStyle}>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((row, index) => (
            <TableRow
              key={index + 1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{(row.file.size / 1024).toFixed(2)} MB</TableCell>
              <TableCell align="center">{row.file.mimetype}</TableCell>
              <TableCell align="center">{row.createdAt}</TableCell>
              <TableCell align="center">{row.updatedAt}</TableCell>
              <TableCell align="center">
                <button className='download_but' onClick={() => onDownload(row.file.filename)}>Download</button>
              </TableCell>
              <TableCell align="center">
                <button className='delete_but' onClick={() => onDelete(row._id, row.file.filename)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}