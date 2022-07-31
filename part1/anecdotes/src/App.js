import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const toggleAnecdotes = () =>{
    const num = Math.floor(Math.random() * anecdotes.length)
    setSelected(num)
  }

  // 1.14 输出投票数最高的名言以及票数
  // 有问题！！！！
  // 直接在App的输出中调用函数，是否不太合适？
  const getMostVoteAnecdote = () => {
    const index = points.indexOf(Math.max(...points))
    return(
      <div>
        <p>{anecdotes[index]}</p>
        <p>has {points[index]} votes</p>
      </div>
    )
  }

  // 1.13 增加了投票机制，用数组储存每个名言的投票数
  const toggleVote = (id) => {
    const newPoints = [...points]

    // 有问题！！！！
    // 这里直接改变了副本的值，是否会有问题？
    newPoints[id] += 1

    console.log(newPoints)
    setPoints(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => toggleVote(selected)}>vote</button>
      <button onClick={toggleAnecdotes}>next anecdotes</button>


      <h1>Anecdote with most votes</h1>
      {getMostVoteAnecdote()}
    </div>
  )
}

export default App