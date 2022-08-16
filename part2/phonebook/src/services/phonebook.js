// 2.16 将与后端通信的方法都汇总到一个单独的模块当中
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

// 2.18 添加了与后端通信的更新方法
const update = (id, newObject) => {
    const url = `${baseUrl}/${id}`
    return axios.put(url, newObject).then(response => response.data)
}

// 2.17 添加了与后端通信的删除方法
const deleteItem = id => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
}

export default { getAll, create, update, deleteItem }