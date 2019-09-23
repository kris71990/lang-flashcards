'use strict';

const updateSkillLevel = (score) => {
  const [correct, total] = score;
  if (total < 200) return 'Beginner';

  const ratio = correct / total;

  if (ratio >= 0.9) {
    if (total > 500) return 'Expert';
    return 'Excellent';
  // eslint-disable-next-line no-else-return
  } else if (ratio >= 0.8) {
    if (total > 500) return 'High Proficiency';
    return 'Highly Skilled';
  } else if (ratio >= 0.6) {
    if (total > 500) return 'Intermediate Proficiency';
    return 'Improving Skills';
  } else if (ratio >= 0.5) {
    if (total > 500) return 'Low Proficiency';
    return 'Basic Skills';
  } else {
    return 'Novice';
  }
};

const updateScore = (profileLangs, language, score) => {
  const currentLangs = [...profileLangs];
  const updatedLangs = currentLangs.map((lang) => {
    if (lang.language === language) {
      const currentScore = lang.score;
      const updatedScore = [currentScore[0] + score[0], currentScore[1] + score[1]];
      lang.score = updatedScore;
      lang.skillLevel = updateSkillLevel(updatedScore);
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
