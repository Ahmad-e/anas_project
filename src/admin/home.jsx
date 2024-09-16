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


import { useSelector } from 'react-redux';

import axios from "axios";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Home = () => {

  const acc=useSelector((state) => state.account);
  const url = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);

  const [data,setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  return (
    <Container>
      <Loading loading={false}/>
      <Row className=' justify-content-center'>
        <Col className="p_t_50" lg={12} md={12} >
          <p>أدخل المدة الزمنية التي تريد تخريج تقرير ضمنها</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
              <DateRangePicker localeText={{ start: 'تاريخ البداية', end: 'تاريخ النهاية' }} />
            </DemoContainer>
          </LocalizationProvider>
        </Col>
      </Row>
      <Row className='fullWidth m_t_50 justify-content-center'>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div >
            <p> المستخدمين الجدد </p>
            <h3>5</h3>
          </div>
          <div >
            <ContactMailOutlinedIcon style={{  fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> المصاريف </p>
            <h3>21312</h3>
          </div>
          <div>
            <CalculateOutlinedIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> المساهمات </p>
            <h3>21312</h3>
          </div>
          <div>
            <MonetizationOnOutlinedIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>
        </Col>
        <Col lg={3} md={4} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> الزكاة المدفوعة </p>
            <h3>21312</h3>
          </div>
          <div>
            <PlaylistAddIcon style={{ fontSize:"40px" ,marginTop:"-3px" }}/>
          </div>

        </Col>
        <Col lg={6} md={8} sm={6} xs={8} className="Admin_info_component">
          <div>
            <p> الزكاة المفروضة و غير المدفوعة </p>
            <h2 style={{ fontWeight:"bolder" }}>21312</h2>
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
