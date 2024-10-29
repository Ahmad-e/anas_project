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


import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import PhoneInput from 'react-phone-input-2'
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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

export default function Users() {

    
  const url = useSelector(state=>state.url);
  const [loading, setLoading] = React.useState(false);

  const [email,setEmail]=React.useState('');
  const [name,setName]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [family_id,setFamily_id]=React.useState(0);
  const [families,setFamilies]=React.useState([]);
  const [phone_no,setPhone_no]=React.useState('');

  const [file,setFile] = React.useState(null);
  const handleChangeFile=(e)=>{
      console.log(e.target.files[0])
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    }

  const [erremail,setErrEmail]=React.useState(false);
  const [errName,setErrName]=React.useState(false);
  const [errPassword,setErrPassword]=React.useState(false);
  const [errPhone_no,setErrPhone_no]=React.useState(false);
  const [errFamilyId,setErrFamilyId]=React.useState(false);
  const [errServer,setErrServer]=React.useState('');


  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChangeEmail=(event)=>{
      setEmail(event.target.value)
      if( re.test(email) )
          setErrEmail(false);
      else
          setErrEmail(true)
  }

  const handleChangepassword=(event)=>{
      setPassword(event.target.value)
      if(event.target.value.length<10)
          setErrPassword(true);
      else
          setErrPassword(false)
  }

  const handleChangeName=(event)=>{
      setName(event.target.value)
      if(event.target.value.length<2)
          setErrName(true);
      else
          setErrName(false)
  }

  const handleChangePhoneNo=(number)=>{
    setPhone_no(number)
    if(number.length<8)
        setErrPhone_no(true);
    else
        setErrPhone_no(false)
}

  const handleChangeFamily=(event)=>{
      setFamily_id(event.target.value)
      setErrFamilyId(false)
  }




  const token = useSelector(state=>state.token);
  const [users,setUsers] = React.useState([]);


  const [open, setOpen] = React.useState(false);
  const [openChange, setOpenChange] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState(0);
  const [idToChange, setIdToChange] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdToDelete(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenChange = (user) => {
    setOpenChange(true);
    setIdToChange(user.id);
    setEmailToChange(user.email);
    setNameToChange(user.name);
    setFamily_idToChange(user.family_id)
    setPhone_noToChange(user.phone_no)
    setType_idToChange(user.type_id)
  };
  const handleCloseChange = () => {
    setOpenChange(false);
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
            setUsers(response.data.users);
            setFamilies(response.data.families);
            console.log(response.data)
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });
}, []);



