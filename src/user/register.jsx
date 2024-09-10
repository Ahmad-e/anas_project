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
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

const Register=()=>{


    const [email,setEmail]=React.useState('');
    const [name,setName]=React.useState('');
    const [password,setPassword]=React.useState('');

    const [erremail,setErrEmail]=React.useState('');
    const [errName,setErrName]=React.useState(false);
    const [errPassword,setErrPassword]=React.useState(false);


    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleChangeEmail=(event)=>{
        setEmail(event.target.value)
        if(re.test(email))
            setErrEmail(true);
        else
            setErrEmail(false)
    }

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
                <h4>create new account</h4>
                <div className=" p_t_30 p_10">
                    <label> Add image</label> <br/> 
                    <input className="dn" accept="image/*"  type="file" id="inputFile1" />
                    <label className="btn-primary btn" for="inputFile1" > Upload image <FileUploadRoundedIcon/> </label>
                </div>
                    <TextField
                        type='email'
                        label="email"
                        variant="standard"
                        fullWidth
                        value={email}
                        onChange={handleChangeEmail}
                        error={erremail}
                        />
                    <div  className={erremail ? 'auth_lable ' : 'auth_lable hidd' }> The email must be correct </div>
                
                    <TextField
                        type='text'
                        id="standard-required"
                        label="name"
                        variant="standard"
                        
                        fullWidth
                        value={name}
                        onChange={handleChangeName}
                        error={errName}
                        />
                    <div  className={errName ? 'auth_lable ' : 'auth_lable hidd' }> The name must be greater than two letters </div>

                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChangepassword}
                            error={errPassword}
                            endAdornment={
                            <InputAdornment position="end">
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
                        <div  className={errPassword ? 'auth_lable ' : 'auth_lable hidd' }> Password must be at least 8 characters </div>
                    </FormControl>
                    <br/>
                    <br/>
                    <br/>

                    <Button className='auth_button' variant="primary">sign up</Button>

                </div>
            </Row>
        </Container>
    )
}
export default Register