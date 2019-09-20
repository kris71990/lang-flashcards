const computeAge = (createdTime, type) => {
  let activeFor;
  const now = new Date();
  const createdAt = new Date(createdTime).getTime();
  const daysSinceCreation = (now - createdAt) / (1000 * 60 * 60 * 24);
  const days = Math.floor(daysSinceCreation);

  switch (true) {
    case daysSinceCreation < 1:
      if (daysSinceCreation * 24 < 1) {
        if (type === 'account') {
          activeFor = 'less than one hour';
        } else {
          activeFor = '< 1 hour';
        }
        break;
      } else {
        if (type === 'account') {
          activeFor = 'less than one day';
        } else {
          activeFor = '< 1 day';
        }
        break;
      }
    case daysSinceCreation < 2:
      activeFor = `${days} day`;
      break;
    case daysSinceCreation < 365:
      activeFor = `${days} days`;
      break;
    default: 
      const years = Math.round((days / 365) * 100) / 100;
      activeFor = `${days} (~ ${years} years)`;
  }
  return activeFor;
};

const formatLanguageAddedTime = (createdTime) => {
  return new Date(createdTime).toLocaleDateString();
};

export {
  computeAge,
  formatLanguageAddedTime,
};
