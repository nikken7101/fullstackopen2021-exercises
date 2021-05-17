import React from 'react'

const Header = props => {
  console.log(props)
  return (
    <h1>{props.name}</h1>
  )
}

const Content = props => {
  return (
    <div>
      {props.parts.map(part => (<Part name={part.name} exercises={part.exercises} />))}
    </div>
  )
}

const Part = props => {
  console.log(props)
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Total = props => {
  console.log(props)
  return (
    <p>Number of exercises {props.parts.map(p => p.exercises).reduce((a, b) => a + b)}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App