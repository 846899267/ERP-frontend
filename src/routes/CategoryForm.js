import React from 'react';
import {Form,Modal,Input} from 'antd'

class CategoryForm extends React.Component {

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
    getFieldDecorator("id")

    return (
      <Modal
          visible={visible}
          title="添加服务类别"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="类别名称" >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入类别名称!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="说明" >
              {getFieldDecorator('shuoming', {
                rules: [{ required: true, message: '请输入说明!' }],
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
})(CategoryForm);