import { Spin } from "antd";
import { useEffect } from "react";

export default function Logout(){

    useEffect(()=>{
        sessionStorage.clear();
        setTimeout(()=>{
            window.location.reload();
        }, 2000);
    }, []);
    
    return(
        <Spin tip={"Logging out..."}>
            <div style={{width: '100vw', height: '100vh'}}></div>
        </Spin>
    )
}