import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../component/loading';
import axios from "axios";
import {modeActions} from "../Store"
import { useLocation } from 'react-router-dom';


import PhoneInput from 'react-phone-input-2'


const Register=()=>{

    const location = useLocation();
    
    const result = location.pathname.substring(0,6);

    const {setToken,setAcc} = modeActions;
    const dispatch = useDispatch();
    const url = useSelector(state=>state.url);
    const [loading, setLoading] = React.useState(false);

    const [email,setEmail]=React.useState('');
    const [name,setName]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [phone_no,setPhone_no]=React.useState('');
    const [family_id,setFamily_id]=React.useState(0);
    const [families,setFamilies]=React.useState([]);

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
                console.log(response.data)
                setLoading(false)
            })
            .catch((error) =>{ 
              console.log(error);
               setLoading(false) });
    }, []);

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
            setErrPassword(false);
        
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

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const send_data=()=>{
        
        if(password==="")
            setErrPassword(true)
        if(name==="")
            setErrName(true)
        if(email==="")
            setErrEmail(true)
        if(phone_no.length<8)
            setErrPhone_no(true)

        if(family_id===0)
            setErrFamilyId(true)

        
        if(!errName && !errPassword && !erremail && family_id!==0 && !errPhone_no)
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
                        console.log("yes",response.data);
                        if(response.data.status===true)
                        {
                            setErrServer('')
                            if(result!=='/admin'){
                                dispatch(setToken(response.data.access_token));
                                dispatch(setAcc(response.data.user_data.type_id));
                            }
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

    return(
        <Container>
            <Row className='justify-content-center' >
                <Loading loading={loading}/>
                <div className="auth_box m_t_50" >
                
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
            </Row>
        </Container>
    )
}
export default Register