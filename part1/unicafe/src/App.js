import React from 'react'
import { useState } from 'react'
function App() {
  const [clicks,setClicks] = useState({
    good: 0,neutral: 0,bad:0
  })
  const handleGoodClick=()=>{
    setClicks({...clicks,good: clicks.good+1})
   }
   const handleNeutralClick=()=>{
    setClicks({...clicks,neutral: clicks.neutral+1})
   }
   const handleBadClick=()=>{
    setClicks({...clicks,bad: clicks.bad+1})
   }
  return (
    <div>
      <h1>Give feedback</h1>
      <div>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      </div>
      <Statistics clicks={clicks}/>
    </div>
  )
}
function Statistics ({clicks}){
  const total = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good * 1 + clicks.bad * -1) / total
  const positive = clicks.good * (100/total)
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )}
    return(
      <div>
      <p>good {clicks.good}</p>
      <p>Neutral {clicks.neutral}</p>
      <p>bad {clicks.bad}</p>
      <p>Total {total}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
      </div>
    )
}
export default App
