/* eslint-disable no-console */
import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Divider, Alert, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { postSignUp } from '../../../apis/UserAPIs';
import { AUTHORITIES } from '../../../config/constants';

import RegisterImage from '../../../images/register.jpg';

const RegisterPage = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(false);
  
  const onFinish = (values: { username: string; email: string; password: string }) => {
    // Handle signup logic here
    console.log('Signup form submitted with values:', values);
    signUpApi(values);
  };

  const handleClick = () => {
    navigate('/login');
  };

  function signUpApi(formValues: { username: string; email: string; password: string }) {
    const requestBody = {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
      roles: [AUTHORITIES.USER]
    };

    postSignUp(requestBody).then((data: any) => {
      if (data.status === 200) {
        messageApi.info({ content: 'Successfully registered!' });
        form.resetFields();
      } else {
        setError(true);
        messageApi.error({ content: data.resError });
      }
    });
  }

  return (
    <Row>
      {contextHolder}
      <Col xs={12} style={{ backgroundColor: 'black', backgroundImage: `url(${RegisterImage})`}} />
      <Col xs={12} style={{ padding: '20px' }}>
      {error ? (
        <Alert
          type="error"
          message={'Unable to register'}
          description={'An error has ocurred while trying to register your account, please try again later.'}
          showIcon
          closable
        />
      ) : undefined}
        <div className="signup-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Form name="signup-form" form={form} onFinish={onFinish}>
            <h2>Sign Up</h2>
            <Form.Item name="username" rules={[{ required: true, message: 'Please enter your username!' }]}>
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Invalid email format' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign Up
              </Button>
            </Form.Item>
            <Divider></Divider>
            <Button type="link" onClick={handleClick}>
              Sign in
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
