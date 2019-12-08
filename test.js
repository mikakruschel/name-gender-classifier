const classifyName = require('./index.js');

test('should return male', async () => {
  const name = 'Peter';
  const guess = await classifyName(name);
  expect(guess).toMatchObject({ male: true, female: false, name });
});

test('should return female', async () => {
  const name = 'Andrea';
  const guess = await classifyName(name);
  expect(guess).toMatchObject({ male: false, female: true, name });
});

test('should throw error', async () => {
  const name = '';
  await expect(classifyName(name)).rejects.toThrow('No name was specified.');
});
