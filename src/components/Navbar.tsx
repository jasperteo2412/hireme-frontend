import { Button, Col, Row, Space } from "antd";
import Logo from '../images/hireme_logo.png'
import { useNavigate } from "react-router-dom";

export function Navbar(props: any){

    const {
        showItems
    } = props;

    const navigate = useNavigate();

    return(
        <Row className='navbar'>
            <Col xs={8}>
                <img src={Logo} style={{height: "40px"}}/>
            </Col>
            <Col xs={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Space direction="horizontal" size="middle" style={{ display: 'flex', visibility: showItems? 'visible' : 'hidden' }}>
                    <Button type="link" onClick={()=> navigate("/homepage")}>
                        Home
                    </Button>
                    <Button type="link" onClick={()=> navigate("/chat")}>
                        Messages
                    </Button>
                    <Button type="link" onClick={()=>navigate("/logout")}>
                        Logout
                    </Button>
                </Space>
            </Col>
        </Row>
    );
}