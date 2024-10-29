import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as React from 'react';
import Button from '@mui/material/Button';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import Loading from '../component/loading';

import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';


import PhoneInput from 'react-phone-input-2'

import { useSelector } from 'react-redux';

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


import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

const Profile = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const acc=useSelector((state) => state.account);
  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);

  const [data,setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [families,setFamilies]=React.useState([]);
  const [userSub,setUserSub]=React.useState([]);
  const [userData,setUserData]=React.useState({});

  React.useEffect(() => {
    setLoading(true);
    axios.get(url+"showFamilies",
      {
        headers:{
            'Content-Type': 'application/json',
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setFamilies(response.data.families);
            // console.log(response.data)
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });


           axios.get(url+"showUserSubs",
           {
             headers:{
                 'Content-Type': 'application/json',
                 'Authorization' : 'Bearer ' +token ,
                 'Accept':"application/json"
             }
           })
             .then((response) => {
                 
                 console.log(response.data)
                 setUserSub(response.data.subscriptions)
                 setLoading(false)
             })
             .catch((error) =>{ 
              
               console.log(error);
                setLoading(false) });

           try {
            const response = axios.post(url+'getUserReport', {
              date1: "2000-9-01",
              date2: "2100-9-01"
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
                  setData(response.data)
                  setUserData(response.data.user_data[0])
                  
                  // console.log(response.data);
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
}, []);

  const handleChange=(e)=>{
    var body={
      date1:(e[0].$y +"-"+ (e[0].$M+1) +"-"+(e[0].$D+1)),
      date2:( e[1].$y +"-"+ (e[1].$M+1) +"-"+(e[1].$D+1))
      }
    console.log(body)
    try {
      const response = axios.post(url+'getUserReport', body,
        {
          headers:{
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' +token ,
              'Accept':"application/json"
          }
        }).then((response) => {
          if(response.data.status)
          {     
            setData(response.data)
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

  const [checked, setChecked] = useState(false);
  const handleChangeCheckbox=(e)=>{
    setChecked(e.currentTarget.checked)
    if(e.currentTarget.checked)
    try {
      const response = axios.post(url+'getUserReport', {
        date1: "2000-9-01",
        date2: "2100-9-01"
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
            setData(response.data)
            setUserData(response.data.user_data[0])
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
  const handleClickOpenChange = () => {
    setOpenChange(true);
    setNameToChange(userData.name);
    setEmailToChange(userData.email);
    setFamily_idToChange(userData.family_id)
    setPhone_no(userData.phone_no)
  };
  const handleCloseChange = () => {
    setOpenChange(false);
  };

  const [emailToChange,setEmailToChange]=React.useState('');
  const [nameToChange,setNameToChange]=React.useState('');
  const [passwordToChange,setPasswordToChange]=React.useState('');
  const [family_idToChange,setFamily_idToChange]=React.useState(0);
  const [familiesToChange,setFamiliesToChange]=React.useState([]);
  const [phone_no,setPhone_no]=React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [openChange, setOpenChange] = React.useState(false);
  const [fileToChange,setFileToChange] = React.useState(null);
  const handleChangeFileToChange=(e)=>{
      console.log(e.target.files[0])
      if (e.target.files) {
        setFileToChange(e.target.files[0]);
      }
    }

  const [erremailToChange,setErrEmailToChange]=React.useState(false);
  const [errNameToChange,setErrNameToChange]=React.useState(false);
  const [errFamilyIdToChange,setErrFamilyIdToChange]=React.useState(false);
  const [errServerToChange,setErrServerToChange]=React.useState('');
  const [errPhone_no,setErrPhone_no]=React.useState(false);

  const handleChangeEmailToChange=(event)=>{
      setEmailToChange(event.target.value)
      if( re.test(emailToChange) )
          setErrEmailToChange(false);
      else
          setErrEmailToChange(true)
  }

  const handleChangeNameToChange=(event)=>{
      setNameToChange(event.target.value)
      if(event.target.value.length<2)
          setErrNameToChange(true);
      else
          setErrNameToChange(false)
  }

  const handleChangePhoneNo=(number)=>{
    setPhone_no(number)
    if(number.length<8)
        setErrPhone_no(true);
    else
        setErrPhone_no(false)
}

  const handleChangeFamilyToChange=(event)=>{
      setFamily_idToChange(event.target.value)
      setErrFamilyIdToChange(false)
  }

  const [errServer,setErrServer]=React.useState('');
  const changeAcc =()=>{
    
    if(nameToChange==="")
        setErrNameToChange(true)
    if(emailToChange==="")
        setErrEmailToChange(true)
    if(family_idToChange===0)
        setErrFamilyIdToChange(true)
    if(phone_no.length<8)
      setErrPhone_no(true)

    
    if(!errNameToChange  && !erremailToChange && family_idToChange!==0 && phone_no.length>7 )
        if(nameToChange!=="" && emailToChange!==""){
          
          console.log(nameToChange,emailToChange)
          var form = new FormData();

          if(fileToChange!==null)
              form.append('img_url', fileToChange);
          form.append('family_id', family_idToChange);
          form.append('name', nameToChange);
          form.append('email', emailToChange);
          form.append('phone_no', phone_no);

          setLoading(true)

          try {
              const response = axios.post(url+'editUserAcc',
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
                      setData(response.data.users)
                      console.log(response.data)
                      setOpenChange(false);
                      setUserData(response.data.users[0])

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

  function Row_(props) {
    const row  = props.row;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
            <TableCell align="start" component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="start"> {row.end_date} </TableCell>
            <TableCell align="start">{row.start_date}</TableCell>
            <TableCell align="start">{row.all_amount}</TableCell>
            <TableCell align="start">{row.paid_amount}</TableCell>
            <TableCell align="start">{row.remaining_amount}</TableCell>
            
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography className="main_color" sx={{ textAlign:"start" }} variant="h6" gutterBottom component="div">
                  دفعات الاشتراك
                </Typography >
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="start">التاريخ</TableCell>
                      <TableCell align="start">قيمة الدفعة</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.payments.map((historyRow) => (
                      <TableRow >
                        <TableCell align="start" component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell align="start">{historyRow.amount}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }



  return (
    <Container>
      <Loading loading={loading}/>
      
      <Row className=' justify-content-center'>
      <Col lg={12} xs={11} className="profile_user_box m_t_50">
            <div>
                <h3>
                    {userData.name}  {userData.family}
                </h3>
                <div>
                    {userData.phone_no}+
                </div>
                <div>
                    {userData.email}
                </div>
           </div>
           <div>
           <Button onClick={handleClickOpenChange} style={{ margin:"4px" }} color="inherit"> تعديل بيانات المستخدم </Button>
           </div>

        </Col>
        <Col className="p_t_50 m_t_50" lg={3} md={5} sm={12}>
          <ToggleButton
              className="mb-2"
              id="toggle-check"
              type="checkbox"
              variant={checked ? "primary" : "outline-primary"}
              checked={checked}
              value="1"
              onChange={(e) => handleChangeCheckbox(e)}
            >
            عرض كل البيانات
          </ToggleButton>
        </Col>
        <Col  lg={9} md={7} sm={12} className="p_t_50">
        <p>أدخل المدة الزمنية التي تريد تخريج تقرير ضمنها</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
              <DateRangePicker onChange={handleChange} localeText={{ start: 'تاريخ البداية', end: 'تاريخ النهاية' }} />
            </DemoContainer>
          </LocalizationProvider>
        </Col>

      </Row>
      <Row className='fullWidth m_t_50 justify-content-center'>

        <Col lg={3} md={4} sm={6} xs={8} >
            <div className="Admin_info_component" >
                    <div>
                    <p> المساهمات </p>
                    <h3> {data.total_donations_now} </h3>
                    </div>
                    <div>
                        <MonetizationOnOutlinedIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
                    </div>
            </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8}>
            <div className="Admin_info_component">
                <div>
                <p> الأشتراكات  </p>
                <h3> {data.subscription_count} </h3>
                </div>
                <div>
                    <PlaylistAddIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
                </div>
            </div>


        </Col>
        <Col lg={3} md={4} sm={6} xs={8}>
            <div className="Admin_info_component">
                <div>
                <p>محصلة دفعات الأشتراكات  </p>
                <h3> {data.total_subscriptions} </h3>
                </div>
                <div>
                    <PlaylistAddIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
                </div>
            </div>


        </Col>
        <Col lg={3} md={4} sm={6} xs={8}>
            <div className="Admin_info_component">
                <div>
                    <p> المساهمات المدفوعة من سنة </p>
                    <h3> {data.total_donations_old} </h3>
                </div>
                <div>
                    <MonetizationOnOutlinedIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
                </div>
            </div>

        </Col>

      </Row>
      <Row style={{ zIndex:2 }}  className='m_t_50 p_t_30 fullWidth justify-content-center'>
                    <hr/>    
                </Row>
      <Row hidden={userSub.length===0} className='fullWidth m_t_50 justify-content-center'>
          <Col className=" p_t_30 dash_component" lg={8} md={9} sm={12}>
            <h3 className="main_color"> الأشتراكات </h3><br/>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center"> اسم المشترك </TableCell>
                        <TableCell align="center"> تاريخ البداية </TableCell>
                        <TableCell align="center"> تاريخ النهاية </TableCell>
                        <TableCell align="center"> المبلغ كامل </TableCell>
                        <TableCell align="center"> المدفوع </TableCell>
                        <TableCell align="center"> المتبقي </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {userSub.map((row) => (
                        <Row_ key={row.id} row={row} />
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Col>
      </Row>

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
                        error={errPhone_no}
                        country={'sa'}
                        value={phone_no}
                        onChange={phone => handleChangePhoneNo( phone )}
                    />
                     <div  className={errPhone_no ? 'auth_lable ' : 'auth_lable hidd' }> رقم الهاتف يجب أن يكون موجود  </div>
                    
                    <br/>
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
};
export default Profile;
