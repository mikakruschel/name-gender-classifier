[![npm](https://img.shields.io/npm/v/name-gender-classifier)](https://www.npmjs.com/package/name-gender-classifier)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=mikakruschel/name-gender-classifier)](https://dependabot.com)

# Gender classifier from first name
A simple neural network that classifies the gender of first names. The current model is trained for German first names but can easily be modified for every other language.

### Install
`npm i name-gender-classifier`

### Example
```js
const classifyName = require('name-gender-classifier');

classifyName('Andrea').then((prediction) => {
  console.log(`${prediction.name} is probably a ${prediction.male ? 'male' : 'female'} name`);
  // logs: Andrea is probably a female name
});

classifyName('Peter').then(console.log); // logs: { male: true, female: false, name: 'Peter' }
```
