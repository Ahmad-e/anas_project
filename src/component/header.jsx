import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import B_Button from 'react-bootstrap/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useDispatch, useSelector } from 'react-redux';
import {modeActions} from "../Store"

const Header=()=>{
    const dispatch = useDispatch();
    const {toggleMode,setToken,setAcc} = modeActions;
    const mode=useSelector((state) => state.mode);
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={ mode==="dark" ? { backgroundColor:"#333" } : {backgroundColor:"#fffdfd" , color:"#333"}} position="static">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                
                </Typography>
                <Button  style={{ margin:"4px" }} color="inherit">SIGN OUT</Button>
                <Button  href='./login' style={{ margin:"4px"}} color="inherit">sign in</Button>
                <B_Button href='./register' style={{ margin:"4px" }} color="inherit">SIGN UP</B_Button>

                <IconButton
                style={{ margin:"4px" }}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={()=>dispatch(toggleMode())}
                >
                   { mode==="dark"? <LightModeIcon /> : <NightsStayIcon/>}
                </IconButton>
            </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Header