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
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import WrapTextIcon from '@mui/icons-material/WrapText';
import CelebrationIcon from '@mui/icons-material/Celebration';

const NavBar=()=>{

    const [open,setOpen] = useState(false);
    const tuggleOppen=()=>{
        if(open)
            setOpen(false);
        else
            setOpen(true);
    }

    return(
        <div className={'admin_nav '+(open ? ('') : ('admin_nav_close'))} >
            <div className='nav_title'>
                <p className={"sec_color title_text "+(open ? (''):('dn'))} > لوحة إدارة سواعد </p>
                <IconButton className='sec_color' onClick={()=>tuggleOppen()}>
                    {
                        !open ? (<KeyboardDoubleArrowLeftOutlinedIcon className='sec_color' sx={{ fontSize: 30 }}/>):(<KeyboardDoubleArrowRightOutlinedIcon className='sec_color' sx={{ fontSize: 30 }}/>)
                    }
                      </IconButton>
            </div>
            
            <Nav.Link className='Admin_link ' href="./home">
                 <MapsHomeWorkOutlinedIcon/>
                 <p className={"link_text "+(open ? (''):('dn'))}>الرئيسية</p>
                 </Nav.Link>
            <Nav.Link className='Admin_link' href="./family">
                <FamilyRestroomOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>العائلات</p>
                </Nav.Link>
            <Nav.Link className='Admin_link' href="./users">
                <GroupAddOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>المستخدمين</p>
                </Nav.Link>
            <Nav.Link className='Admin_link' href="./contributions">
                <ContactMailOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>المساهمات</p>
                </Nav.Link>
            <Nav.Link className='Admin_link' href="./expensess">
                <MonetizationOnOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>المصاريف</p>
            </Nav.Link>
            <Nav.Link className='Admin_link' href="./types">
                <WrapTextIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}>أنواع المساهمات</p>
            </Nav.Link>
            <Nav.Link className='Admin_link' href="./zakat">
                <CalculateOutlinedIcon/>
                <p className={"link_text "+(open ? (''):('dn'))}> دفعات الزكاة</p>
            </Nav.Link>
            <Nav.Link className='Admin_link' href="./ads">
                <ViewCarouselIcon />
                <p className={"link_text "+(open ? (''):('dn'))}>  الإعلانات  </p>
            </Nav.Link>
            <Nav.Link className='Admin_link' href="./events">
                <CelebrationIcon />
                <p className={"link_text "+(open ? (''):('dn'))}>  المناسبات</p>
            </Nav.Link>
        </div>
    )
}
export default NavBar