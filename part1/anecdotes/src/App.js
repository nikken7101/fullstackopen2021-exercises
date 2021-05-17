import React, { useState } from 'react'

const randInt = (n) => {
  return Math.floor(Math.random() * n);
}

const argmax = (arr) => {
  return arr.indexOf(Math.max(...arr))
}

const Anecdote = (props) => {
  return (
    <p>
      {props.anecdote} <br />
       has {props.point} votes
    </p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(randInt(anecdotes.length))
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const mostVoted = argmax(points)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} point={points[selected]} />
      <button onClick={() => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
      }}>
        vote
      </button>
      <button onClick={() => setSelected(randInt(anecdotes.length))}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[mostVoted]} point={points[mostVoted]} />
    </div>
  )
}

export default App