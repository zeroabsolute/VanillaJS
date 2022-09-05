/**
 * Reverse an array
 */

testArrayReverse();

function testArrayReverse() {
  const input1 = [1, 2, 3, 4, 5];
  const input2 = [];
  const input3 = [1];
  const input4 = [1, 2];
  const input5 = [1, 1, 1];

  const output1 = reverse(input1);
  const output2 = reverse(input2);
  const output3 = reverse(input3);
  const output4 = reverse(input4);
  const output5 = reverse(input5);

  if (JSON.stringify(output1) !== JSON.stringify([5, 4, 3, 2, 1])) {
    throw new Error('Test failed');
  }
  if (JSON.stringify(output2) !== JSON.stringify([])) {
    throw new Error('Test failed');
  }
  if (JSON.stringify(output3) !== JSON.stringify([1])) {
    throw new Error('Test failed');
  }
  if (JSON.stringify(output4) !== JSON.stringify([2, 1])) {
    throw new Error('Test failed');
  }
  if (JSON.stringify(output5) !== JSON.stringify([1, 1, 1])) {
    throw new Error('Test failed');
  }
}

function reverse(array) {
  for (let i = 0; i < Math.ceil(array.length / 2); i++) {
    let temp;
    let current = array[i];
    let symmetric = array[array.length - i - 1];

    temp = current;
    array[i] = symmetric;
    array[array.length - i - 1] = temp;
  }

  return array;
}
