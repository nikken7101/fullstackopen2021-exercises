import React from 'react'

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter(p => p.name.toLowerCase().includes(props.filterTerm))
        .map(p => <p key={p.name}>{p.name} {p.number}</p>)
      }
    </div>
  )
}

export default Persons