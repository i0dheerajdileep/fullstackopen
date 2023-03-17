import React from 'react'
import { useState } from 'react'
function Winner({allVotes,anecdotes}){
  const highestCount = Math.max(...allVotes)
  const winnerIndex = allVotes.indexOf(highestCount)
  const winner = anecdotes[winnerIndex]
  if(highestCount===0){
    return(
      <p>No votes yet</p>
    )
  }
  return(
    <div>
    <p>The winner is "{winner}" with the vote count {highestCount}</p>
    {console.log("hi")}
    </div>
  )
};
function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected,setSelected] = useState(0)
  const [allVotes,setAllVotes] = useState(Array(6).fill(0))
  function handleAnecdoteClick(){
    const index = Math.floor(Math.random()*anecdotes.length)
    setSelected(index)
  }
  function handleVoteClick(){
    const newAllVotes = [...allVotes]
    newAllVotes[selected]+=1
    setAllVotes(newAllVotes)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {allVotes[selected]} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleAnecdoteClick}>next</button>
      <h2>Anecdotes with most votes</h2>
      <Winner allVotes={allVotes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
