import { useState, useEffect } from 'react'
import axios from 'axios'

// 2.13 将多条的显示提取出来，并实现了按键显示的功能
// 利用更改过滤的字符内容来实现
const Country = ({countries, onClick}) => (
  countries.map(country => (
      <p key={country.name}>{country.name}
        <button onClick={() => onClick(country.name)}>show</button>
      </p>
  )))

// 2.12 实现国家信息检索功能 
const App = () => {
  const [countries, setCountries] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then(
      response => {
        const data = response.data
        setCountries(data)
      }
    )
  }, [])

  const changeInputText = (event) => {
    console.log(event.target.value)
    setText(event.target.value)
  }

  // 2.13 触发器-用来改变text的过滤内容
  const showCountry = (countryName) => {
    setText(countryName)
  }

  const showCountriesList = () => {
    const countriesList = countries.filter( country => country.name.toLowerCase().includes(text.toLowerCase()))
    if(countriesList.length > 10){
      return(
        <p>Too many matches, specify another filter</p>
      )
    }else if(countriesList.length === 1){
      const count = countriesList[0]
      return(
        <div>
          <h1>{count.name}</h1>
          <p>captial {count.capital}</p>
          <p>area {count.area}</p>
          <p><b>language: </b></p>
          <ul>
            {count.languages.map( lang => <li key={lang.name}>{lang.name}</li>)}
          </ul>
          <img src={count.flag} alt='country flag'></img>
        </div>
      )
    }
    else{
      return(
        <div>
          <Country countries={countriesList} onClick={showCountry}/>
        </div>
      )
    }
  }

  return(
    <div>
      find countries<input value={text} onChange={changeInputText} />
      {showCountriesList()}
    </div>
  )
}

export default App