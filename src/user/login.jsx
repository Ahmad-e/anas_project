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
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login=()=>{

    const [name,setName]=React.useState('');
    const [password,setPassword]=React.useState('');

    const [errName,setErrName]=React.useState(false);
    const [errPassword,setErrPassword]=React.useState(false);
    
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

    return(
        <Container>
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
                    <br/>
                    <br/>
                    <br/>

                    <Button className='auth_button' variant="primary">تسجيل الدخول</Button>

                </div>
            </Row>
        </Container>
    )
}
export default Login