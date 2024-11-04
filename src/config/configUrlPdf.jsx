import axios from 'axios';

const baseURLPDF = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    // 'Accept-Encoding': 'gzip, deflate, br',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  },
  responseType: 'blob'
});

export default baseURLPDF;