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

export default function Types() {

  const acc=useSelector((state) => state.account);
  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);

  const [data,setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [idToChange, setIdToChange] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdToChange(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setLoading(true);
    axios.get(url+"showDonationsTypes",
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.types);
            console.log(response.data)
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });
}, []);

  const [text, setText] = React.useState('');
  const handleChangeText=(event)=>{
    setText(event.target.value);
  }

  const sendData=()=>{
    if(text!==""){
      console.log(text)

      try {
        const response = axios.post(url+'addDonationType', {
              name:text
          },
          {
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' +token ,
                'Accept':"application/json"
            }
          }).then((response) => {
            if(response.data.status)
            {     
              setData(response.data.types)
                  console.log(response.data);
                  setLoading(false);
            }
            else
            {
              console.log(response.data);
              setLoading(false)
            }

        }).catch((error) => {

            console.log(error)
            setLoading(false)
        });
            
    } catch (e) {
            throw e;
    }

    }
  }

  const [changedText,setChangedText] = React.useState('');
  const handleChangeTextToChange=(event)=>{
    setChangedText(event.target.value);
  }

  const changeData=()=>{

    if(changedText!==""){

      try {
        const response = axios.post(url+'editDonationType', {
              id:idToChange,
              name:changedText
          },
          {
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' +token ,
                'Accept':"application/json"
            }
          }).then((response) => {
            if(response.data.status)
            { 
              setOpen(false)    
              setData(response.data.families)
                  console.log(response.data);
                  setLoading(false);
            }
            else
            {
              console.log(response.data);
              setLoading(false)
            }

        }).catch((error) => {

            console.log(error)
            setLoading(false)
        });
            
    } catch (e) {
            throw e;
    }

    }

  }

  return (
    <Container>
      <Loading loading={loading}/>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className="dash_component" lg={8} md={9} sm={12}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="center"> اسم الحالة </TableCell>
                  <TableCell align="center"> الرقم </TableCell>
                  <TableCell align="center"> تعديل البيانات </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center"> 
                      <Button onClick={()=>handleClickOpen(row.id)}  variant="outline-primary" >تعديل</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col className="dash_component" lg={4} md={3} sm={12} >
          <div className="p_10">
            <label>  أدخل اسم لحالة التبرع </label>
            <TextField onChange={handleChangeText}  fullWidth id="outlined-basic" label="حالة التبرع" variant="outlined" />
          </div>
          <div>
            <Button onClick={()=>sendData()} className="m_t_30"> حفظ البيانات </Button>
          </div>
        </Col>
      </Row>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        ادخل اسم جديد لحالة التبرع 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              
                <div className="a_c p_10">
                  <label>   سيتم تعديل حالات التبرع السابقة بنفس الاسم </label>
                  <TextField onChange={handleChangeTextToChange}  fullWidth id="outlined-basic" label="حالة التبرع" variant="outlined" />
                </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ textAlign:"start" }}>
          <Button autoFocus onClick={handleClose}>
            إلغاء
          </Button>
          <Button onClick={()=>changeData()} autoFocus>
            تعديل البيانات
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    
  );
}
