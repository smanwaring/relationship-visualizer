const numDays = 28,
      maxPixels = 220,
      minPixels = 50,
      rangeMax = maxPixels / minPixels,
      rangeMin = 1,
      //what we've determined to be the highest score, based on average of the frequency and type weight
      maxScore = numDays * (numDays + 1) / 2,
      //7.5 represents what dev. thinks is a good ratio of contact to warrent highest pixels
      topScore = maxScore / 7.5;

//function takes an array of activity
export const pixelCalculator = ( arr ) => {
  //for each point of activity in arr calculate recency score and type score
  const total = arr.map( activity => activity.score(numDays))
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

