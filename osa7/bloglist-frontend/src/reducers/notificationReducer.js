const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.data.notification
  case 'HIDE':
    return action.data
  default:
    return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: { notification }
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE',
        data: null
      })
    }, time)

  }
}

export default notificationReducer
