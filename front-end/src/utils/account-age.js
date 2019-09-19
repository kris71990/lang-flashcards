export default function computeAccountAge(createdTime) {
  let activeFor;
  const now = new Date();
  const createdAt = new Date(createdTime).getTime();
  const daysSinceCreation = (now - createdAt) / (1000 * 60 * 60 * 24);
  const days = Math.floor(daysSinceCreation);

  switch (true) {
    case daysSinceCreation < 1:
      if (daysSinceCreation * 24 < 1) {
        activeFor = 'less than one hour';
        break;
      } else {
        activeFor = 'less than one day';
      }
      break;
    case daysSinceCreation < 365:
      activeFor = `${days} days`;
      break;
    default: 
      const years = Math.round((days / 365) * 100) / 100;
      activeFor = `${days} (~ ${years} years)`;
  }
  return activeFor;
}
