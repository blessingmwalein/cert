import Axios from "axios";

let urls = {
    test: `http://apis.us-east-2.elasticbeanstalk.com/api/`,
    development: 'http://apis.us-east-2.elasticbeanstalk.com/api/',
    production: 'http://apis.us-east-2.elasticbeanstalk.com/api/'
}
const axios = Axios.create({
    baseURL: urls.development,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axios;