const send_data=()=>{
  if(password==="")
      setErrPassword(true)
  if(name==="")
      setErrName(true)
  if(email==="")
      setErrEmail(true)
  if(family_id===0)
      setErrFamilyId(true)
  if(phone_no.length<8)
    setErrPhone_no(true)

  
  if(!errName && !errPassword && !erremail && family_id!==0 && phone_no.length>7 )
      if(password!=="" && name!=="" && email!==""){
          var form = new FormData();
          if(file!==null)
              form.append('img_url', file);
          form.append('family_id', family_id);
          form.append('name', name);
          form.append('password', password);
          form.append('phone_no', phone_no);
          form.append('email', email);
          form.append('type_id', 2);

          setLoading(true)

          try {
              const response = axios.post(url+'register',
              form,
              {
                  headers:{
                      'Content-Type': 'multipart/form-data',
                      'Accept':"application/json"
                  }
              }
              ).then((response) => {
                  if(response.data.status===true)
                  {
                      setErrServer('')
                      window.location.reload();
                  }
                  if(response.data.status===false){
                      setErrServer(response.data.message)
                  }

                  setLoading(false)
              }).catch((error) => {
                  console.log("No",error)
                  setErrServer("حصلت مشكلة في السيرفر حاول مجدداً")
                  setLoading(false)
              });
          } catch (e) {
              throw e;
          }
      }
}

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
            setUsers(response.data.users);
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



  const [emailToChange,setEmailToChange]=React.useState('');
  const [nameToChange,setNameToChange]=React.useState('');
  const [passwordToChange,setPasswordToChange]=React.useState('');
  const [phone_noToChange,setPhone_noToChange]=React.useState('');
  const [family_idToChange,setFamily_idToChange]=React.useState(0);
  const [type_idToChange,setType_idToChange]=React.useState(0);
  


  const [fileToChange,setFileToChange] = React.useState(null);
  const handleChangeFileToChange=(e)=>{
      console.log(e.target.files[0])
      if (e.target.files) {
        setFileToChange(e.target.files[0]);
      }
    }

  const [erremailToChange,setErrEmailToChange]=React.useState(false);
  const [errNameToChange,setErrNameToChange]=React.useState(false);
  const [errPasswordToChange,setErrPasswordToChange]=React.useState(false);
  const [errPhone_noToChange,setErrPhone_noToChange]=React.useState('');
  const [errFamilyIdToChange,setErrFamilyIdToChange]=React.useState(false);
  const [errServerToChange,setErrServerToChange]=React.useState('');

  const handleChangeEmailToChange=(event)=>{
      setEmailToChange(event.target.value)
      if( re.test(emailToChange) )
          setErrEmailToChange(false);
      else
          setErrEmailToChange(true)
  }

  const handleChangePhone_noToChange=(event)=>{
    setPhone_noToChange(event)
    if(event.length<8)
        setErrPhone_noToChange(true);
    else
      setErrPhone_noToChange(false)
}

  const handleChangeNameToChange=(event)=>{
      setNameToChange(event.target.value)
      if(event.target.value.length<2)
          setErrNameToChange(true);
      else
          setErrNameToChange(false)
  }

  const handleChangeFamilyToChange=(event)=>{
      setFamily_idToChange(event.target.value)
      setErrFamilyIdToChange(false)
  }
  const handleChangeType_idToChange=(event)=>{
    setType_idToChange(event.target.value)
}

  const changeAcc=()=>{
    if(passwordToChange==="")
        setErrPasswordToChange(true)
    if(nameToChange==="")
        setErrNameToChange(true)
    if(emailToChange==="")
        setErrEmailToChange(true)
    if(family_idToChange===0)
        setErrFamilyIdToChange(true)
    if(phone_noToChange.length<8)
      setErrPhone_noToChange(true)
  
    
    if(!errNameToChange  && !erremailToChange && family_idToChange!==0 && phone_noToChange.length>7 )
        if(nameToChange!=="" && emailToChange!==""){

          console.log(nameToChange,emailToChange)
          var form = new FormData();
          
          form.append('id', idToChange);
          if(fileToChange!==null)
              form.append('img_url', fileToChange);
          form.append('family_id', family_idToChange);
          form.append('name', nameToChange);
          form.append('email', emailToChange);
          form.append('type_id', type_idToChange);
          form.append('phone_no', phone_noToChange);

          setLoading(true)

          try {
              const response = axios.post(url+'editAcc',
              form,
              {
                  headers:{
                      'Content-Type': 'multipart/form-data',
                      
                      'Authorization' : 'Bearer ' +token ,
                      'Accept':"application/json"
                  }
              }
              ).then((response) => {
                console.log(response.data)
                  if(response.data.status===true)
                  {
                      setErrServer('')
                      setUsers(response.data.users)
                      console.log(response.data)
                      setOpenChange(false);
                  }
                  if(response.data.status===false){
                      setErrServer(response.data.message)
                  }

                  setLoading(false)
              }).catch((error) => {
                  console.log("No",error)
                  setErrServer("حصلت مشكلة في السيرفر حاول مجدداً")
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
      <Col className="dash_component" lg={4} md={12} sm={12} >
        <div className="auth_box m_t_50" >
                <h4>إنشاء حساب جديد</h4>
                
                    <TextField
                        type='email'
                        label="الأيميل"
                        variant="standard"
                        fullWidth
                        value={email}
                        onChange={handleChangeEmail}
                        error={erremail}
                        />
                    <div  className={erremail ? 'auth_lable ' : 'auth_lable hidd' }>الأيميل يجب أن يكون صحيحاً </div>
                
                    <TextField
                        type='text'
                        id="standard-required"
                        label="الاسم"
                        variant="standard"
                        
                        fullWidth
                        value={name}
                        onChange={handleChangeName}
                        error={errName}
                        />
                    <div  className={errName ? 'auth_lable ' : 'auth_lable hidd' }> الاسم يجب أن يكون 3 حروف على الأقل  </div>

                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password"> الرقم الوطني </InputLabel>
                        <Input
                            
                            id="standard-adornment-password"
                            type='number'
                            value={password}
                            onChange={handleChangepassword}
                            error={errPassword}
                            
                        />
                        <div  className={errPassword ? 'auth_lable ' : 'auth_lable hidd' }>   الرقم الوطني يجب أن يكون أرقام من 10 خانات   </div><br/>
                    </FormControl>

                    <PhoneInput
                        error={errPhone_no}
                        country={'sa'}
                        value={phone_no}
                        onChange={phone => handleChangePhoneNo( phone )}
                    />
                    <div  className={errPhone_no ? 'auth_lable ' : 'auth_lable hidd' }> رقم الهاتف يجب أن يكون موجود  </div><br/>
                    <br/>


                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">اسم العائلة</InputLabel>
                        <Select
                            error={errFamilyId}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={family_id}
                            label=" اسم العائلة"
                            onChange={handleChangeFamily}
                        >
                            {
                            families.map((item)=>{
                                return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                            })
                            }
                        </Select>
                        <div  className={errFamilyId ? 'auth_lable ' : 'auth_lable hidd' }> يجب ادخال اسم العائلة </div>
                        </FormControl>
                    <br/>
                    <br/>
                    
                    <Alert  variant="outlined" hidden={errServer===""} severity="error">{errServer}</Alert>
                    <br/>
                    <Button onClick={()=>send_data()} className='auth_button' variant="primary">تسجيل حساب</Button>

                </div>
        </Col>
        <Col className="m_t_50 dash_component" lg={8} md={12} sm={12}>
          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="center"> نوع الحساب </TableCell>
                  <TableCell align="center"> الاسم </TableCell>
                  <TableCell align="center"> الأيميل </TableCell>
                  <TableCell align="center"> قم الهاتف </TableCell>
                  <TableCell align="center"> اسم العائلة </TableCell>
                  <TableCell align="center"> تعديل المستخدم </TableCell>
                  <TableCell align="center"> حذف المستخدم </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row,index) => {
                
                 return(
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">{ row.type==="admin" ? ("أدمن") : ("مشترك") }</StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.phone_no}</StyledTableCell>
                    <StyledTableCell align="center">{row.family}</StyledTableCell>
                    <StyledTableCell  align="center"> 
                      <Button hidden={index===0} onClick={()=>handleClickOpenChange(row)} variant="outline-primary" >تعديل</Button>
                    </StyledTableCell>
                    <StyledTableCell  align="center"> 
                      <Button hidden={index===0} onClick={()=>handleClickOpen(row.id)} variant="outline-primary" >حذف</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>

      </Row>

      <Row className='fullWidth m_t_50 justify-content-center'>
          <div>
              <Button href={url+"export_users"} className="m_t_30">  تحميل ملف البيانات  <FileDownloadIcon/></Button>
          </div>
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
      {/* change dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={openChange}
        onClose={handleCloseChange}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
                تعديل بيانات المستخدم
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className="auth_box m_t_50" >
                <h4>إنشاء حساب جديد</h4>
                    <TextField
                        type='email'
                        label="الأيميل"
                        variant="standard"
                        fullWidth
                        value={emailToChange}
                        onChange={handleChangeEmailToChange}
                        error={erremailToChange}
                        />
                    <div  className={erremailToChange ? 'auth_lable ' : 'auth_lable hidd' }>الأيميل يجب أن يكون صحيحاً </div>
                
                    <TextField
                        type='text'
                        id="standard-required"
                        label="الاسم"
                        variant="standard"
                        
                        fullWidth
                        value={nameToChange}
                        onChange={handleChangeNameToChange}
                        error={errNameToChange}
                        />
                    <div  className={errNameToChange ? 'auth_lable ' : 'auth_lable hidd' }> الاسم يجب أن يكون 3 حروف على الأقل  </div>

                    <br/> 
                    <PhoneInput
                        error={errPhone_noToChange}
                        country={'sa'}
                        value={phone_noToChange}
                        onChange={phone => handleChangePhone_noToChange( phone )}
                    />
                    <div  className={errPhone_noToChange ? 'auth_lable ' : 'auth_lable hidd' }> رقم الهاتف يجب أن يكون موجود  </div><br/>
                    
                    
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">اسم العائلة</InputLabel>
                        <Select
                            error={errFamilyIdToChange}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={family_idToChange}
                            label=" اسم العائلة"
                            onChange={handleChangeFamilyToChange}
                        >
                            {
                            families.map((item)=>{
                                return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                            })
                            }
                        </Select>
                        <div  className={errFamilyIdToChange ? 'auth_lable ' : 'auth_lable hidd' }> يجب ادخال اسم العائلة </div>
                    </FormControl><br/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">نوع  الحساب</InputLabel>
                        <Select
                        
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type_idToChange}
                            label=" نوع الحساب "
                            onChange={handleChangeType_idToChange}
                        >
                            <MenuItem value={1}> أدمن </MenuItem>
                            <MenuItem value={2}> مشترك </MenuItem>
                        </Select>
                        <div  className={errFamilyIdToChange ? 'auth_lable ' : 'auth_lable hidd' }> يجب ادخال اسم العائلة </div>
                    </FormControl>
                    <br/>
                    
                    <Alert  variant="outlined" hidden={errServerToChange===""} severity="error">{errServerToChange}</Alert>
                    
                </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ textAlign:"start" }}>
          <Button autoFocus onClick={handleCloseChange}>
            إلغاء
          </Button>
          <Button onClick={()=>changeAcc()} autoFocus>
            حفظ البيانات
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    
  );
}

