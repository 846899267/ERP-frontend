import React from 'react';
import {Form,Modal,Input,message,Upload,Button,Icon} from 'antd';


class CustomerForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      waiters:[]
    }
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

    const upload_props={
      name:'file',
      action:'http://134.175.154.93:8099/manager/file/upload',
      onChange:(info)=> {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          //后端的回应信息
          let result = info.file.response;
          // 将上传成功后的图片id保存到表单中，点击提交的时候再随着表单提交提交到后台
          if(result.status=== 200){
            let photo = result.data.id;
            // 自行将photo设置到表单中
            this.props.form.setFieldsValue({
              photo
            });
          } else {
            message.error(result.message)
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    // 将表单中没有出现的值做一个双向数据绑定
    getFieldDecorator("id");
    getFieldDecorator("status");
    getFieldDecorator("photo");
    getFieldDecorator("idcard");
    return (
      <Modal
          visible={visible}
          title="顾客信息"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="姓名" >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="电话" >
              {getFieldDecorator('dianhua', {
                rules: [{ required: true, message: '请输入电话!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="说明" >
              {getFieldDecorator('shuoming', {
                rules: [{ required: true, message: '请输入说明!' }],
              })(<Input />)}
            </Form.Item>
            {/* <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(<Input.Password />)}
            </Form.Item> */}
            {/* <Form.Item label="照片">
              <Upload {...upload_props}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </Form.Item> */}
           
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
})(CustomerForm);