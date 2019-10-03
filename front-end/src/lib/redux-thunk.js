export default store => next => action => (
  typeof action === 'function' ? action(store) : next(action)
);

export const testThunk = ({ dispatch, getState }) => next => action => (
  typeof action === 'function' ? action(dispatch, getState) : next(action)
);
