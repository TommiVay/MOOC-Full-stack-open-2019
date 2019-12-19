import anecdoteService from '../services/anecdotes'

const byVotes = (a1, a2) => a2.votes - a1.votes

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      console.log(action.data)
      const votedAnecdote = action.data
      state = state.map(anecdote =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)
      return state.sort(byVotes)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }

}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export default anecdoteReducer