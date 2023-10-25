import { Row, Col, Space, Divider, Button } from "antd";
import { useNavigate } from "react-router-dom";
import FooterLogo from "../images/hireme_logo.png";

export default function Footer(props: any){
    const {
        showItems
    } = props;

    const navigate = useNavigate();

    return(
        <Row className='footer-hireme'>
            <Col xs={8} className='footer-logo' >
            <Space direction="vertical">
                <img
                    src={FooterLogo} 
                    style={{height: "30px",}}
                    onClick={()=>navigate("/homepage")}
                />
                <p style={{color: "gray", fontSize: "8px"}}>
                    &copy; 2023 Hire Me Platform
                </p>
            </Space>
            </Col>
            <Col xs={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Space direction="horizontal" size="middle" style={{ display: 'flex'}}>
                    <Button type="link" onClick={()=> navigate("/")} style={{color: "gray"}}>
                        Help Centre
                    </Button>
                    <Divider type={"vertical"} />
                    <Button type="link" onClick={()=> navigate("/")} style={{color: "gray"}}>
                        Contact Us
                    </Button>
                    <Divider type={"vertical"} />
                    <Button type="link" onClick={()=> navigate("/")} style={{color: "gray"}}>
                        Terms
                    </Button>
                    <Divider type={"vertical"} />
                    <Button type="link" onClick={()=> navigate("/")} style={{color: "gray"}}>
                        Privacy
                    </Button>
                </Space>
            </Col>
        </Row>
    )
}