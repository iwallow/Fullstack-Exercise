import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

// 2.10 创建组件Filter，PersonForm，Persons
// 创建组件来分离不同功能标签
const Filter = ({value, onChange}) => (
  <div>
    filter shown with<input value={value} onChange={onChange}/>
  </div>
)

const PersonForm = (props) => {
  return(
    <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.name} onChange={props.nameChange}/>
        </div>
        <div>
          {/* 2.8 增加了添加电话号码的功能 */}
          number: <input value={props.number} onChange={props.numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({listToShow, deletePhoneNumber}) => (
  // 2.17 添加了删除的按钮，并用处理器deletePhoneNumber方法处理
  listToShow.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => deletePhoneNumber(person.id)}>delete</button></p>)
)


// 2.10 在App根组件中维护应用的状态和所有事件处理程序

// 2.6 实现表单与触发器的链接
// 完成了在输入框输入数据，submit输入的数据和显示数据的功能
const App = () => {
  
  // 2.11 通过访问json-server的方式获取数据 (没有使用Effect Hook)
  // const [persons, setPersons] = useState(data)

  // 2.11 使用Effect Hook的方式获取JSON数据
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
 
  useEffect(() => {
    // 2.16 调用与后端通信的方法  
    phonebookService.getAll().then(initialData => {
      setPersons(initialData)
    })
  }, [])

  const addPhoneNumber = (event) =>{
    event.preventDefault()

    const newPerson = { name: newName , number: newNumber}
    const sameName = persons.filter( person => person.name === newPerson.name)
    
    // 2.18 相同姓名的情况下，替换电话号码的功能
    if(JSON.stringify(sameName) !== '[]'){
      window.confirm(`replace ??`) &&
      phonebookService.update(sameName[0].id, newPerson).then(
        newItem => {
          setPersons(persons.map(item => item.id !== sameName[0].id? item : newItem))
          setNewName('')
          setNewNumber('')
        }
      )
    }else{

      // 2.15 将添加的元素上传到服务器端（json文件）
      // 2.16 调用与后端通信的方法  
      phonebookService.create(newPerson).then(newItem => {
          console.log(newItem)
          setPersons(persons.concat(newItem))
          setNewName('')
          setNewNumber('')
        }
      )
    }
  }

  //2.17 删除元素的处理函数
  const deletePhoneNumber = (id) =>{
    phonebookService.deleteItem(id)
    // 通过过滤器来删除本地的显示列表
    setPersons(persons.filter( person => person.id !== id))
  }

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  // 2.9 增加filter的功能
  // 实现自动的显示列表变更
  const listToShow = newFilter === '' ? persons : persons.filter( person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
  
      <h2>add a new</h2>
      <PersonForm onSubmit={addPhoneNumber} name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons listToShow={listToShow} deletePhoneNumber={deletePhoneNumber}/>
    </div>
  )
}

export default App