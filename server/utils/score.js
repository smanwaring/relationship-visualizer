//The pixelCalculator Function determines the pixel score of a relationship nova on the current day.
const numDays = 28,
      maxPixels = 220,
      minPixels = 50,
      rangeMax = maxPixels / minPixels,
      //what we've determined to be the highest score, based on average of the frequency and type weight
      maxScore = numDays * (numDays + 1) / 2,
      //7.5 represents what dev thinks is a good ratio of contact to warrent highest pixels render
      topScore = maxScore / 7.5,
      typeScore = {
        'face-to-face': 1,
        call: 0.8,
        email: 0.5,
        'letter/postcard': 0.5,
        social: 0.2,
        text: 0.2
      };

//function takes an array of activity
const pixelCalculator = ( arr ) => {
  //if no activity for this relationship, return minimum pixel amt.
  if (arr.length < 1) {
    return minPixels;
  }
  //for each point of activity in arr calculate recency score and type score
  const total = arr.map( activity => activity.ageScore(numDays) * typeScore[activity.type])
                   .reduce( (pre, cur) => pre + cur);
  //if the total is zero return the min size of pixels
  if (total === 0) {
    return minPixels;
  // if the total is greater than the topScore then return the cap since you can't go over the pixel cap.
  } else if (total >= topScore) {
    return maxPixels;
  } else {
    return total / topScore * rangeMax * minPixels;
  }
};

module.exports = pixelCalculator;


