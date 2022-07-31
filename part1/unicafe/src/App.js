import { useState } from 'react'

// 1.8 将statistic的显示功能单独成一个组件
const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = props.all

  // 1.9 在没有反馈时，不显示数据信息
  if (all === 0){
    return (
      <p> No feedback given </p>
    )
  }

  return(
    <div>
    <h1>statistics</h1>
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={((good - bad) / all).toFixed(1)} />
        <StatisticLine text='postive' value={(good / all * 100).toFixed(1) + '%'} />
      </tbody>
    </table>
  </div>
  )
}

// 1.10 利用StatisticLine组件来分别输出显示数据
const StatisticLine = (props) => {
  const text = props.text
  const value = props.value

  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

// 1.10 将Button组件单独定义，来更新反馈
const Button = (props) =>(
  <button onClick={props.onClick}>{props.content}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const toggleGood = () => {
    setGood(good + 1)
  }

  const toggleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const toggleBad = () => {
    setBad(bad + 1)
  }

  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={toggleGood} content='good' />
      <Button onClick={toggleNeutral} content='neutral' />
      <Button onClick={toggleBad} content='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App