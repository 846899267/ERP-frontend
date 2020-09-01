import React from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
//import echartTheme from '../echartTheme'
// import echarts from 'echarts'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import axios from '../../utils/axios'
export default class Bar extends React.Component {

 
    constructor() {
        super();
        this.state = {
          ids: [], // 批量删除的时候保存的id
          list: [],
          jiaoliu:null,
          zhiliu:null,
          jueyuan:null,
          loading: true,
          visible: false,
          product: {},
          data:[],
         // item:[]
        }
      }
    // componentWillMount(){
    //     echarts.registerTheme('Imooc',echartTheme);
    // }
    componentWillMount() {
        this.reloadData();
        this.reloadData2();
        this.reloadData3();
        this.reloadData4();
        this.reloadData5();
       
      }
    
    
      // 重载数据
      reloadData() {
        this.setState({ loading: true });
        axios.get("/product/findName")
          .then((result) => {
            // 将查询数据更新到state中
            this.setState({ list:result.data });
         //   console.log(this.list);
          })
          .finally(() => {
            this.setState({ loading: false });
          })

        
      }
      reloadData2(){
      axios.get("/product/findKucun")
      .then((result) => {
        // 将查询数据更新到state中
        this.setState({ data:result.data });
      // console.log(this.data);
      })
      .finally(() => {
        this.setState({ loading: false });
      })}

      reloadData3() {
        this.setState({ loading: true });
        axios.get("/product/findjiaoliu")
          .then((result) => {
            // 将查询数据更新到state中
            this.setState({ jiaoliu:result.data });
            //console.log(this.list);
          })
          .finally(() => {
            this.setState({ loading: false });
          })}

          reloadData4() {
            this.setState({ loading: true });
            axios.get("/product/findzhiliu")
              .then((result) => {
                // 将查询数据更新到state中
                this.setState({ zhiliu:result.data });
                //console.log(this.list);
              })
              .finally(() => {
                this.setState({ loading: false });
              })}

              
          reloadData5() {
            this.setState({ loading: true });
            axios.get("/product/findjueyuan")
              .then((result) => {
                // 将查询数据更新到state中
                this.setState({ jueyuan:result.data });
                console.log(this.jueyuan);
              })
              .finally(() => {
                this.setState({ loading: false });
              })}

    getOption(){
        let option = {
            title: {
                text: '物资库存'
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis: {
                data: this.state.list
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                  
                    data: this.state.data
                }
            ]
        }
        return option;
    }

    getOption2(){
        let option = {
            title: {
                text: '部分物资变化'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:['直流电缆','交流电缆','绝缘层']
            },
            xAxis: {
                data: [
                    '三周前',
                    '二周前',
                    '一周前',
                  
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '交流电缆',
                    type: 'bar',
                    data: [
                        this.state.jiaoliu-20,
                        this.state.jiaoliu-10,
                        this.state.jiaoliu-0,
                    ]
                },
                {
                    name: '绝缘层',
                    type: 'bar',
                    data: [
                        this.state.zhiliu-25,
                        this.state.zhiliu-15,
                        this.state.zhiliu-0
                    ]
                },
                {
                    name: '直流电缆',
                    type: 'bar',
                    data: [
                        this.state.jueyuan-15,
                        this.state.jueyuan-10,
                        this.state.jueyuan-0
                    ]
                },
            ]
        }
        return option;
    }

    getOption3() {
      let option = {
          title: {
              text: '物资库存',
              x : 'center'
          },
          legend : {
              orient: 'vertical',
              right: 10,
              top: 20,
              bottom: 20,
              
              data: this.state.list,
          },
          tooltip: {
              trigger : 'item',
              formatter : "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
              {
                  name : '物资库存',
                  type : 'pie',
                  radius : '55%',
                  center : [
                      '50%', '60%'
                  ],
                  data:[
                      {
                          value:this.state.data.slice(0,1),
                          name:this.state.list.slice(0,1), 
                      },
                      {
                        value:this.state.data.slice(1,2),
                        name:this.state.list.slice(1,2), 
                      },
                      {
                        value:this.state.data.slice(2,3),
                        name:this.state.list.slice(2,3), 
                      },
                      {
                        value:this.state.data.slice(3,4),
                        name:this.state.list.slice(3,4), 
                      },
                      {
                        value:this.state.data.slice(4,5),
                        name:this.state.list.slice(4,5),                     },
                      {
                        value:this.state.data.slice(5,6),
                        name:this.state.list.slice(5,6),
                      },
                      {
                        value:this.state.data.slice(6,7),
                        name:this.state.list.slice(0,1),
                      },
                  ],
                  itemStyle : {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      }
      return option;
  }


    render(){
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption()} theme="Imooc" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
                <Card title="饼形图之1" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption3()}
                        // theme="Imooc"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 500 }}/>
                </Card>
            </div> 
        );
    }
}