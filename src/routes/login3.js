import React from 'react';

import { Form, Input, Button, message } from 'antd';

import './login.less'

import * as API from '../api/index';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class login extends React.Component {

  // 登录接口
  logins = async(options) => {
    try {
      const data = await API.login(options);
      console.log(data, '登录打印');
      if (data.code === 200) {
        message.success('恭喜您，注册成功了！');
        localStorage.setItem('token', data.token);
        // message.success('登录成功了');
        this.props.history.push('/');
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const onFinish = values => {
      console.log('Success:', values);
      this.logins(values);
    };
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <div className="wrapper">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="formWrapper"
        >
          <Form.Item
            label="手机"
            name="phone"
            rules={[{ required: true, message: '请输入你的手机号!' }]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default login;
