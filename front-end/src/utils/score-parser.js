'use strict';

export default function (score) {
  const [correct, total] = score;
  
  if (correct / total >= 0.85) {
    return 'green';
  // eslint-disable-next-line no-else-return
  } else if (correct / total >= 0.75) {
    return 'teal';
  } else if (correct / total >= 0.6) {
    return 'blue';
  } else if (correct / total >= 0.5) {
    return 'purple';
  } else if (correct / total >= 0.4) {
    return 'orange';
  } else {
    return 'red';
  }
}
