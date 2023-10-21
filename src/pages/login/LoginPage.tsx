/* eslint-disable no-console */
import { Alert, Button, Card, Col, Form, Input, Layout, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login-page.css';
import { useNavigate } from 'react-router-dom';
import { postSignIn } from '../../apis/UserAPIs';

import LoginImage from '../../images/login.jpeg';

interface LoginFormProps {
  onSubmit: (values: { username: string; password: string }) => void;
}

const LoginPage: React.FC = () => {

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSubmit = (values: { username: string; password: string }) => {
    // Handle the login logic here
    // console.log('Login form submitted with values:', values);
    signInApi(values.username, values.password);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  function signInApi(username: string, password: string) {
    const requestBody = {
      username,
      password,
    };

    postSignIn(requestBody).then((data: any) => {
      if (data.status === 200) {
        messageApi.info({ content: 'Successfully logged in!' });
        console.log("USER data.res: ", data.res);
        sessionStorage.setItem("TOKEN", data.res.accessToken);
        sessionStorage.setItem("TOKEN-TYPE", data.res.tokenType);
        sessionStorage.setItem("USER-ID", data.res.username);
        sessionStorage.setItem("ROLES", data.res.roles);
        setLoggedIn(true);
      } else {
        setError(true);
        messageApi.error({ content: data.resError+": "+data.res });
      }
    });
  }

  useEffect(() => {
    if(loggedIn){
      location.reload();
    }
  }, [[loggedIn]])

  return (
    <Row>
      {contextHolder}
      <Col xs={12} style={{ backgroundColor: 'black'}}>
        <img src={LoginImage} style={{height: "100%", width: "100%", objectFit: "contain"}}/>
      </Col>
      <Col xs={12} style={{ padding: '20px' }}>
      {error ? (
        <Alert
          type="error"
          message={'Unable to log in'}
          description={'An error has ocurred while trying to login, please try again later.'}
          showIcon
          closable
        />
      ) : undefined}
        <div className="login-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Form name="login-form" onFinish={handleLoginSubmit}>
            <h2 className="text-title">
              <p>Welcome!</p>
              It’s really nice to see you
            </h2>
            <Form.Item name="username" rules={[{ required: true, message: 'Please enter your username!' }]}>
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
              <Button type="link" onClick={handleRegister}>
                Join us Today!
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
