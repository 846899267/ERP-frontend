import React from 'react';
import {Form,Modal,Input,message,Upload,Button,Icon,Select} from 'antd'
import  axios from '../utils/axios'

class ProductForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      categories:[]
    }
  }
  //加载栏目信息
  loadCategories(){
    axios.get("/category/findAll")
    .then((result)=>{
      this.setState({categories:result.data})
    })
  }
  componentDidMount(){
     //在渲染表单前查找到栏目信息
     this.loadCategories();
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

    const upload_props =  {
      name: 'file',
      action: 'http://134.175.154.93:8099/manager/file/upload',
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

    // 双向数据绑定
    getFieldDecorator("id");
    getFieldDecorator("photo");
    getFieldDecorator("status");
    return (
      <Modal
          visible={visible}
          title="产品信息"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="名称" >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入产品名称!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="描述" >
              {getFieldDecorator('description', {
                rules: [{ required: true, message: '请输入物资描述!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="价格">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: '请输入物资价格!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="供应商">
              {getFieldDecorator('gongyingshang', {
                rules: [{ required: true, message: '请输入物资供应商!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="库存">
              {getFieldDecorator('kucun', {
                rules: [{ required: true, message: '请输入物资库存!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="所属类别">
              {getFieldDecorator('cid', {
                rules: [{ required: true, message: '请输入物资所属类别!' }],
              })(<Select>
                {
                  this.state.categories.map((item)=>{
                    return <Select.Option value={item.id}>{item.name}</Select.Option>
                  })
                }
              </Select>
              )}
            </Form.Item>
            {/* <Form.Item label="产品图片">
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
})(ProductForm);