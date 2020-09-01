import React from 'react';
import {Form,Modal,Input} from 'antd'

class CommentForm extends React.Component {

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
    // 双向数据绑定
    getFieldDecorator("id");
    return (
      <Modal
          visible={visible}
          title="添加订单评价记录"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="订单号" >
              {getFieldDecorator('id', {
                rules: [{ required: true, message: '请输入订单号!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="种类名称" >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入内容!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="说明" >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入内容!' }],
              })(<Input />)}
            </Form.Item>
           
           
          </Form>
        </Modal>
    );
  }
}
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
})(CommentForm);