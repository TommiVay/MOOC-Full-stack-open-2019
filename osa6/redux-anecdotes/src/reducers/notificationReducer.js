const notificationReducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
    case 'SHOW':
      return action.data.content
    case 'HIDE':
      return action.data
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: { content }
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE',
        data: null
      })
    }, 5000)

  }
}

export default notificationReducer
