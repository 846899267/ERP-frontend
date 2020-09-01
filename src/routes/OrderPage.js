import React from 'react';
// 引入css进行页面美化
import styles from './OrderPage.css'

// 导入组件
import {Modal,Button, Table,message,Icon} from 'antd'
import axios from '../utils/axios'
import OrderForm from './OrderForm.js'


// 组件类必须要继承React.Component，是一个模块，顾客管理子功能
class OrderPage extends React.Component {
  // 局部状态state
  constructor(){
    super();
    this.state = {
      ids:[], // 批量删除的时候保存的id
      list:[],
      loading:false,
      visible:false,
      order:{}
    
    }
  }
  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  
  reloadData(){
    this.setState({loading:true});
    axios.get("/order/findAll")
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
        axios.post("/order/batchDelete",{ids:this.state.ids})
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
        axios.get("/order/deleteById",{
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
      // 表单校验完成后与后台通信进行保存
      axios.post("/order/saveOrupdate",values)
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
    this.setState({order:{},visible:true})
  }
  // 去更新
  toEdit(record){
    // 更新前先把要更新的数据设置到state中
    this.setState({order:record})
    // 将record值绑定表单中
    this.setState({visible:true})
    
  }


  toDetails(record){
    console.log(record);
    //跳转 react-router
    this.props.history.push({
      pathname:"/orderDetails",
      payload:record
    })
  }

  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // 变量定义
    let columns = [
      {
        title:'序号',
        width:80,
        dataIndex:'id'
      }
      ,{
        title:'物资名称',
        dataIndex:'iname'
      }
      ,{
        title:'供应商名称',
        dataIndex:'gname'
      }
      ,{
        title:'数量',
        dataIndex:'shuliang'
      }
      ,{
        title:'说明',
        dataIndex:'shuoming'
      }
      ,{
      title:'时间',
      dataIndex:'riqi',
      sorter:(a,b)=>a.orderTime-b.orderTime
    },{
      title:'价格',
      dataIndex:'jiage'
    },{
      title:'操作',
      width:150,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
             <Icon type="delete" theme="twoTone"  onClick={this.handleDelete.bind(this,record.id)}/>&nbsp;&nbsp;&nbsp;&nbsp;                        
                        <Icon type="edit" theme="twoTone" onClick={this.toEdit.bind(this,record)}/>
            {/* <Button type='link' size="small" onClick={this.toDetails.bind(this,record)}>详情</Button> */}
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
      <div className={styles.order}>
        <div className={styles.title}>合同及维护管理</div>
        <div className={styles.btns}>
          <Button onClick={this.toAdd.bind(this)} type="primary">添加</Button> &nbsp;
          <Button onClick={this.handleBatchDelete.bind(this)} type="danger">批量删除</Button> &nbsp;
          {/* <Button type="link">导出</Button> */}
        </div>
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>

        <OrderForm
          initData={this.state.order}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
    )
  }
}

export default OrderPage;
