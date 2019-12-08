const nameToASCII = name => name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\W/g, ' ').replace(/ {2}/g, ' ')
    .toLowerCase()
    .slice(-10)
    .padStart(10, String.fromCharCode(96))
    .split('')
    .map(c => c.charCodeAt(0) - 96);

// Fisher-Yates Shuffle see https://stackoverflow.com/a/2450976/6514967
const shuffle = array => {
  const shuffled = array;
  let currentIndex = shuffled.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  return shuffled;
};


exports.nameToASCII = nameToASCII;
exports.shuffle = shuffle;
