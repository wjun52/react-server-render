import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions  from '../store/actions/home';
import {Link} from 'react-router-dom';
import {Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Page from '../containers/Page';
import Header from '../components/header';
// import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
// import 'antd-mobile/lib/tabs/style/index.css'
import { Tabs } from 'antd';
import  '../assets/css/my.less'

const icon = require('../assets/img/2.jpg')
// const tabs = [
//   { title: <Badge text={'3'}>First Tab</Badge> },
//   { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
//   { title: <Badge dot>Third Tab</Badge> },
// ];
class Home extends Component{
  state={
    hasError:false,
  }
  // static getServerFetch(store) {
  //   return {}
  // }
  componentDidMount(){
    // this.props.getHomeInfo()
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // 在这里可以做异常的上报
    console.log('发送错误', error,info)
  }
  render(){
    let {add,count,homeInfo,homeInfo:{name,age}}=this.props;
    console.info(homeInfo)
    return (
      <div>
        <Header title="My Home" description="Home body" keywords="Home, acg" />
        <Page />
        <p>{count}</p>
        <p>名字：{name} - 年龄：{age}</p>
        <img src={icon}/>
        <button style={{backgroundColor:'#eee'}} onClick={()=>add(count+1)}>增加</button>
        <Link to='/user'>User</Link> <br />
        <Link to='/anime'>Anime</Link>
        {/* <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of third tab
          </div>
        </Tabs> */}
      </div>
    )
  }
}

const mapStateToProps=(state)=>({
  count: state.counter.count,
  homeInfo: state.homeInfo,
})

const mapDispatchToProps=(dispatch)=>bindActionCreators({
  add: actions.add,
  getHomeInfo: actions.getHomeInfo,
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Home)
