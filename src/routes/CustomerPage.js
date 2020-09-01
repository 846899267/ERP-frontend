import React from 'react';
import styles from './CustomerPage.css'
import {Modal,Button,Table,message,Icon,Input} from 'antd'
import axios from  '../utils/axios'
import CustomerForm from './CustomerForm.js'
const Search = Input.Search;

//组件类必须继承React.Component
class CustomerPage extends React.Component{
    constructor(){
        super();
        this.state={
            ids:[],
            list:[],
            loading:false,
            visible:false,
            customer:{}
        }
    }
    componentDidMount(){
        this.reloadData();
    }
    reloadData(){   //重载数据
        this.setState({loading:true});
        axios.get("/customer/findAll")
        .then((result)=>{
            this.setState({list:result.data})
        })
        .finally(()=>{
            this.setState({loading:false});
        })
    }
    //批量删除
    handleBatchDelete(){
        Modal.confirm({
            title:'确定要删除这些记录吗？',
            content:'删除后数据将无法恢复',
            onOk:()=>{
                axios.post("/customer/batchDelete",{ids:this.state.ids})
                .then((result)=>{
                    message.success(result.statusText);
                    this.reloadData();
                })
            }
        });
    }
    //单个删除
    handleDelete(id){
        Modal.confirm({
            title:'确定要删除这条记录吗？',
            content:'删除后数据将无法恢复',
            onOk:()=>{
                axios.get("/customer/deleteCustomerById",{
                    params:{
                        id:id
                    }
                })
                .then((result)=>{
                    message.success(result.statusText);
                    this.reloadData();
                })
            }
        });
    }
    // 取消按钮
    handleCancel = () => {
        this.setState({ visible: false });
    };
    // 确认按钮
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }
       
        // 表单校验
        axios.post("/customer/insertOrUpdate",values)
        .then((result)=>{
            message.success(result.statusText)
            form.resetFields();
            this.setState({ visible: false });
            this.reloadData();
        })
        
        });
    };
    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    // 添加
    toAdd(){
        this.setState({customer:{},visible:true})  
    }
    // 更新
    toEdit(record){
        this.setState({customer:record})
        this.setState({visible:true})
    }
    toDetails(record){
        console.log(record);
        //跳转 react-router
        this.props.history.push({
          pathname:"/customerDetails",
          payload:record
        })
    }


     //模糊查询
  handleSearch = (value) => {
    console.log(value)
      if(value==''||value==null||value==undefined){
        this.reloadData()
      }
      axios.get('customer/findCustomerById', { params: { id: value } })
        .then((result) => {
          
          if (200 === result.status) {
            let temp = [];
            if(result.data!=undefined){
              console.log(1)
              temp.push(result.data)
            }
            
        
            this.setState({ list: temp })
  
          }
        })
    }


    render(){
        let columns=[{
            title:'id',
            dataIndex:'id'
        },{
            title:'姓名',
            dataIndex:'name'
        },{
            title:'电话',
            dataIndex:'dianhua'
        },{
            title:'说明',
            dataIndex:'shuoming'
        }
        // ,{
        //     title:'状态',
        //     dataIndex:'status'
        // }
     //,{
    //         title:'头像',
    //         align:"center",
    //         dataIndex:'photo',
    //         render(text){
    //             return (
    //             <img width={35} height={35} src={"http://134.175.154.93:8888/group1/"+text}/>
    //         )
    //   }
    //    },
        ,{
            title:'操作',
            width:150,
            align:"center",
            render:(text,record)=>{
                return (
                    <div>
                        {/* <Button type ='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
                        <Button type ='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button> */}
                        <Icon type="delete" theme="twoTone"  onClick={this.handleDelete.bind(this,record.id)}/>&nbsp;&nbsp;&nbsp;&nbsp;                        
                        <Icon type="edit" theme="twoTone" onClick={this.toEdit.bind(this,record)}/>&nbsp;&nbsp;
                        <Button type='link' size="small" onClick={this.toDetails.bind(this,record)}>详情</Button>
                    </div>
                )
            }
        }]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                  ids:selectedRowKeys
              })
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };

        return (
            <div className={styles.customer}>
                <div className ={styles.title}> 顾客管理</div>
                <div className ={styles.btns}>
                    <Button onClick={this.toAdd.bind(this)} type='primary'>添加</Button>&nbsp;
                    <Button onClick={this.handleBatchDelete.bind(this)} type='danger'>批量删除</Button>&nbsp;
                    <Button type="link">导出</Button>
                    <Search 
                       placeholder="顾客ID查询"
            
                       onSearch={value => this.handleSearch(value)}
            
                       style={{ width: 200,  float:'right' }}
                     />
                </div>
                <Table
                bordered
                rowKey="id"
                size="small"
                loading={this.state.loading }
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.list}/>

                <CustomerForm 
                    initData={this.state.customer}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
            </div>
        )
    }
}

export default CustomerPage;