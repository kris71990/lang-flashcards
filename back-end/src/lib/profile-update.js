'use strict';

const updateScore = (profileLangs, language, score) => {
  const currentLangs = [...profileLangs];
  const updatedLangs = currentLangs.map((lang) => {
    if (lang.language === language) {
      const currentScore = lang.score;
      const updatedScore = [currentScore[0] + score[0], currentScore[1] + score[1]];
      lang.score = updatedScore;
      return lang;
    }
    return lang;
  });
  return updatedLangs;
};

const addLanguage = (profileLangs, language) => {
  const updatedLangs = [...profileLangs];
  updatedLangs.push({ 
    language, wordsAdded: null, score: [0, 0], skillLevel: null, added: new Date(),
  });
  return updatedLangs;
};

const updateWordCount = (profileLangs, language, wordCount) => {
  const currentLangs = [...profileLangs];
  const updatedLangs = currentLangs.map((lang) => {
    if (lang.language === language) {
      if (lang.wordsAdded === null) {
        lang.wordsAdded = wordCount;
      } else {
        lang.wordsAdded += wordCount;
      }
      return lang;
    }
    return lang;
  });
  return updatedLangs;
};

export { updateScore, addLanguage, updateWordCount };
