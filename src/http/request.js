import axios from 'axios';
import { inject } from './index.js';
//import config from '../../config';

const service = axios.create({
 // baseURL: config.unionService, // api的base_url
  timeout: 20000 // 请求超时时间
});

inject(service);

export default service;