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

export default function Event() {
  const acc=useSelector((state) => state.account);
  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);

  const [data,setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [text,setText] = React.useState('');
  const [file,setFile] = React.useState(null);

  const [idToDelete, setIdToDelete] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdToDelete(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeFile=(e)=>{
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }
  const handleChangeText=(event)=>{
    setText(event.target.value);
  }
  const [date, setDate] = React.useState('');
  const handleChangeDate = (date) => {
    setDate(date.$y +"-"+ (date.$M+1) +"-"+date.$D   );
  };


  React.useEffect(() => {
    setLoading(true);
    axios.get(url+"showEvents",
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.events);
            console.log(response.data)
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });
}, []);

  const addAd=()=>{
    
    if(text!=="" && file ){
      console.log(text)
      var form = new FormData();
      form.append('img_url', file);
      form.append('name', text);
      form.append('date', date);
      setLoading(true)

      try {
        const response = axios.post(url+'addEvent',
        form,
        {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization' : 'Bearer ' +token ,
                'Accept':"application/json"
            }
        }
        ).then((response) => {
            console.log(response.data);
            setData(response.data.events);
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        });
      } catch (e) {
          throw e;
      }


    }
  }
  const deleteAd=()=>{
    console.log(idToDelete)
    
    setLoading(true);
    axios.get(url+"deleteEvent/"+idToDelete,
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.events);
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
                {data.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="center">
                      <img className="table_img" src={row.img_url} />
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                    <StyledTableCell align="center"> 
                      <Button onClick={()=>handleClickOpen(row.id)} variant="outline-primary" >حذف</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col className="dash_component" lg={4} md={3} sm={12} >
          <div className=" p_t_30 p_10">
            <label> أضف صورة للمناسبة </label><br/>
            <input onChange={handleChangeFile} className="dn" accept="image/*"  type="file" id="inputFile1" />
            <label className="btn-primary btn" for="inputFile1" > رفع صورة <FileUploadRoundedIcon/> </label>
          </div>
          <div className="p_10">
            <label> أضف نص توضيحي فوق الصورة </label>
            <TextField onChange={handleChangeText} multiline minRows={3} fullWidth id="outlined-basic" label="النص التعريفي" variant="outlined" />
          </div>
          <div className="p_10"> 
            <label> تاريخ المناسبة  </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={handleChangeDate} label="" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <Button onClick={()=>addAd()} className="m_t_30"> حفظ البيانات </Button>
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
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            حذف المناسبة يعني عدم ضهورها للمستخدمين و إزالتها
            هل أنت متأكن من عملية الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ textAlign:"start" }}>
          <Button autoFocus onClick={handleClose}>
            إلغاء
          </Button>
          <Button onClick={()=>deleteAd()} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
    
  );
}
