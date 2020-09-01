// import React from 'react'
// import { Form, Input, Button, Checkbox } from 'antd';
// class login extends React.Component {
//     onFinish(){

//     }
//     render() {
//         return (
//             <Form
              
//               name="basic"
//               initialValues={{
//                 remember: true,
//               }}
//               action="/login/denglu"
//                onFinish={onFinish}
//             //   onFinishFailed={onFinishFailed}
//             >
//               <Form.Item
//                 label="用户名"
//                 name="username"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please input your username!',
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
        
//               <Form.Item
//                 label="密码"
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please input your password!',
//                   },
//                 ]}
//               >
//                 <Input.Password />
//               </Form.Item>
        
//               <Form.Item  name="remember" valuePropName="checked">
//                 <Checkbox>Remember me</Checkbox>
//               </Form.Item>
        
//               <Form.Item >
//                 <Button type="primary" htmlType="submit" >
//                   Submit
//                 </Button>
//               </Form.Item>
//             </Form>
//           );
//         };
//     }

 
// export default login


import React from 'react'
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class login extends React.Component {
  formRef = React.createRef();

  onGenderChange = value => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = values => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  render() {
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        {/* <Form.Item
          name="note"
          label="Note"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={this.onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={this.onFill}>
            Fill form
          </Button>
        </Form.Item> */}
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
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
      
    );
  }
}

//ReactDOM.render(<Demo />, mountNode);
export default login;