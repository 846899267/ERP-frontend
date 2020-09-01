import React from 'react'
import {Button,Tabs,Table,Icon} from 'antd'
import axios from '../utils/axios';
import OrderForm from './OrderForm.js'

class OrderDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      order:{},
      orderLine:[]
      
    }
  }

  componentDidMount(){
    let payload = this.props.location.payload;
    if(payload){
      this.setState({order:payload})
      
      this.loadOrders();
    } else {
      this.props.history.push("/order")
    }
  }
 
   //加载订单信息
   loadOrders(){
    axios.get("product/findProductById",{///order_line/findOrderDetails
      params:{id:this.props.location.payload.cid}
    })
    .then((result)=>{
      this.setState({
        orderLine:result.data
      })
    })
  }



  render(){
    const { TabPane } = Tabs;
    let columns = [{
      title:'产品名称',
      dataIndex:'name',
    
    },{
      title:'下单时间',
      dataIndex:'order_time'
    },{
      title:'产品数量',
      dataIndex:'total'
    },{
      title:'产品描述',
      dataIndex:'description'
    },{
      title:'产品单价',
      dataIndex:'price'
    },{
      title:'产品图片',
      dataIndex:'photo',
      render(text){
        return (
        <img alt="未找到..." width={35} height={35} src={"http://134.175.154.93:8888/group1/"+text}/>
    )
    }
    }]
    function callback(key) {
      console.log(key);
    }
    

    return (
      <div>
        <Button type="link" onClick={()=>{this.props.history.goBack()}}><Icon type="rollback" /></Button>
        <Tabs defaultActiveKey="1" onChange={callback}>
          
          <TabPane tab="订单项" key="1">
          
          </TabPane>
        
          
        </Tabs>
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.orderLine}
         />
          
        
      </div>
    )
  }
}

export default OrderDetails;