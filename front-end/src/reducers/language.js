export default (state = '', { type, payload }) => {
  switch (type) {
    case 'LANGUAGE_SELECT':
      return payload;
    default:
      return state;
  }
};
