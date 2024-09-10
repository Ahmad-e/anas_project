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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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

export default function Contributions() {

  const [userId, setUserId] = React.useState('');

  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  return (
    <Container>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className="dash_component" lg={8} md={9} sm={12}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="start"> id </TableCell>
                  <TableCell align="start"> user name </TableCell>
                  <TableCell align="start"> type </TableCell>
                  <TableCell align="start"> Total amount </TableCell>
                  <TableCell align="start"> change data </TableCell>
                  <TableCell align="start"> delete </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="start">{row.fat}</StyledTableCell>
                    <StyledTableCell align="start">{row.fat}</StyledTableCell>
                    <StyledTableCell align="start">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="start">100</StyledTableCell>
                    <StyledTableCell align="start"> 
                      <Button  variant="outline-primary" >change</Button>
                    </StyledTableCell>
                    <StyledTableCell align="start"> 
                      <Button  variant="outline-primary" >delete</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col className="dash_component" style={{ alignItems:"start" }} lg={4} md={3} sm={10} xs={12} >
          <div className=" p_t_30 p_10">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userId}
                label="user name"
                onChange={handleChangeUserId}
              >
                <MenuItem value={10}>Ahmad</MenuItem>
                <MenuItem value={20}>Amer</MenuItem>
                <MenuItem value={30}>Anas</MenuItem>
              </Select>
            </FormControl>
              

          </div>
          <div className=" p_10">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Donation  type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userId}
                label="user name"
                onChange={handleChangeUserId}
              >
                <MenuItem value={10}>تبرع لمسجد</MenuItem>
                <MenuItem value={20}>صدقة جارية</MenuItem>
                <MenuItem value={30}>زكاة فطر</MenuItem>
                <MenuItem value={30}>نوع أخر ..</MenuItem>
              </Select>
            </FormControl>
              

          </div>
          <div className="p_10">
            <label> Add total amount </label>
            <TextField type="number"  fullWidth id="outlined-basic" label="total" variant="outlined" />
          </div>
          <div className="p_10"> 
            <label> The date of the operation </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="date of" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </Col>
      </Row>
    </Container>
    
  );
}
