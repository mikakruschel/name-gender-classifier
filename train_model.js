const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const fs = require('fs').promises;
const { nameToASCII, shuffle } = require('./utils');

const getNamesFromCSV = async () => {
  const males = new Set();
  const females = new Set();

  const contents = await fs.readFile('gender.csv', 'utf8');
  const rows = contents.split('\n').map(r => r.split(','));
  for (let i = 0; i < rows.length; i += 1) {
    if (rows[i][0] == 'male') males.add(rows[i][1]);
    else if (rows[i][0] == 'female') females.add(rows[i][1]);
  }

  return { males: [...males], females: [...females] };
};

async function train() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 500, inputShape: [10], activation: 'sigmoid' }));
  model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));
  model.compile({ optimizer: 'sgd', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

  const namesFromCSV = await getNamesFromCSV();

  const names = shuffle([
    ...namesFromCSV.males,
    ...namesFromCSV.females,
  ]);

  const labels = names.map(a => (namesFromCSV.males.includes(a) ? 0 : 1));
  const labelsTensor = tf.tensor1d(labels, 'int32');

  const xs = tf.tensor2d(names.map(nameToASCII));
  const ys = tf.oneHot(labelsTensor, 2).cast('float32');
  labelsTensor.dispose();

  await model.fit(xs, ys, {
    shuffle: true,
    // validationSplit: 0.1,
    epochs: 5000,
  });

  await model.save('file://./model');
  process.exit();
}

train();
