import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import * as React from 'react';
import TextField from '@mui/material/TextField';

import Button from 'react-bootstrap/Button';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import { useSelector } from 'react-redux';

import Loading from '../component/loading';
import axios from "axios";

import PaymentSub from './paymentSub'


export default function Contributions() {

  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);
  const [loading, setLoading] = React.useState(false);
  const [users,setUsers] = React.useState([]);
  const [data,setData] = React.useState([]);
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
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });


    axios.get(url+"showSubscriptionData",
      {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' +token ,
            'Accept':"application/json"
        }
      })
        .then((response) => {
            setData(response.data.subscriptions);
            setLoading(false)
        })
        .catch((error) =>{ 
          console.log(error);
           setLoading(false) });



}, []);

  
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


  const addData=()=>{
    
    if(date!=='' && endDate!=='' && userId!==0 && mony>=0)
    {
        console.log(userId, mony,date,endDate)

      setLoading(true)
      try {
        const response = axios.post(url+'addSubscription', {
          user_id:userId,
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

  return (
    <Container>
      <Loading loading={loading}/>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col className="dash_component p_t_30" style={{ alignItems:"start" }} lg={4} md={3} sm={10} xs={12} >
          <div className="dash_add_style">


              <div className=" p_t_30 p_10">
                  <h4> اشتراك جديد </h4>
              </div>
              <div className=" p_t_30 p_10">
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">اسم المشترك</InputLabel>
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
              <div className="p_10">
                  <TextField onChange={handleChangeMony} type="number"  fullWidth id="outlined-basic" label="المبلغ" variant="outlined" />
              </div>

              <div className="p_10"> 
                  <label> تاريخ بداية الاشتراك </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                      <DatePicker onChange={handleChangeDate} label="" />
                  </DemoContainer>
                  </LocalizationProvider>
              </div>

              <div className="p_10"> 
                  <label> تاريخ نهاية الاشتراك </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                      <DatePicker onChange={handleChangeEndDate} label="" />
                  </DemoContainer>
                  </LocalizationProvider>
              </div>
              <div>
                  <Button onClick={()=>addData()} className="m_t_30"> حفظ البيانات </Button>
              </div>
          </div>
        </Col>
        <PaymentSub data={data} />
      </Row>

      <Row className='fullWidth m_t_50 justify-content-center'>
          <div>
              <Button href={url+"export_subscrips"} className="m_t_30">  تحميل ملف البيانات  <FileDownloadIcon/></Button>
          </div>
      </Row>
    </Container>
    
  );
}
