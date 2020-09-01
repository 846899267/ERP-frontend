import React from 'react';
import {Form,Modal,Input,Radio,Cascader} from 'antd';

class AddressForm extends React.Component {
  constructor(){
    super();
    this.options=[
      {
        value: '河南',
        label: '河南',
        children: [
          {
            value: '郑州',
            label: '郑州',
            children: [
              {
                value: '中原区',
                label: '中原区',
              },{
                value: '二七区',
                label: '二七区',
              },{
                value: '高新区',
                label: '高新区',
              }
            ],
          }, {
            value: '商丘',
            label: '商丘',
            children: [
              {
                value: 'a区',
                label: 'a区',
              },{
                value: 'b区',
                label: 'b区',
              }
            ],
          },{
            value: '信阳',
            label: '信阳',
            children: [
              {
                value: '12区',
                label: '12区',
              },{
                value: '6区',
                label: '6区',
              }
            ],
          },
        ],
      },
      {
        value: '江苏',
        label: '江苏',
        children: [
          {
            value: '南京',
            label: '南京',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
      {
        value: '浙江',
        label: '浙江',
        children: [
          {
            value: '杭州',
            label: '杭州',
            children: [
              {
                value: '1区',
                label: '1区',
              },{
                value: '2区',
                label: '2区',
              },
            ],
          },
          {
            value: '嘉兴',
            label: '嘉兴',
            children: [
              {
                value: 'a区',
                label: 'a区',
              },{
                value: 'b区',
                label: 'b区',
              },
            ],
          },
        ],
      },
    ];
  }

  render(){
    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    // 父组件传递给子组件值
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    // 将表单中没有出现的值做一个双向数据绑定
    getFieldDecorator("id");
    return (
      <Modal
          visible={visible}
          title="更新顾客信息"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
              <Form.Item label="省/市/区" >
                {getFieldDecorator('addr', {
                  rules: [{ required: true, message: '请输入!' }],
                })(<Cascader options={this.options} placeholder="请选择地址" />)}
              </Form.Item>
              <Form.Item label="详细地址">
              {getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入地址!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="电话">
              {getFieldDecorator('telephone', {
                rules: [{ required: true, message: '请输入电话!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="顾客ID">
              {getFieldDecorator('customerId', {
                rules: [{ required: true, message: '请输入顾客ID!' }],
              })(<Input />)}
            </Form.Item>
           
          </Form>
        </Modal>
    );
  }
}
//将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props)=>{
  let obj = {};
  for(let key in props.initData){
    let val = props.initData[key];
    obj[key] = Form.createFormField({value:val})
  }
  return obj;
}

export default Form.create({
  mapPropsToFields
})(AddressForm);