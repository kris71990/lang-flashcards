'use strict';

// Simple Card Shuffling Algorithm
// Words are randomized and all words are shown before any repeats
/* 
- create array of indices to be used in the card view component state
- this array is shuffled to choose words at random
- "front" of array points to index of chosen card, array shifts and is recreated
as necessary as the user cycles through cards
*/

const createShuffledIndexArray = (wordCount) => {
  const indexArray = Array.from({ length: wordCount }, (v, i) => i);

  let current = indexArray.length;
  let temp;
  let rand;

  while (current !== 0) {
    rand = Math.floor(Math.random() * current);
    current -= 1;
    temp = indexArray[current];
    indexArray[current] = indexArray[rand];
    indexArray[rand] = temp;
  }

  return indexArray;
};

const updateIndexArray = (indexArray) => {
  indexArray.shift();
  return indexArray;
};

export { createShuffledIndexArray, updateIndexArray };
