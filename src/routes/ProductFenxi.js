import React from 'react';
import styles from './ProductPage.css'
import { Modal, Button, Table, message, Icon, Input } from 'antd'
import axios from '../utils/axios'
import ProductForm from './ProductForm.js'
const Search = Input.Search;
// 组件类必须要继承React.Component
class ProductFenxi extends React.Component {
  // 局部状态state
  constructor() {
    super();
    this.state = {
      ids: [], // 批量删除的时候保存的id
      list: [],
      loading: true,
      visible: false,
      product: {},
      yuyuqi:[],
    }
  }
  componentDidMount() {
    this.reloadData();
  }


  // 重载数据
  reloadData() {
    this.setState({ loading: true });
    axios.get("/product/findAll")
      .then((result) => {
        // 将查询数据更新到state中
        this.setState({ list: result.data })
      })
      .finally(() => {
        this.setState({ loading: false });
      })
  }
  // 批量删除
  handleBatchDelete(value) {
    Modal.confirm({
      title: '确定分析这些物资吗?',
      content: '分析后数据将在分析处显示',
      onOk: () => {
        axios.post("/product/fenxi", { ids: this.state.ids,yuqi:value})
          .then((result) => {
            message.success(result.statusText)
            this.reloadData();
          })
      }
    });

  }

  // 单个删除
  handleDelete(id) {
    Modal.confirm({
      title: '确定删除这条记录吗?',
      content: '删除后数据将无法恢复',
      onOk: () => {
        axios.get("/product/deleteProductById", {
          params: {
            id: id
          }
        })
          .then((result) => {
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
      alert(JSON.stringify(values));
      // 表单校验
      axios.post("/product/insertOrUpdate", values)
        .then((result) => {
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
  //添加
  toAdd() {
    this.setState({ product: {}, visible: true })
  }
  //更新
  toEdit(record) {
    this.setState({ product: record })
    this.setState({ visible: true })
  }

  //模糊查询
  handleSearch = (value) => {
  console.log(value)
    if(value==''||value==null||value==undefined){
      this.reloadData()
    }else{
    axios.post('product/findCha',{ yuqi:value} )
      .then((result) => {
        
        if (200 === result.status) 
          {
            // let temp = [];
            
            
            // if(result.data!=undefined)
            // {
            //   console.log(1)
              
            // }temp.push(result.data)
            this.setState({ list: result.data })

          }
      })
    }
  }




  // 页面渲染
  render() {
    let columns = [{
      title: '序号',
      dataIndex: 'id'
    }, {
      title: '名称',
      dataIndex: 'name'
    }, 
    {
      title: '描述',
      dataIndex: 'description'
    }
    , {
      title: '供应商',
      dataIndex: 'gongyingshang'
    },
    
    {
      title: '价格',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price
     } 
    // , {
    //   title: '状态',
    //   dataIndex: 'status'
    // }, {
    //   title: '具体图片',
    //   align: "center",
    //   dataIndex: 'photo',
    //   render(text) {
    //     return (
    //       <img width={40} height={40} src={"http://134.175.154.93:8888/group1/" + text} />
    //     )
    //   }
    
    ,{
      title:'库存',
      dataIndex:'kucun'
    },{
      title:'种类',
      dataIndex:'zhonglei'
    }
    // , {
    //   title: '所属类别',
    //   align: "center",
    //   dataIndex: 'cid',
    // }
    , {
      title: '预期',
      dataIndex: 'yuqi'
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // 当用户操作复选按钮的时候，将值获取到并且保存到state中
        this.setState({
          ids: selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    let dom = (
      <div>
        <div className={styles.title}>物资产品分析</div>
        <div className={styles.btns}>
          {/* <Button  onClick={this.toAdd.bind(this)} type="primary">添加</Button> &nbsp;
          <Button  onClick={this.handleBatchDelete.bind(this)} type="danger">批量删除</Button> &nbsp; */}
         {/* // <Button type="link">导出</Button> */}
          <Search 
            placeholder="输入需求数目"
            
            onSearch={value => this.handleBatchDelete(value)}
            
            style={{ width: 200,  float:'right' }}
          />
        </div>

      </div>
    )


    return (
      <div className={styles.product}>

        <Table
          title={() => dom}
          rowKey="id"
          size="small"
          bordered
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list} />

        <ProductForm
          initData={this.state.product}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate} />

      </div>
    )
  }
}

export default ProductFenxi;