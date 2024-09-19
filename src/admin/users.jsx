import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Img from '../images/3.png'
import Register_test from '../user/register';

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


import { useSelector } from 'react-redux';

import Loading from '../component/loading';
import axios from "axios";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


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

export default function Users() {

  const Register=()=>{
    return(
      <Register_test/>
    )
  }

  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);
  const [data,setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  const [open, setOpen] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdToDelete(id);
  };
  const handleClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    setLoading(true);
    axios.get(url+"showUsersAndFamilies",
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.users);
            console.log(response.data)
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });
}, []);

  const deleteAcc=()=>{
    setLoading(true);
    axios.get(url+"deleteAcc/"+idToDelete,
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.users);
            console.log(response.data)
            setOpen(false)
            setLoading(false)
        })
        .catch((error) =>{ 
            console.log(error);
            setOpen(false)
            setLoading(false)
         });
  }

  return (
    <Container>
      <Loading loading={loading}/>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className="dash_component" lg={8} md={12} sm={12}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="center"> الصورة الشخصية </TableCell>
                  <TableCell align="center"> الاسم </TableCell>
                  <TableCell align="center"> الأيميل </TableCell>
                  <TableCell align="center"> اسم العائلة </TableCell>
                  <TableCell align="center"> حذف المستخدم </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="center">
                      <img className="table_user_img" src={row.img_url} />
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.family}</StyledTableCell>
                    {/* <StyledTableCell align="center"> 
                      <Button  variant="outline-primary" >تعديل</Button>
                    </StyledTableCell> */}
                    <StyledTableCell align="center"> 
                      <Button onClick={()=>handleClickOpen(row.id)} variant="outline-primary" >حذف</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col className="dash_component" lg={4} md={12} sm={12} >
          <Register/>
        </Col>
      </Row>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
              حذف المستخدم مع بياناته من النظام 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ textAlign:"start" }}>
          <Button autoFocus onClick={handleClose}>
            إلغاء
          </Button>
          <Button onClick={()=>deleteAcc()} autoFocus>
            حذف البيانات
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    
  );
}

