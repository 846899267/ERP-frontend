import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Carousel } from 'antd';
// 首页
function IndexPage() {
  return (
    <div className={styles.normal}>
      {/* <h1 className={styles.title}>hey!</h1> */}
      <h3 className={styles.title}>欢迎进入电力工程物资管理系统</h3>
      <Carousel autoplay >
    <div>
    <div className={styles.welcome1} />
    </div>
    <div>
    <div className={styles.welcome2} />
    </div>
    <div>
    <div className={styles.welcome3} />
    </div>
    <div>
    <div className={styles.welcome4} />
    </div>
    
  </Carousel>
      
      {/* <div className={styles.welcome} /> */}
      <ul className={styles.list}>
        {/* <li>To get started, edit <code>src/index.js</code> and save to reload.</li> */}
        {/* <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li> */}
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
