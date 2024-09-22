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
import { Padding } from "@mui/icons-material";

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


  const acc=useSelector((state) => state.account);
  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);

  const [data,setData] = React.useState([]);
  const [users,setUsers] = React.useState([]);
  const [types,setTypes] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios.get(url+"showDonations",
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.donations);
            setUsers(response.data.users);
            setTypes(response.data.types);
            console.log(response.data)
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });
}, []);
  const [idToDelete, setIdToDelete] = React.useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpenDeleteDialog = (id) => {
    setOpenDeleteDialog(true);
    setIdToDelete(id);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const [idToChange, setIdToChange] = React.useState(0);
  const [dateToChange, setDateToChange] = React.useState(null);
  const handleChangeDateToChange = (date) => {
    setDateToChange(date.$y +"-"+ (date.$M+1) +"-"+date.$D   );
  };
  const [typeidToChange, setTypeIdToChange] = React.useState(null);
  const handleChangeTypeIdToChange = (event) => {
    setTypeIdToChange(event.target.value);
  };
  const [useridToChange, setUserIdToChange] = React.useState(null);
  const handleChangeUserIdToChange = (event) => {
    setUserIdToChange(event.target.value);
  };
  const [monyToChange, setMonyToChange] = React.useState(null);
  const handleChangeMonyToChange = (event) => {
    setMonyToChange(event.target.value);
  };
  const [openCangeDialog, setOpenCangeDialog] = React.useState(false);
  const handleClickOpenChangeDialog = (don) => {
    setOpenCangeDialog(true);
    setIdToChange(don.id);
    setDateToChange(don.date);
    setMonyToChange(don.amount);
    setUserIdToChange(don.user_id);
    setTypeIdToChange(don.donation_type_id);
  };
  const handleCloseChangeDialog = () => {
    setOpenCangeDialog(false);
  };

  const [userId, setUserId] = React.useState(0);
  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const [typeId, setTypeId] = React.useState(0);
  const handleChangeTypeId = (event) => {
    setTypeId(event.target.value);
  };
  const [mony, setMony] = React.useState(0);
  const handleChangeMony = (event) => {
    setMony(event.target.value);
  };
  const [date, setDate] = React.useState('');
  const handleChangeDate = (date) => {
    setDate(date.$y +"-"+ (date.$M+1) +"-"+date.$D   );
  };


  const addData=()=>{
    
    if(date!=='' && userId!==0 && typeId!==0 & mony!==0)
    {
      setLoading(true)
      try {
        const response = axios.post(url+'addDonation', {
          user_id:userId,
          donation_type_id: typeId,
          amount: mony,
          date: date,
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
              setData(response.data.donations)
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


  
  const deleteData=()=>{
    console.log(idToDelete)
    setLoading(true);
    axios.get(url+"deleteDonation/"+idToDelete,
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.donations);
            console.log(response.data)
            setOpenDeleteDialog(false)
            setLoading(false)
        })
        .catch((error) =>{ 
            console.log(error);
            setOpenDeleteDialog(false)
            setLoading(false)
         });
  }
  
  const changeData=()=>{
    setLoading(true)
      try {
        const response = axios.post(url+'editDonation', {
          id:idToChange,
          user_id:useridToChange,
          donation_type_id: typeidToChange,
          amount: monyToChange,
          date: dateToChange,
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
              setData(response.data.donations)
              console.log(response.data);
              setLoading(false);
              setOpenCangeDialog(false)
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
  

  const [filterUsUser,setFilterUsUser] = React.useState(0);
  const [filterUsType,setFilterUsType] = React.useState(0);

  return (
    <Container>
      <Loading loading={loading}/>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className=" p_t_30 dash_component" lg={8} md={9} sm={12}>

          <div className="filter">
              <FormControl style={{ padding : "10px" }}  fullWidth>
                <InputLabel id="demo-simple-select-label"> عرض المساهمين باسم </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterUsUser}
                  label=" عرض المساهمين باسم "
                  onChange={(e)=>setFilterUsUser(e.target.value)}
                >
                  <MenuItem value={0}> جميع المساهمين </MenuItem>
                  {
                    users.map((item)=>{
                      return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
              <FormControl style={{ padding : "10px" }} fullWidth>
                <InputLabel id="demo-simple-select-label"> عرض أنواع المساهمات حسب </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterUsType}
                  label=" عرض أنواع المساهمات حسب "
                  onChange={(e)=>setFilterUsType(e.target.value)}
                >
                  <MenuItem value={0}> جميع المساهمات </MenuItem>
                  {
                    types.map((item)=>{
                      return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
          </div>

          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="center"> التاريخ </TableCell>
                  <TableCell align="center"> اسم المستخدم </TableCell>
                  <TableCell align="center"> نوعية المساهمة </TableCell>
                  <TableCell align="center"> المبلغ </TableCell>
                  <TableCell align="center"> تعديل البيانات </TableCell>
                  <TableCell align="center"> حذف المساهمة </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => {
                  
                  if(row.user_id===filterUsUser || filterUsUser===0 )
                    if(row.donation_type_id===filterUsType|| filterUsType===0 )
                      return(
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="center">{row.date}</StyledTableCell>
                          <StyledTableCell align="center">{row.user_name}</StyledTableCell>
                          <StyledTableCell align="center">{row.type}</StyledTableCell>
                          <StyledTableCell align="center">{row.amount}</StyledTableCell>
                          <StyledTableCell align="center"> 
                            <Button onClick={()=>handleClickOpenChangeDialog(row)} variant="outline-primary" >تعديل</Button>
                          </StyledTableCell>
                          <StyledTableCell align="center"> 
                            <Button onClick={()=>handleClickOpenDeleteDialog(row.id)} variant="outline-primary" >حذف</Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col className="dash_component p_t_30" style={{ alignItems:"start" }} lg={4} md={3} sm={10} xs={12} >
          <div className=" p_t_30 p_10">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">اسم المساهم</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userId}
                label="user name"
                onChange={handleChangeUserId}
              >
                {
                  users.map((item)=>{
                    return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                  })
                }
              </Select>
            </FormControl>
              

          </div>
          <div className=" p_10">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">نوعية المساهمة</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeId}
                label="نوعية المساهمة"
                onChange={handleChangeTypeId}
              >
                {
                  types.map((item)=>{
                    return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                  })
                }
              </Select>
            </FormControl>
              

          </div>
          <div className="p_10">
            <TextField onChange={handleChangeMony} type="number"  fullWidth id="outlined-basic" label="المبلغ" variant="outlined" />
          </div>
          <div className="p_10"> 
            <label> تاريخ أداء المساهمة </label>
            <label>التاريخ مهم لحساب الزكاة</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={handleChangeDate} label="" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <Button onClick={()=>addData()} className="m_t_30"> حفظ البيانات </Button>
          </div>
        </Col>
      </Row>

      <Dialog
        fullScreen={fullScreen}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
                حذف المساهمة لعدم احتسابها وإزالتها من النظام
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ textAlign:"start" }}>
          <Button autoFocus onClick={handleCloseDeleteDialog}>
            إلغاء
          </Button>
          <Button onClick={()=>deleteData()} autoFocus>
            حذف المساهمة
          </Button>
        </DialogActions>
      </Dialog>
      {/* change dialog */}

      <Dialog
        fullScreen={fullScreen}
        open={openCangeDialog}
        onClose={handleCloseChangeDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        ادخل البيانات الجديدة و أحفظ التعديلات 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            
            <div className="a_c p_t_30 p_10">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">اسم المساهم</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={useridToChange}
                  label="user name"
                  onChange={handleChangeUserIdToChange}
                >
                  {
                    users.map((item)=>{
                      return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
                

            </div>
            <div className="a_c p_10">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">نوعية المساهمة</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={typeidToChange}
                  label="نوعية المساهمة"
                  onChange={handleChangeTypeIdToChange}
                >
                  {
                    types.map((item)=>{
                      return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
                

            </div>
            <div className="a_c p_10">
              <TextField defaultValue={monyToChange} onChange={handleChangeMonyToChange} type="number"  fullWidth id="outlined-basic" label="المبلغ" variant="outlined" />
            </div>
            <div className="a_c p_10"> 
              <label> تاريخ أداء المساهمة </label>
              <label>التاريخ مهم لحساب الزكاة</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker  onChange={handleChangeDateToChange} label="" />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ textAlign:"start" }}>
          <Button autoFocus onClick={handleCloseChangeDialog}>
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
