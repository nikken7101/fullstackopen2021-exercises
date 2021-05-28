import React from 'react'

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter(p => p.name.toLowerCase().includes(props.filterTerm))
        .map(p => <>
          <p key={p.id}>
            {p.name} {p.number}
            <button onClick={() => props.deletePerson(p)}>delete</button>
          </p>
        </>)
      }
    </div>
  )
}

export default Persons