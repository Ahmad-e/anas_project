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


const Home=()=>{
    const url = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);

    const mode=useSelector((state) => state.mode);

        const [index, setIndex] = useState(0);
        const [ads, setAds] = useState([]);
        const [events, setEvents] = useState([]);
        const [users, setUsers] = useState([]);
      
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
                console.log(response.data)
            })
            .catch((error) =>{ 
              console.log(error);
            });
    }, []);

    return(
        <>
            <Carousel style={{ height:"400px" ,  zIndex:2 }} >
                {
                    ads.map((item)=>{
                        return(
                            <Carousel.Item interval={4000}>
                                <img className='carsl_img' src={item.img_url} />
                                <Carousel.Caption>
                                    
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
                                <Carousel.Caption>
                                <h3>سيتم بتاريخ { item.date }</h3>
                                    <p>{ item.name }</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
                


                </Carousel>
                
            <Container >
                
                <Row style={{ zIndex:2 }}  className='m_t_50 justify-content-center'>
                    <Col  lg={6} md={8} xs={12}>
                        <SvgHome />
                    </Col>
                    <Col style={{ textAlign:"start" }} lg={6}md={4} xs={12}>
                        <h3 className='main_color home_text'>
                        سواعد متكاتفة 
                        </h3>
                        <p>
                        موقع مخصص للأسرة يهتم بدراسة وتحليل التبرعات والمصروفات الخاصة والداخلية وحساب الزكاة المفروضة
                        </p>
                    </Col>
                </Row>
                <Row style={{ zIndex:2 }}  className='m_t_50 p_t_30 fullWidth justify-content-center'>
                    <hr/>    
                </Row>
                <Row style={{ zIndex:2 }} className='m_t_50 justify-content-center'>
                    <Col lg={12} sm={12}>
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
            </Container>
        </>
    )
}
export default Home