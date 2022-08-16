// 2.16 将与后端通信的方法都汇总到一个单独的模块当中
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject =>{
    return axios.post(baseUrl, newObject).then(response => response.data)
}

export default { getAll, create }