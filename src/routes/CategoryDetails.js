import React from 'react'
import {Button,Tabs,Table,message,Icon,Modal} from 'antd'
import axios from '../utils/axios';

class CategoryDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      category:{},
      products:[]
    }
  }

  componentDidMount(){
    let payload = this.props.location.payload;
    if(payload){
      this.setState({category:payload})
      this.loadProducts();
    } else {
      this.props.history.push("/product")
    }
  }
   //加载产品信息
   loadProducts(){
    axios.get("/category/findAllProductWithCategory",{
        params:{id:this.props.location.payload.id}
    }    
    )
    .then((result)=>{
      this.setState({
        products:result.data
      })
    })
  }


  render(){
    const { TabPane } = Tabs;
    
    function callback(key) {
      console.log(key);
    } 
    // const rowSelection = {
    //         onChange: (selectedRowKeys, selectedRows) => {
    //           this.setState({
    //               ids:selectedRowKeys
    //           })
    //         },
    //         getCheckboxProps: record => ({
    //           disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //           name: record.name,
    //         }),
    //       };

          //顾客的订单信息
          let columns=[{
            title:'物资ID',
            dataIndex:'id'
        },{
            title:'物资名称',
            dataIndex:'name'
        },{
            title:'描述',
            dataIndex:'description'
        },{
            title:'价格',
            dataIndex:'price'
         }
       ,{
        title:'库存',
        dataIndex:'kucun'
     },{
      title:'种类',
      dataIndex:'zhonglei'
   }
        //  ,{
        //     title:'图片',
        //     dataIndex:'photo',
        //     render(text){
        //         return (
        //         <img alt="未找到..." width={35} height={35} src={"http://134.175.154.93:8888/group1/"+text}/>
        //     )
        //     }
        //}
        // ,{
        //   title:'供应商',
        //   dataIndex:'gongyingshang'
        // },{
        //   title:'库存',
        //   dataIndex:'kucun'
        // }
      ]

    return (
      <div>
        <Button type="link" onClick={()=>{this.props.history.goBack()}}><Icon type="rollback" /></Button>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="该种类下的物资产品" key="1">
            <div>
                <Table
                rowKey="orderId"
                size="small"
                loading={this.state.loading }
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.products}/>
            </div>
          </TabPane>
        </Tabs>
        
      </div>
    )
  }
}

export default CategoryDetails;