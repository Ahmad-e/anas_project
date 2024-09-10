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

export default function Family() {
  return (
    <Container>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className="dash_component" lg={8} md={9} sm={12}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="start"> Logo </TableCell>
                  <TableCell align="start"> name </TableCell>
                  <TableCell align="start"> number </TableCell>
                  <TableCell align="start"> change data </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="start">
                      <img className="table_img" src={Img} />
                    </StyledTableCell>
                    <StyledTableCell align="start">{row.fat}</StyledTableCell>
                    <StyledTableCell align="start">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="start"> 
                      <Button  variant="outline-primary" >change</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col className="dash_component" lg={4} md={3} sm={12} >
          <div className=" p_t_30 p_10">
            <label> Add Family logo </label>
            <input className="dn" accept="image/*"  type="file" id="inputFile1" />
            <label className="btn-primary btn" for="inputFile1" > Upload image <FileUploadRoundedIcon/> </label>
          </div>
          <div className="p_10">
            <label> Add name of family </label>
            <TextField  fullWidth id="outlined-basic" label="name" variant="outlined" />
          </div>
        </Col>
      </Row>
    </Container>
    
  );
}
