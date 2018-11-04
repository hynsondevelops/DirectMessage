let axios = require('axios');

console.log(process.env.NODE_ENV)
let axiosClient = axios.create({
	baseUrl: process.env.NODE_ENV == "development" ? "http://localhost:3000/" : 'PRODUCTION_URL'
});
export default axiosClient;