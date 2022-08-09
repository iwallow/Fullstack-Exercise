import { useState } from 'react'

// 2.6 实现表单与触发器的链接
// 完成了在输入框输入数据，submit输入的数据和显示数据的功能
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')

  const addPhoneNumber = (event) =>{
    event.preventDefault()

    const newPerson = { name: newName , number: newNumber}
    const result = persons.filter( person => JSON.stringify(person) === JSON.stringify(newPerson))
    console.log(result)
    
    // 2.7 判断添加的元素是否已经在列表当中
    // 利用JSON.stringify来进行数组之间的判断
    if(JSON.stringify(result) !== '[]'){
      alert(`${newPerson.name} is already added to phonebook`)
    }else{
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhoneNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          {/* 2.8 增加了添加电话号码的功能 */}
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App