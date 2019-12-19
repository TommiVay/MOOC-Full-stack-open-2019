const filterReducer = (state = '', action) => {
  switch (action.type) {
    case "FILTER":
      return action.filter
    default:
      return state
  }
}

export const changeFilter = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}

export default filterReducer