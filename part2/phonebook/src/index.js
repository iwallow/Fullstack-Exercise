import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import axios from 'axios'

// 2.11 引入了json-server，并在index.js中向数据服务器请求persons数据
// （没有使用Effect Hook）

// axios.get("http://localhost:3001/persons").then( response => {
//     const data = response.data
//     ReactDOM.createRoot(document.getElementById('root')).render(<App data={data}/>)
// })

ReactDOM.createRoot(document.getElementById('root')).render(<App />)


