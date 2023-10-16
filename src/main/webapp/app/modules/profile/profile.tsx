import React, { useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Header, Content, Footer } from 'antd/es/layout/layout';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const onFinish = (values: any) => {
  // eslint-disable-next-line no-console
  console.log(values);
};

const profile = () => {
  return (
    <div>
      <Layout style={{ minHeight: '100vh', background: 'white' }}>
        <Layout.Sider width={400} style={{ background: '#f0f2f5', padding: '16px' }}>
          {/* Side Content */}
          <Card title="Profile Details">
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            {/* Add additional side content here */}
          </Card>
        </Layout.Sider>
        <Layout.Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Form
            name="editProfile"
            initialValues={{ name: 'John Doe', email: 'johndoe@example.com' }}
            onFinish={onFinish}
            style={{ width: '80%' }}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default profile;
