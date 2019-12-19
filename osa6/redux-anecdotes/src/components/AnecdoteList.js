import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const handleVote = (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`Voted: ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const filteredAnecdotes = ({ filter, anecdotes }) => {
  if (filter === "") {
    return anecdotes
  }
  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: filteredAnecdotes(state)
  }
}

const mapDispatchtoProps = {
  vote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchtoProps)(AnecdoteList)