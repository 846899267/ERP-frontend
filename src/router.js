import React from 'react';
import { Router, Route, Switch ,Link} from 'dva/router';
import IndexPage from './routes/IndexPage';
import CustomerPage from './routes/CustomerPage';
import OrderPage from './routes/OrderPage';
import CommentPage from './routes/CommentPage';
import ProductPage from './routes/ProductPage';
import WaiterPage from './routes/WaiterPage';
import CategoryPage from './routes/CategoryPage';
import AddressPage from './routes/AddressPage';
import styles from './router.css';
import OrderLinePage from './routes/OrderLinePage';
import {Layout,Menu,Breadcrumb,Icon, Button}from 'antd' 
import CustomerDetails from './routes/CustomerDetails'
import WaiterDetails from './routes/WaiterDetails'
import  OrderDetails from './routes/OrderDetails'
import  CategoryDetails from './routes/CategoryDetails'
import Permission from './permission'
//import login from './routes/login'
//import login from './pages/login/index'
import  bar from './echarts/bar'
import  ProductFenxi from './routes/ProductFenxi'
import { Avatar } from 'antd';

function RouterConfig({ history }) {
  const {Content,Sider,Header}=Layout;
  const {SubMenu}=Menu;
  return (
<Router history={history}>
        <Layout>
          <Header className="header" style={{background:'#276A85'}}>
            <div  className="logo" style={{color:"#FFFFFF",fontWeight:"bold",fontSize:"30px",fontFamily:"华文彩云"}}>
            <a  style={{color:"#FFFFFF",fontWeight:"bold",fontSize:"30px",fontFamily:"华文彩云"}}>电力工程物资管理系统</a> 
           
            <Button style={{float:"right" }} type='danger' onClick={()=>{window.location.href="http://bishhe.com/login.html"}}>退出</Button>
           
            </div>
            
          </Header>
          <Layout>
            <Sider width={150} style={{ background: '#C7C7E2' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['sub1']}                         //#FFCBB3         
                style={{ height: '100%', borderRight: 0,background: "#276A85",color:'#700D4F' }} //#FF0000 //#700D4F //#00EC00
              >
                {/* <Menu.Item key="1" >
                  <Link to="/customer">
                    <Icon type="user" />
                    <span>  
                      
                      顾客管理
                    </span>
                  </Link>
                </Menu.Item> */}
                <Menu.Item key="2" >
                  <Link to="/product">
                    <Icon type="skin" />
                    <span>
                      物资管理
                    </span>
                  </Link>
                </Menu.Item>
                
                <Menu.Item key="3" >
                  <Link to="/ProductFenxi">
                    <Icon type="skin" />
                    <span>
                      物资分析
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/order">
                    <Icon type="desktop" />
                    <span>
                      合同及维护管理
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/Category">
                  <Icon type="apartment" />
                    <span>
                      物资种类管理
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/waiter">
                    <Icon type="pie-chart" />
                    <span>
                      供应商管理
                    </span>
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="6">
                  <Link to="/address">
                    <Icon type="compass" />
                    <span>
                      地址管理
                    </span>
                  </Link>
                </Menu.Item> */}
                <Menu.Item key="7">
                  <Link to="/echarts/bar">
                    <Icon type="compass" />
                    <span>
                      数据图表
                    </span>
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="7">
                  <Link to="/permission">
                    <Icon type="compass" />
                    <span>
                      权限管理
                    </span>
                  </Link>
                </Menu.Item> */}
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              {/* <Breadcrumb style={{ margin: '10px 0',color:"#00DB00" }}></Breadcrumb>
              <Breadcrumb>
                <Breadcrumb.Item><a href="/#/">主页</a></Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="#/customer">顾客管理</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="#/product">产品管理</a>
                </Breadcrumb.Item>
             
              </Breadcrumb> */}






              {/*  */}
                    {/* <div class="crumbs">
                  <el-breadcrumb separator="/">
                {/* <el-breadcrumb-item :to="{path:'/main/home'}">首页</el-breadcrumb-item> */}
                {/* <el-breadcrumb-item><a href="/#/">首页/</a></el-breadcrumb-item>
                <el-breadcrumb-item><a href="/#/customer">人员管理/</a></el-breadcrumb-item>

                </el-breadcrumb> */}

                    {/* </div> */} 
          


                {/* // <Breadcrumb.Item>Home</Breadcrumb.Item>
                // <Breadcrumb.Item>List</Breadcrumb.Item>
                // <Breadcrumb.Item>App</Breadcrumb.Item> */}
                
              {/* </Breadcrumb> */}
              <Content
                style={{
                  background: '#D1E9E9',
                  margin: 0,
                  padding:'1em',
                  minHeight: 580,
                }}
              >
                <Switch>
                  <Route path="/" exact component={IndexPage} />
                  <Route path="/orderLine" exact component={OrderLinePage} />
                  <Route path="/customer" exact component={CustomerPage} />
                  <Route path="/order" exact component={OrderPage} />
                  <Route path="/customerDetails" exact component={CustomerDetails} /> 
                  <Route path="/Category" exact component={CategoryPage}/>
                  <Route path="/waiter" exact component={WaiterPage}/>
                  <Route path="/waiterDetails" exact component={WaiterDetails}/>
                  <Route path="/orderDetails"  exact component={OrderDetails}/>
                  <Route path="/categoryDetails"  exact component={CategoryDetails}/>
                  <Route path="/product"  exact component={ProductPage}/>
                  <Route path="/address"  exact component={AddressPage}/>
                  <Route path="/echarts/bar"  exact component={bar}/>
                  <Route path="/permission"  exact component={Permission} />
                  <Route path="/ProductFenxi"  exact component={ProductFenxi} />
                  {/* <Route path="/login"  exact component={login}/> */}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>

  );
}

export default RouterConfig;


