import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/loading';
import axios from "axios";
import {modeActions} from "../Store"

const Login=()=>{
    const {setToken,setAcc} = modeActions;
    const dispatch = useDispatch();
    const url = useSelector(state=>state.url);
    const [loading, setLoading] = React.useState(false);
    const [name,setName]=React.useState('');
    const [password,setPassword]=React.useState('');

    const [errName,setErrName]=React.useState(false);
    const [errPassword,setErrPassword]=React.useState(false);
    const [errServer, setErrServer] = React.useState('');

    const handleChangepassword=(event)=>{
        setPassword(event.target.value)
        if(event.target.value.length<8)
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

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const send_data=()=>{
        
        
        if(name==="")
            setErrName(true)
        if(password==="")
            setErrPassword(true)
        
        if(!errName  && !errPassword)
          if(name!=='' && password!=='' ){
            setLoading(true);
            console.log(name, password )
            try {
              const response = axios.post(url+'login', {
                    name:name,
                  password:password
                }).then((response) => {
                  if(response.data.status)
                  {     
                        console.log(response.data);
                        dispatch(setToken(response.data.access_token));
                        dispatch(setAcc(response.data.user_data.type_id));
                        setLoading(false);
                  }
                  else
                  {
                    console.log(response.data);
                    setLoading(false)
                  }

              }).catch((error) => {

                  console.log(error)
                  setErrServer('يوجد خطأ في الأيميل أو كلمة السر')
                  setLoading(false)
              });
                  
          } catch (e) {
                  throw e;
          }
        }
    }

    return(
        <Container>
            <Loading loading={loading}/>
            
            <Row className='justify-content-center' >
                
                <div className="auth_box m_t_50" >
                <h4>تسجيل الدخول</h4>
                    <TextField
                        
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
                        <InputLabel htmlFor="standard-adornment-password">كلمة السر</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChangepassword}
                            error={errPassword}
                            startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            
                            }
                            
                        />
                        <div  className={errPassword ? 'auth_lable ' : 'auth_lable hidd' }>كلمة السر يجب أن تكون 8 رموز على الأقل </div>
                    </FormControl>
                    <br/><br/>
                    <Alert  variant="outlined" hidden={errServer===""} severity="error">{errServer}</Alert>
                    <br/>
                    <Button onClick={()=>send_data()} className='auth_button' variant="primary">تسجيل الدخول</Button>
                    
                </div>
                
            </Row>
            
        </Container>
    )
}
export default Login