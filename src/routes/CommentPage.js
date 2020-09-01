import React from 'react';
import styles from './CommentPage.css'
import {Modal,Button,Table,message,Icon} from 'antd'
import axios from  '../utils/axios'
import CommentForm from './CommentForm'
//组件类必须继承React.Component
class CommentPage extends React.Component{
    constructor(){
        super();
        this.state={
            ids:[],
            list:[],
            loading:false,
            visible:false,
            comment:{}
        }
    }
    componentDidMount(){
        this.reloadData();
    }
    reloadData(){   //重载数据
        this.setState({loading:true});
        axios.get("/comment/findAll")
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
                axios.post("/comment/batchDelete",{ids:this.state.ids})
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
            content:'删除后数据将无法修复',
            onOk:()=>{
                axios.get("/comment/deleteCommentById",{
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
        axios.post("/comment/insertOrUpdate",values)
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
        this.setState({comment:{},visible:true})   // 将默认值置空,模态框打开
    }
    // 去更新
    toEdit(record){
        // 更前先先把要更新的数据设置到state中
        this.setState({comment:record})
        // 将record值绑定表单中
        this.setState({visible:true})
    }
    render(){
        let columns=[{
            title:'id',
            dataIndex:'id'
        },{
            title:'内容',
            width:400,
            dataIndex:'content'
        },{
            title:'评价时间',
            dataIndex:'commentTime',
            sorter:(a,b)=>a.commentTime-b.commentTime
        },{
            title:'订单号',
            dataIndex:'orderId'
        },
        {
            title:'操作',
            width:120,
            align:"center",
            render:(text,record)=>{
                return (
                    <div>
                        {/* <Button type ='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button> */}
                        {/* <Button type ='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button> */}
                        <Icon type="delete" theme="twoTone"  onClick={this.handleDelete.bind(this,record.id)}/>&nbsp;&nbsp;&nbsp;&nbsp;                        
                        <Icon type="edit" theme="twoTone" onClick={this.toEdit.bind(this,record)}/>
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
            <div className={styles.comment}>
                <div className ={styles.title}> 顾客评价管理</div>
                <div className ={styles.btns}>
                &nbsp;&nbsp;<Icon type="plus-circle" theme="twoTone" style={{ fontSize: '20px' }}  onClick={this.toAdd.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button>&nbsp;
                    <Button type="link">导出</Button>
                </div>
                <Table
                bordered
                rowKey="id"
                size="small"
                loading={this.state.loading }
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.list}/>

                <CommentForm 
                    initData={this.state.comment}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
            </div>
        )
    }
}

export default CommentPage;