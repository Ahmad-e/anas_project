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
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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
    axios.get(url+"showExpenses",
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.expenses);
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
    
    if(date!==''  && typeId!==0 & mony!==0)
    {
      setLoading(true)
      try {
        const response = axios.post(url+'addExpense', {
          expense_type_id: typeId,
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
              setData(response.data.expenses)
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
    axios.get(url+"deleteExpense/"+idToDelete,
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.expenses);
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
              setData(response.data.expenses)
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
  
  const [filterUsType,setFilterUsType] = React.useState(0);

  return (
    <Container>
      <Loading loading={loading}/>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className="dash_component " style={{ alignItems:"start" }} lg={4} md={3} sm={10} xs={12} >
            <div className="dash_add_style">
              <div className=" p_10">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">نوعية التكلفة </InputLabel>
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
                <label> تاريخ أداء التكلفة </label>
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
            </div>
        </Col>
        <Col className="dash_component" lg={8} md={9} sm={12}>
              <FormControl style={{ padding : "10px", width:"220px"  }}  >
                <InputLabel id="demo-simple-select-label"> عرض حسب</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterUsType}
                  label=" عرض حسب "
                  onChange={(e)=>setFilterUsType(e.target.value)}
                >
                  <MenuItem value={0}> جميع الأنواع </MenuItem>
                  {
                    types.map((item)=>{
                      return(<MenuItem value={item.id}> {item.name} </MenuItem>)
                    })
                  }
                </Select>
              </FormControl>
          <TableContainer component={Paper}>
            <Table >
              <TableHead >
                <TableRow>
                  <TableCell align="center"> التاريخ </TableCell>
                  <TableCell align="center"> نوعية التكلفة </TableCell>
                  <TableCell align="center"> المبلغ </TableCell>
                  <TableCell align="center"> حذف البيانات </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => {
                  if(row.expense_type_id===filterUsType|| filterUsType===0 )
                  return(
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="center">{row.type}</StyledTableCell>
                    <StyledTableCell align="center">{row.amount}</StyledTableCell>
                    <StyledTableCell align="center"> 
                      <Button onClick={()=>handleClickOpenDeleteDialog(row.id)} variant="outline-primary" >حذف</Button>
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
              <Button href={url+"export_expenses"} className="m_t_30">  تحميل ملف البيانات  <FileDownloadIcon/></Button>
          </div>
      </Row>

      <Dialog
        fullScreen={fullScreen}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        حذف التكلفة لعدم احتسابها وإزالتها من النظام
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
            حذف التكلفة
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
            
            <div className="a_c p_10">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">نوعية التكلفة</InputLabel>
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
              <label> تاريخ التكلفة </label>
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



// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Img from '../images/2.jpg'


// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
// import Button from 'react-bootstrap/Button';

// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';



// import { useSelector } from 'react-redux';

// import Loading from '../component/loading';
// import axios from "axios";

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function Contributions() {


//   const acc=useSelector((state) => state.account);
//   const url = useSelector(state=>state.url);
//   const token = useSelector(state=>state.token);

//   const [data,setData] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);

//   const [open, setOpen] = React.useState(false);
//   const [idToDelete, setIdToDelete] = React.useState(0);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const handleClickOpen = (id) => {
//     setOpen(true);
//     setIdToDelete(id);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };


//   const [userId, setUserId] = React.useState('');

//   const handleChangeUserId = (event) => {
//     setUserId(event.target.value);
//   };

//   return (
//     <Container>
//       <Loading loading={loading}/>
//       <Row className='fullWidth m_t_50 justify-content-center'>
//         <Col className="dash_component" lg={8} md={9} sm={12}>
//           <TableContainer component={Paper}>
//             <Table >
//               <TableHead >
//                 <TableRow>
//                   <TableCell align="center"> رقم </TableCell>
//                   <TableCell align="center"> نوعية النفقة </TableCell>
//                   <TableCell align="center"> المبلغ </TableCell>
//                   <TableCell align="center"> تعديل البيانات </TableCell>
//                   <TableCell align="center"> حذف البيانات </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <StyledTableRow key={row.name}>
//                     <StyledTableCell align="center">{row.fat}</StyledTableCell>
//                     <StyledTableCell align="center">{row.carbs}</StyledTableCell>
//                     <StyledTableCell align="center">100</StyledTableCell>
//                     <StyledTableCell align="center"> 
//                       <Button  variant="outline-primary" >تعديل</Button>
//                     </StyledTableCell>
//                     <StyledTableCell align="center"> 
//                       <Button  variant="outline-primary" >حذف</Button>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Col>
//         <Col className="dash_component" style={{ alignItems:"start" }} lg={4} md={3} sm={10} xs={12} >
          
//           <div className=" p_10">
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label"> نوعية النفقة </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={userId}
//                 label="نوعية النفقة"
//                 onChange={handleChangeUserId}
//               >
//                 <MenuItem value={10}>تبرع لمسجد</MenuItem>
//                 <MenuItem value={20}>صدقة جارية</MenuItem>
//                 <MenuItem value={30}>زكاة فطر</MenuItem>
//                 <MenuItem value={30}>نوع أخر ..</MenuItem>
//               </Select>
//             </FormControl>
              

//           </div>
//           <div className="p_10">
//             <label> المبلغ </label>
//             <TextField type="number"  fullWidth id="outlined-basic" label="المبلغ" variant="outlined" />
//           </div>
//           <div className="p_10"> 
//             <label> تاريخ الإنفاق </label>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={['DatePicker']}>
//                 <DatePicker label="" />
//               </DemoContainer>
//             </LocalizationProvider>
//           </div>
//           <div>
//             <Button className="m_t_30"> حفظ البيانات </Button>
//           </div>
//         </Col>
//       </Row>
//     </Container>
    
//   );
// }
