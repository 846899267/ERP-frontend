import React from 'react';
// 引入css进行页面美化
import styles from './WaiterPage.css'
// 导入组件
import {Modal,Button, Table,message,Icon,Input} from 'antd'
import axios from '../utils/axios'

import WaiterForm from './WaiterForm'

const Search = Input.Search;

// 组件类必须要继承React.Component，是一个模块，服务员管理子功能
class WaiterPage extends React.Component {
  // 局部状态state
  constructor(){
    super();
    this.state = {
      ids:[], // 批量删除的时候保存的id
      list:[],
      loading:false,
      visible:false,
      waiter:{}
    }
  }
  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  reloadData(){
    this.setState({loading:true});
    axios.get("/waiter/findAll")
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
        axios.post("/waiter/batchDelete",{ids:this.state.ids})
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
        axios.get("/waiter/deleteWaiterById",{
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
      axios.post("/waiter/insertOrUpdate",values)
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
    this.setState({waiter:{},visible:true})
  }
  // 去更新
  toEdit(record){
    // 更前先先把要更新的数据设置到state中
    this.setState({waiter:record})
    // 将record值绑定表单中
    this.setState({visible:true})
  }
  toDetails(record){
    console.log(record);
        //跳转 react-router
        this.props.history.push({
          pathname:"/waiterDetails",
          payload:record
        })
  }


  //模糊查询
  handleSearch = (value) => {
    console.log(value)
    if(value==''||value==null||value==undefined){
      this.reloadData()
    }
    axios.post('waiter/query', { name:value} )
      .then((result) => {

        if (200 === result.status) {
          let temp = [];
          if(result.data!=undefined){
            console.log(1)
            temp.push(result.data)
          }


          this.setState({ list: result.data })

        }
      })
  }

  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // 变量定义
    let columns = [{
      title:'id',
      dataIndex:'id'
    },{
      title:'名字',
      dataIndex:'name'
    },{
      title:'电话',
      dataIndex:'dianhua'
    }
    ,{
      title:'说明',
      dataIndex:'shuoming'
    }
    // ,{
    //   title:'状态',
    //   align:"center",
    //   dataIndex:'status'
    // }
    // ,{
    //   title:'照片',
    //   align:"center",
    //   dataIndex:'photo',
    //   render(text){
    //         return (
    //         <img width={35} height={35} src={"http://134.175.154.93:8888/group1/"+text}/>
    //     )
    // }
    // }
    ,{
      title:'操作',
      width:150,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            {/* <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
            <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button> */}
            {/* <Icon disabled="true" type="delete" theme="twoTone"  onClick={this.handleDelete.bind(this,record.id)}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon disabled="true" type="edit" theme="twoTone" onClick={this.toEdit.bind(this,record)}/>&nbsp;&nbsp;   */}
            <Button  type='link' size="small" onClick={this.handleDelete.bind(this, record.id)}><Icon type="delete" /></Button>
            <Button  type='link' size="small" onClick={this.toEdit.bind(this, record)}><Icon type="edit" /></Button>

            <Button  type='link' size="small" onClick={this.toDetails.bind(this,record)}>详情</Button>
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
      <div className={styles.waiter}>
        <div className={styles.title}>供应商管理</div>
        <div className={styles.btns}>
          <Button disabled="true" onClick={this.toAdd.bind(this)} type="primary">添加</Button> &nbsp;
          <Button disabled="true" onClick={this.handleBatchDelete.bind(this)} type="danger">批量删除</Button> &nbsp;
          {/* <Button type="link">导出</Button> */}
          <Search
            placeholder="供应商查询"

            onSearch={value => this.handleSearch(value)}

            style={{ width: 200,  float:'right' }}
          />
        </div>
        <Table
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>

        <WaiterForm
          initData={this.state.waiter}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
    )
  }
}

export default WaiterPage;
