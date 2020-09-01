import React from 'react';
import {Form,Modal,Input} from 'antd'

class OrderForm extends React.Component {

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
    // 将表单中没有出现的值做一个双向数据绑定sshj
    getFieldDecorator("id");
    getFieldDecorator("status");
    getFieldDecorator("photo");
    return (
      <Modal
          visible={visible}
          title="添加订单信息"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="物资名称" >
              {getFieldDecorator('iname', {
                rules: [{ required: true, message: '请输入订单时间!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="供应商名称" >
              {getFieldDecorator('gname', {
                rules: [{ required: true, message: '请输入订单时间!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="数量" >
              {getFieldDecorator('shuliang', {
                rules: [{ required: true, message: '请输入订单时间!' }],
              })(<Input />)}
            </Form.Item>
            {/* <Form.Item label="订单时间" >
              {getFieldDecorator('orderTime', {
                rules: [{ required: true, message: '请输入订单时间!' }],
              })(<Input />)}
            </Form.Item> */}
            <Form.Item label="价格" >
              {getFieldDecorator('jiage', {
                rules: [{ required: true, message: '请输入订单数目!' }],
              })(<Input />)}
            </Form.Item>
            </Form>
          </Modal>
      );
    }
  }
  // 将通过props从父组件中获取的值拿出来设置到表单元素上
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
  })(OrderForm);