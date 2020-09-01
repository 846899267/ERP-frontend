import React from 'react';
// 引入css进行页面美化
import styles from './CustomerPage.css'
// 导入组件
import {Modal,Button, Table,message,Icon,Select} from 'antd'
import axios from '../utils/axios'
import AddressForm from './AddressForm'

const {Option}=Select



// 组件类必须要继承React.Component，是一个模块，顾客管理子功能
class AddressPage extends React.Component {
  // 局部状态state
  constructor(){
    super();
    this.state = {
      ids:[], // 批量删除的时候保存的id
      list:[],
      visible:false,
      customer:{}
    }
  }


  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  reloadData(){
    this.setState({loading:true});
    axios.get("/address/findAll")
    .then((result)=>{
      // 将查询数据更新到state中
      this.setState({list:result.data})
    })
    .finally(()=>{
      this.setState({loading:false});
    })
  }
  // 批量删除
  handleBatchDelete(){
    Modal.confirm({
      title: '确定删除这些记录吗?',
      content: '删除后数据将无法恢复',
      onOk:() => {
        axios.post("/address/batchDelete",{ids:this.state.ids})
        .then((result)=>{
          //批量删除后重载数据
          message.success(result.statusText)
          this.reloadData();
        })
      }
    });
  }

  // 单个删除
  handleDelete(id){
    Modal.confirm({
      title: '确定删除这条记录吗?',
      content: '删除后数据将无法恢复',
      onOk:() => {
        // 删除操作
        axios.get("/address/deleteById",{
          params:{
            id:id
          }
        })
        .then((result)=>{
          // 删除成功后提醒消息，并且重载数据
          message.success(result.statusText);
          this.reloadData();
        })
      }
    });
  }
  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.setState({ visible: false });
  };
  // 确认按钮的事件处理函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let obj={
        id:values.id,
        province:values.addr.shift(),
        city:values.addr.shift(),
        area:values.addr.shift(),
        address:values.address,
        telephone:values.telephone,
        customerId:values.customerId,
        
      }
      // 表单校验完成后与后台通信进行保存
      axios.post("/address/insertOrUpdate",obj)
      .then((result)=>{
        message.success(result.statusText)
        // 重置表单
        form.resetFields();
        // 关闭模态框
        this.setState({ visible: false });
        this.reloadData();
      })
      
    });
  };
  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  

  // 去添加
  toAdd(){
    // 将默认值置空,模态框打开
    this.setState({customer:{},visible:true})
  }
  // 去更新
  toEdit(record){
      
        const obj = {
          id: record.id,
          addr: [record.province, record.city, record.area],
          address: record.address,
          telephone: record.telephone,
          customerId:record.customerId
      }
      // 更前先先把要更新的数据设置到state中
      this.setState({customer:obj})
      // 将record值绑定表单中
      this.setState({visible:true})
  }

  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // 变量定义
    let columns = [{
      title:'省',
      dataIndex:'province'
    },{
      title:'市',
      dataIndex:'city'
    }
    ,{
        title:'地区',
        dataIndex:'area'
      },
      {
        title:'详细地址',
        dataIndex:'address'
      },
      {
      title:'电话',
      align:"center",
      dataIndex:'telephone'
    },{
      title:'顾客ID',
      dataIndex:'customerId'
    },{
      title:'操作',
      width:120,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            {/* <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
            <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button> */}
            <Icon type="delete" theme="twoTone"  onClick={this.handleDelete.bind(this,record.id)}/>&nbsp;&nbsp;&nbsp;&nbsp;                        
            <Icon type="edit" theme="twoTone" onClick={this.toEdit.bind(this,record)}/>
          </div>
        )
      }
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // 当用户操作复选按钮的时候，将值获取到并且保存到state中
        this.setState({
          ids:selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    
    // 返回结果 jsx(js + xml)
    return (
      <div className={styles.customer}>
        <div className={styles.title}>地址管理</div>
        <div className={styles.btns}>
          <Button onClick={this.toAdd.bind(this)} type='primary'> 添加</Button> &nbsp;
          <Button  type="danger" onClick={this.handleBatchDelete.bind(this)}>批量删除</Button> &nbsp;
          <Button type="link">导出</Button>
        </div>
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>

        <AddressForm
          initData={this.state.customer}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}

          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
    )
  }
}

export default AddressPage;