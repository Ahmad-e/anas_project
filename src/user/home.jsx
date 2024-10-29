import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Img1 from '../images/1.jpg';
import Img2 from '../images/2.jpg';
import Img3 from '../images/3.png';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import {useState,useEffect} from 'react'
import SvgHome from '../svgs/home';
import axios from "axios";
import Err from '../svgs/err404'

const Home=()=>{
    const url = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);

    const mode=useSelector((state) => state.mode);

        const [index, setIndex] = useState(0);
        const [ads, setAds] = useState([]);
        const [events, setEvents] = useState([]);
        const [users, setUsers] = useState([]);
        const [info, setInfo] = useState({});
      
        const handleSelect = (selectedIndex) => {
          setIndex(selectedIndex);
        };
    const Card=(props)=>{
        return(
            <section class="container">
                <div class="card">
                    <div class="card-image">
                    <img src={props.image} alt="card image" />
                    </div>
                    <div>
                        <br/>
                        <h3 className='main_color'>{props.name}</h3>
                        <p> {props.email} </p>
                    </div>
                </div>

                
            </section>
        );
    }


    useEffect(() => {
        axios.get(url+"home",
          {
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' +token ,
                'Accept':"application/json"
            }
          })
            .then((response) => {
                setAds(response.data.ads)
                setEvents(response.data.events)
                setUsers(response.data.top_users)
                setInfo(response.data.home_info[0])
                console.log(response.data)
            })
            .catch((error) =>{ 
              console.log(error);
            });
    }, []);


    const acc=useSelector((state) => state.account);
    if(acc!=="1" && acc!=="2" )
        return(
            <>
            <br/><br/><br/>
                            <h4>
                    لا يمكنك الدخول إلى هذه الصفحة 
                </h4>
                <div>
                    تأكد من   تسجيل دخولك إلى  الموقع بشكل صحيح
                </div>
                <p> يمكنك الدخول <a href='login'>صفحة تسجيل الدخول</a> </p>
            </>
        )

    return(
        <>
            
            <Container>



                <Row style={{ zIndex:2 }}  className=' justify-content-center'>
                    
                    <Col className='m_t_30 p_t_30' style={{ textAlign:"start" }} lg={6}md={4} xs={12}>
                        <h3 className='main_color'>
                            {info.title}
                        </h3>
                        <p>
                            {info.text}
                        </p>
                    </Col>
                    <Col  lg={6} md={8} xs={12}>
                        <img className='home_img' src={info.img_url} />
                    </Col>
                </Row>
                
                {/* <Row style={{ zIndex:2 }} className='m_t_50 justify-content-center'>
                    <Col className='m_t_50 p_t_50' lg={12} sm={12}>
                        <h3 className='main_color'>
                            الأعضاء الأكثر  مساهمة 
                        </h3>
                    </Col>
                    {users.map((item)=>{
                        return(
                            <Col className='m_t_50' lg={4} sm={6} xs={12}>
                                <Card image={item.user[0].img_url} name={item.user[0].name} email={item.user[0].email} />
                            </Col>
                        )
                    })}


                </Row>
                <Row style={{ zIndex:2 }}  className='m_t_50 p_t_30 fullWidth justify-content-center'>
                    <hr/>    
                </Row> */}

                <Row style={{ zIndex:2 }}  className='m_t_50 p_t_30 fullWidth justify-content-center'>
                    <hr/>    
                </Row>
            </Container>

            <Container >


                    <Col className='m_t_50 justify-content-center' lg={8} md={7} sm={12}>
                        <Carousel style={{ height:"400px" ,  zIndex:2 }} >
                            {
                                ads.map((item)=>{
                                    return(
                                        <Carousel.Item interval={4000}>
                                            <img className='carsl_img' src={item.img_url} />
                                            <Carousel.Caption className={mode}>
                                                
                                                <p>{ item.name }</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                })
                            }

                            {
                                events.map((item)=>{
                                    return(
                                        <Carousel.Item interval={4000}>
                                            <img className='carsl_img' src={item.img_url}/>
                                            <Carousel.Caption className={mode}>
                                            <h3>سيتم بتاريخ { item.date }</h3>
                                                <p>{ item.name }</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                })
                            }
                            


                        </Carousel>
                    </Col>
            </Container>


        </>
    )
}
export default Home