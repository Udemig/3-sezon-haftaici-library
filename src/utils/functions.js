export const upperFirstLetters = (sample = "") => {
  var words = sample.split(" ");
  //console.log(words);
  var tempWords = [];
  /* ilk for döngüsü kelimeleri tek tek gezer */
  for (let i = 0; i < words.length; i++) {
    /* bu for döngüsü kelimenin harflerini tek tek gezer */
    var tempWord = "";
    for (let j = 0; j < words[i].length; j++) {
      if (j === 0) {
        tempWord += words[i][j].toLocaleUpperCase("tr-TR");
      } else {
        tempWord += words[i][j].toLocaleLowerCase("tr-TR");
      }
    }
    tempWords.push(tempWord);
  }
  //console.log(tempWords);
  const result = tempWords.join(" ");
  return result;
};
