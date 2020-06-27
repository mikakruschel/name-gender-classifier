const tf = require('@tensorflow/tfjs');
const fs = require('fs');

const { nameToASCII } = require('./utils');

async function classifyName(name) {
  if (!name || name == '' || name.trim() == '') throw new Error('No name was specified.');
  // load model
  const path = require.resolve('./model/model.json');

  if (!fs.existsSync(path)) throw new Error('trained model missing');
  const model = await tf.loadLayersModel(`file://${path}`);

  // predict
  return tf.tidy(() => {
    const input = tf.tensor2d([name].map(nameToASCII));
    const results = model.predict(input);
    const argMax = results.argMax(1);
    const index = argMax.dataSync()[0];
    return { male: index === 0, female: index !== 0, name };
  });
}

module.exports = classifyName;
