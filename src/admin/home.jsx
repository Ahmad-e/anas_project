import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as React from 'react';

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

import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from "axios";


const Home = () => {

  const acc=useSelector((state) => state.account);
  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);

  const [data,setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  const handleChange=(e)=>{
    var body={
      date1:(e[0].$y +"-"+ (e[0].$M+1) +"-"+(e[0].$D+1)),
      date2:( e[1].$y +"-"+ (e[1].$M+1) +"-"+(e[1].$D+1))
      }
    console.log(body)
    try {
      const response = axios.post(url+'getReport', body,
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
      const response = axios.post(url+'getReport', {
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
  
  return (
    <Container>
      <Loading loading={false}/>
      
      <Row className=' justify-content-center'>
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
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div >
            <p> المستخدمين الجدد </p>
            <h3>{data.users_count}</h3>
          </div>
          <div >
            <ContactMailOutlinedIcon style={{  fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> المصاريف </p>
            <h3> {data.total_expenses} </h3>
          </div>
          <div>
            <CalculateOutlinedIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> المساهمات </p>
            <h3> {data.total_donations_now} </h3>
          </div>
          <div>
            <MonetizationOnOutlinedIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> الزكاة المدفوعة </p>
            <h3> {data.total_zaka} </h3>
          </div>
          <div>
            <PlaylistAddIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>

        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> المحفظة الحالية </p>
            <h3> {data.total_donations_now - data.total_expenses} </h3>
          </div>
          <div>
            <AccountBalanceWalletIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> المساهمات المدفوعة من سنة </p>
            <h3> {data.total_donations} </h3>
          </div>
          <div>
            <MonetizationOnOutlinedIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> الزكاة المدفوعة من سنة </p>
            <h3> {data.total_zaka_old} </h3>
          </div>
          <div>
            <PlaylistAddIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>

        </Col>
        <Col lg={6} md={8} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> الزكاة المفروضة و غير المدفوعة </p>
            <h2 style={{ fontWeight:"bolder" }}> {data.zaka_on_total_donations} </h2>
          </div>

          <div>
            <DomainVerificationIcon style={{ fontSize:"65px" ,marginTop:"-6px" }}/>
          </div>
          
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
