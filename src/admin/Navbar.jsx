import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import {useState,useEffect} from 'react';

import IconButton from '@mui/material/IconButton';

import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
const NavBar=()=>{

    const [open,setOpen] = useState(true);
    const tuggleOppen=()=>{
        if(open)
            setOpen(false);
        else
            setOpen(true);

            console.log(open)
    }

    return(
        <div className={'admin_nav '+(open ? ('') : ('admin_nav_close'))} >
            <div className='nav_title'>
                <p className={"title_text "+(open ? (''):('dn'))} >The Contributions </p>
                <IconButton onClick={()=>tuggleOppen()}>
                    {
                        open ? (<KeyboardDoubleArrowLeftOutlinedIcon sx={{ fontSize: 30 }}/>):(<KeyboardDoubleArrowRightOutlinedIcon sx={{ fontSize: 30 }}/>)
                    }
                      </IconButton>
            </div>
            
            <Nav.Link className='Admin_link ' href="./home">
                 <MapsHomeWorkOutlinedIcon/>
                 <p className={"link_text "+(open ? (''):('dn'))}>Home</p>
                 </Nav.Link>
            <Nav.Link className='Admin_link' href="./home">
                <FamilyRestroomOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>Families</p>
                </Nav.Link>
            <Nav.Link className='Admin_link' href="./home">
                <GroupAddOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>Users</p>
                </Nav.Link>
            <Nav.Link className='Admin_link' href="./home">
                <ContactMailOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>Contributions</p>
                </Nav.Link>
            <Nav.Link className='Admin_link' href="./home">
                <MonetizationOnOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>expenses</p>
                </Nav.Link>
            <Nav.Link className='Admin_link' href="./home">
                <CalculateOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>Zakat</p>
                </Nav.Link>
        </div>
    )
}
export default NavBar