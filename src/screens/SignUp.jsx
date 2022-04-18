import React from 'react';
import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;

import { useDispatch, useSelector } from 'react-redux';
import {
  googleAuthAction,
  signInAnonymouslyAction,
  userUpdateAction,
} from '../store/actions/userActions';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
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
const input = {
  marginLeft: '10px',
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
  };

  const data = useSelector((state) => state.googleAuth);
  const { loading, error, user } = data;

  const userDetails = useSelector((state) => state.anonymousAuth);
  const { loading: aloading, error: aError, user: randomUser } = userDetails;

  console.log('anonymous', randomUser);
  console.log('google', user);

  const googlesignin = () => {
    dispatch(googleAuthAction());
  };

  const anonymouslogin = () => {
    // dispatch(signInAnonymouslyAction());
    dispatch(userUpdateAction('s7b7nCM0ycT9C2y0Y1BVnyCQXiP2'));
  };

  return (
    <div style={card}>
      <Form
        style={card}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input style={input} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password style={input} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password style={input} />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input style={input} />
        </Form.Item>

        <Form.Item
          label="Image Link"
          name="image"
          rules={[
            {
              required: true,
              message: 'Please input your link!',
            },
          ]}
        >
          <Input style={input} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: 'Please input Intro',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={10} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select style={input} placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        ----- or -----
      </div>
      <Button
        onClick={googlesignin}
        style={button}
        type="primary"
        htmlType="submit"
      >
        Sign in with Google
      </Button>
      <Button
        onClick={anonymouslogin}
        style={button}
        type="primary"
        htmlType="submit"
      >
        Sign in Anonymously
      </Button>
    </div>
  );
};

export default RegistrationForm;
