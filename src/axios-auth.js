import axios from 'axios'

const authAxios = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/'
})
//instance.defaults.headers.common['SOMETHING'] = 'something'
//instance.defaults.headers.post['Content-Type'] = 'application/json';
export default authAxios