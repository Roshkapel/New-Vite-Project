import axios from 'axios';

export default  axios.create({
  baseURL:"http://localhost:3006/",
});

// const api = axios.create({
//   baseURL: "http://localhost:3006/",
// });

// // Add a request interceptor to add custom headers
// api.interceptors.request.use(
//   (config) => {
//     // Modify config.headers as needed
//     config.headers['Custom-Header'] = 'YourCustomHeaderValue';
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// export default api;