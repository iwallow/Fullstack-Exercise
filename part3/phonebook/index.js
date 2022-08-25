let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

const express = require('express')
const app = express()

// 将读取的body内容转换成JSON格式
app.use(express.json())

// 3.1 实现用get方法获取JSON的数据
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// 3.2 添加info的访问，返回数据个数和请求时间
app.get('/info', (request, response) => {
    response.send(`
        <p> Phonebook has info for ${persons.length} people</p>
        <p> ${new Date()} </p>
    `)
})

// 3.3 获取特定的id的数据，并实现id不存在时的报错
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

// 3.4 delete方法来删除指定的数据
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter( person => person.id !== id)
    response.status(204).end()
})


// 3.5 post方法来添加用户数据
app.post('/api/persons', (request, response) => {
    const body = request.body

    // 3.6 设置报错条件，没有名字或电话，以及姓名重复
    if(!body.name || !body.number || persons.find(person => person.name === body.name)){
        return response.status(404).json({
            error: 'name must be unique'
        })
    }
    const newPerson = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

// 3.1 监听端口的设置
const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})