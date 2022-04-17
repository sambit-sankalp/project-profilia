import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';

const SignIn = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const card = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const button = {
    marginTop: '10px',
  };

  return (
    <Card style={{ marginTop: '80px' }}>
      <Form
        style={card}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          ----- or -----
        </div>
        <Button style={button} type="primary" htmlType="submit">
          Sign in with Google
        </Button>
        <Button style={button} type="primary" htmlType="submit">
          Sign in Anonymously
        </Button>
      </Form>
    </Card>
  );
};

export default SignIn;
