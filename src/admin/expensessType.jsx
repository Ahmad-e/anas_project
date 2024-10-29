import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



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


  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState(0);

  const handleClickOpenDeleteDialog = (id) => {
    setOpenDeleteDialog(true);
    setIdToDelete(id);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };



  React.useEffect(() => {
    setLoading(true);
    axios.get(url+"showExpenseTypes",
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.types);
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
      setLoading(true)
      try {
        const response = axios.post(url+'addExpenseType', {
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
      setLoading(true)
      try {
        const response = axios.post(url+'editExpenseType', {
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

  const  deleteData=()=>{
      console.log(idToDelete);

      axios.get(url+"deleteExpenseType/"+idToDelete,
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
            setOpenDeleteDialog(false)
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });


  }

  return (
    <Container>
      <Loading loading={loading}/>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className="dash_component" lg={4} md={3} sm={12} >
          <div className="dash_add_style">
            <div className="p_10">
              <label>  أدخل اسم لنوع المصاريف  </label>
              <TextField onChange={handleChangeText}  fullWidth id="outlined-basic" label=" نوع المصاريف" variant="outlined" />
            </div>
            <div>
              <Button onClick={()=>sendData()} className="m_t_30"> حفظ البيانات </Button>
            </div>
          </div>
        </Col>
        <Col className="dash_component" lg={8} md={9} sm={12}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="center"> الرقم </TableCell>
                  <TableCell align="center"> اسم النوع </TableCell>
                  
                  <TableCell align="center"> تعديل البيانات </TableCell>
                  <TableCell align="center"> حذف البيانات </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    
                    <StyledTableCell align="center"> 
                      <Button onClick={()=>handleClickOpen(row.id)}  variant="outline-primary" >تعديل</Button>
                    </StyledTableCell>
                    <StyledTableCell align="center"> 
                      <Button onClick={()=>handleClickOpenDeleteDialog(row.id)}  variant="outline-primary" >حذف</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
      </Row>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        ادخل اسم جديد  لنوع المصاريف 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              
                <div className="a_c p_10">
                  <label>   سيتم تعديل المصاريف  السابقة بنفس الاسم </label>
                  <TextField onChange={handleChangeTextToChange}  fullWidth id="outlined-basic" label=" نوع المصاريف " variant="outlined" />
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

      {/* change dialog */}

      <Dialog
        fullScreen={fullScreen}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
            حذف نوع المصاريف يعني أن المصاريف بنفس هذا النوع سوف تحذف
        </DialogTitle>
        <DialogContent>
            
        </DialogContent>
        <DialogActions style={{ textAlign:"start" }}>
          <Button autoFocus onClick={handleCloseDeleteDialog}>
            إلغاء
          </Button>
          <Button onClick={()=>deleteData()} autoFocus>
            حذف البيانات
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
    
  );
}
