
import Col from "react-bootstrap/Col";

import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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

import Alert from '@mui/material/Alert';

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

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




export default function Contributions( props ) {
  var data = props.data
  const acc=useSelector((state) => state.account);
  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);

  const [loading, setLoading] = React.useState(false);
  const [errServer, seterrServer] = React.useState('');


  
  const [userId, setUserId] = React.useState(0);
  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };
 

  const [mony, setMony] = React.useState(0);
  const handleChangeMony = (event) => {
    setMony(event.target.value);
  };
  const [date, setDate] = React.useState('');
  const handleChangeDate = (date) => {
    setDate(date.$y +"-"+ (date.$M+1) +"-"+date.$D   );
  };

  const [endDate, setEndDate] = React.useState('');
  const handleChangeEndDate = (date) => {
    setEndDate(date.$y +"-"+ (date.$M+1) +"-"+date.$D   );
  };



  const [monyOfPayment, setMonyOfPayment] = React.useState(0);
  const handleChangeMonyOfPayment = (event) => {
    setMonyOfPayment(event.target.value);
  };
  const [dateOfPayment, setDateOfPayment] = React.useState('');
  const handleChangeDateOfPayment = (date) => {
    setDateOfPayment(date.$y +"-"+ (date.$M+1) +"-"+date.$D   );
  };

  /* dialogs */
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const [idToDeleteSub, setIdToDeleteSub] = React.useState(0);
  const [openDeleteSubDialog, setOpenDeleteSubDialog] = React.useState(false);
  const handleClickOpenDeleteSubDialog = (id) => {
    setOpenDeleteSubDialog(true);
    setIdToDeleteSub(id);
  };
  const handleCloseDeleteSubDialog = () => {
    setOpenDeleteSubDialog(false);
  };




  const [idToChangeSub, setIdToChangeSub] = React.useState(0);
  const [openChangeSubDialog, setOpenChangeSubDialog] = React.useState(false);
  const handleClickOpenChangeSubDialog = (row) => {
    setOpenChangeSubDialog(true);
    setIdToChangeSub(row.id);
    setMony(row.all_amount)
    setDate(row.start_date)
    setEndDate(row.end_date)
  };
  const handleCloseChangeSubDialog = () => {
    setOpenChangeSubDialog(false);
  };



  const [idToDeletePayment, setIdToDeletePayment] = React.useState(0);
  const [openDeletePaymentDialog, setOpenDeletePaymentDialog] = React.useState(false);
  const handleClickOpenDeletePaymentDialog = (id) => {
    setOpenDeletePaymentDialog(true);
    setIdToDeletePayment(id);
  };
  const handleCloseDeletePaymentDialog = () => {
    setOpenDeletePaymentDialog(false);
  };





  const [idToAddPayment, setIdToAddPayment] = React.useState(0);
  const [openAddPaymentDialog, setOpenAddPaymentDialog] = React.useState(false);
  const handleClickOpenAddPaymentDialog = (id) => {
    setOpenAddPaymentDialog(true);
    setIdToAddPayment(id)
    
  };
  const handleCloseAddPaymentDialog = () => {
    setOpenAddPaymentDialog(false);
  };

  /* end dialogs */


  const delete_sub=()=>{
    setLoading(true);
    axios.get(url+"deleteSubscription/"+idToDeleteSub,
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
          data = (response.data.subscriptions);
          setLoading(false);
          window.location.reload();
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });


  }
  const change_sub=()=>{
    if(date!=='' && endDate!=='' && mony>=0)
      {
          console.log(userId, mony,date,endDate)
  
        setLoading(true)
        try {
          const response = axios.post(url+'editSubscription', {
            id:idToChangeSub,
            all_amount: mony,
            start_date: date,
            end_date: endDate,
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
                console.log(response.data);
                window.location.reload();
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
  
  const delete_sub_payment=()=>{
    console.log(idToDeletePayment)
    setLoading(true);
    axios.get(url+"deletePayment/"+idToDeletePayment,
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
          data = (response.data.subscriptions);
          console.log(response.data)
          setLoading(false);
          window.location.reload();
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });
    
  }

  
  const add_sub_payment=()=>{
    if( monyOfPayment>0 && dateOfPayment!=="" )
    {
      console.log( monyOfPayment , dateOfPayment , idToAddPayment )
      setLoading(true)
        
          const response = axios.post(url+'addPayment', {
            subscription_id:idToAddPayment,
            amount: monyOfPayment,
            date: dateOfPayment
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
                console.log(response.data);
                window.location.reload();
                setLoading(false);
                seterrServer("")
              }
              else
              {
                console.log(response.data);
                seterrServer("الدفعة المالية المضافة أكبر من باقي أموال الأشتراك")
                setLoading(false)
              }
  
          }).catch((error) => {
  
              console.log(error)
              setLoading(false)
          });
    }
  }


//   const [filterUsUser,setFilterUsUser] = React.useState(0);
//   const [filterUsType,setFilterUsType] = React.useState(0);
function Row(props) {
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
          <TableCell align="start">
              <Button  onClick={()=>handleClickOpenChangeSubDialog(row)} variant="outline-primary" >تعديل</Button>
          </TableCell>
          <TableCell align="start">
              <Button onClick={()=>handleClickOpenDeleteSubDialog(row.id)}  variant="outline-primary" >حذف</Button>
          </TableCell>
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
                    <TableCell align="start" >حذف </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.payments.map((historyRow) => (
                    <TableRow >
                      <TableCell align="start" component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="start">{historyRow.amount}</TableCell>
                      <TableCell align="start">
                      <Button onClick={()=>handleClickOpenDeletePaymentDialog(historyRow.id)} style={{ padding: "2px 10px" }} variant="outline-primary" >حذف</Button>
                      </TableCell>
                    </TableRow>
                  ))}

                    <TableRow key={100}>
                      <TableCell align="start" component="th" scope="row">
                        
                      </TableCell>
                      <TableCell align="start">  </TableCell>
                      <TableCell align="start">
                      <Button hidden={ row.remaining_amount<=0 } onClick={()=>handleClickOpenAddPaymentDialog(row.id)} style={{ padding: "2px 10px" }} variant="outline-primary" >دفعة جديدة</Button>
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


console.log(data)
  return (
    <>
        <Loading loading={loading}/>
        <Col className=" p_t_30 dash_component" lg={8} md={9} sm={12}>
        
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
                        <TableCell align="center"> تعديل الاشتراك </TableCell>
                        <TableCell align="center"> حذف الاشتراك </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Col>


        {/* delete  subscrip dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={openDeleteSubDialog}
          onClose={handleCloseDeleteSubDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
              حذف الأشتراك يعني حذف بيانات و دفعات الأشتراك كاملة
              
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
                
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ textAlign:"start" }}>
            <Button autoFocus onClick={handleCloseDeleteSubDialog}>
              إلغاء
            </Button>
            <Button onClick={()=>delete_sub()} autoFocus>
              حذف الأشتراك
            </Button>
          </DialogActions>
        </Dialog>


        {/* change  subscrip dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={openChangeSubDialog}
          onClose={handleCloseChangeSubDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
             تعديل بيانات الأشتراك
          </DialogTitle>
          <DialogContent>
              <DialogContentText>
                  <div className=" p_t_30 p_10">
                      <h4> اشتراك جديد </h4>
                  </div>
                  <div className="p_10">
                      <TextField value={mony} onChange={handleChangeMony} type="number"  fullWidth id="outlined-basic" label="المبلغ" variant="outlined" />
                  </div>

                  <div className="p_10"> 
                      <label> تاريخ بداية الاشتراك </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer  components={['DatePicker']}>
                          <DatePicker  onChange={handleChangeDate} label="" />
                      </DemoContainer>
                      </LocalizationProvider>
                  </div>

                  <div className="p_10"> 
                      <label> تاريخ نهاية الاشتراك </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                          <DatePicker  onChange={handleChangeEndDate} label="" />
                      </DemoContainer>
                      </LocalizationProvider>
                  </div>
              </DialogContentText>
          </DialogContent>
          <DialogActions style={{ textAlign:"start" }}>
            <Button autoFocus onClick={handleCloseChangeSubDialog}>
              إلغاء
            </Button>
            <Button onClick={()=>change_sub()}  autoFocus>
              حفظ البيانات
            </Button>
          </DialogActions>
        </Dialog>



        {/* delete  payment dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={openDeletePaymentDialog}
          onClose={handleCloseDeletePaymentDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
             حذف  بيانات دفعة الأشتراك
          </DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ textAlign:"start" }}>
            <Button autoFocus onClick={handleCloseDeletePaymentDialog}>
              إلغاء
            </Button>
            <Button onClick={()=>delete_sub_payment()} autoFocus>
              حذف الدفعة 
            </Button>
          </DialogActions>
        </Dialog>


        {/* add  payment dialog */}
        <Dialog
          fullScreen={fullScreen}
          open={openAddPaymentDialog}
          onClose={handleCloseAddPaymentDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
          
          إضافة دفعة للإشتراك
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            <Alert  variant="outlined" hidden={errServer===""} severity="error">{errServer}</Alert>
                <div className=" p_t_30 p_10">
                      <h4> دفعة جديدة </h4>
                  </div>
                  <div className="p_10">
                      <TextField  onChange={handleChangeMonyOfPayment} type="number"  fullWidth id="outlined-basic" label="المبلغ" variant="outlined" />
                  </div>

                  <div className="p_10"> 
                      <label> تاريخ الدفعة </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer  components={['DatePicker']}>
                          <DatePicker  onChange={handleChangeDateOfPayment} label="" />
                      </DemoContainer>
                      </LocalizationProvider>
                  </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ textAlign:"start" }}>
            <Button autoFocus onClick={handleCloseAddPaymentDialog}>
              إلغاء
            </Button>
            <Button onClick={()=>add_sub_payment()} autoFocus>
              حفظ البيانات
            </Button>
          </DialogActions>
        </Dialog>

    </>
    
  );
}
