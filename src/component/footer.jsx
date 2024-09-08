import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from 'react-redux';

const Footer=()=>{
    const mode=useSelector((state) => state.mode);
    return(
        <div className='footer p_t_50'>
            <div className="container text-center  ">
                <div class="a">
                    <footer class="row">
                    <div class="col">
                        <h2 class="d-flex align-items-center justify-content-center" >The Contributions</h2>
                        <p>A dedicated family site</p>
                        <div class="soc mt-4 mb-3">
                        <a className={'footer_link i_link '+ (mode==="dark" ? 'dark_color':'light_color')}   href="https://www.instagram.com"><InstagramIcon sx={{ fontSize: 30 }} /></a>
                        <a className={'footer_link l_link '+ (mode==="dark" ? 'dark_color':'light_color')} href="https://www.linkedin.com"><LinkedInIcon sx={{ fontSize: 30 }}/></a>
                        <a className={'footer_link f_link '+ (mode==="dark" ? 'dark_color':'light_color')} href="https://www.behance.com"><FacebookIcon sx={{ fontSize: 30 }} /></a>
                        </div>
                    </div>
                    </footer>
                    <div class="legal mt-2">
                    <p>&copy; 2024 All rights reserved.</p>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    )
}
export default Footer