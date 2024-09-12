import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Img from '../images/2.jpg'


import * as React from 'react';
import TextField from '@mui/material/TextField';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Button from 'react-bootstrap/Button';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Ads() {
  return (
    <Container>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className="dash_component" lg={8} md={9} sm={12}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="center"> صورة الإعلان </TableCell>
                  <TableCell align="center"> النص التعريفي </TableCell>
                  <TableCell align="center"> رقم </TableCell>
                  <TableCell align="center"> حذف الإعلان </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="center">
                      <img className="table_img" src={Img} />
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="center"> 
                      <Button  variant="outline-primary" >حذف</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col className="dash_component" lg={4} md={3} sm={12} >
          <div className=" p_t_30 p_10">
            <label> أضف صورة للإعلان </label><br/>
            <input className="dn" accept="image/*"  type="file" id="inputFile1" />
            <label className="btn-primary btn" for="inputFile1" > رفع صورة <FileUploadRoundedIcon/> </label>
          </div>
          <div className="p_10">
            <label> أضف نص توضيحي فوق الصورة </label>
            <TextField multiline minRows={3} fullWidth id="outlined-basic" label="النص التعريفي" variant="outlined" />
          </div>
        </Col>
      </Row>
    </Container>
    
  );
}
