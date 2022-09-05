/**
 * Reverse:
 * [1, 2, 3] => [3, 2, 1]
 * 
 * @param {*} array 
 * @returns 
 */

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

function testReverse(actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error('Test failed');
  }
}

(
  function () {
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

    testReverse(output1, [5, 4, 3, 2, 1]);
    testReverse(output2, []);
    testReverse(output3, [1]);
    testReverse(output4, [2, 1]);
    testReverse(output5, [1, 1, 1]);
  }
)();


/**
 * Array to list.
 * List node: { value: number, next: listNode }
 * 
 * @param {*} array 
 */

function arrayToList(array) {
  if (array.length === 0) {
    return null;
  }
  if (array.length === 1) {
    return { value: array[0], next: null };
  }

  const remainingSlice = array.slice(1);

  return {
    value: array[0],
    next: arrayToList(remainingSlice),
  }
}

function testArrayToList(input) {
  const output = arrayToList(input);

  let currentNode = output;

  for (let i = 0; i < input.length; i++) {
    if (currentNode.value !== input[i]) {
      throw new Error('Test failed');
    }

    currentNode = currentNode.next;
  }
}

(function () {
  testArrayToList([1, 2, 3]);
  testArrayToList([]);
  testArrayToList([1]);
  testArrayToList([0, 0, 0]);
})();


/**
 * Array filter clone.
 * 
 * @param {*} array 
 * @param {*} test 
 */

function filter(array, test) {
  const output = [];

  for (let i = 0; i < array.length; i++) {
    if (test(array[i])) {
      output.push(array[i]);
    }
  }

  return output;
}

function testFilter(input, actual, test) {
  const expected = input.filter(test);

  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error('Test failed');
  }
}

(function () {
  const input1 = [1, 2, 3];
  const test1 = (elem) => elem % 2 === 0;
  const output1 = filter(input1, test1);
  testFilter(input1, output1, test1);

  const input2 = [];
  const test2 = (elem) => elem % 2 === 0;
  const output2 = filter(input2, test2);
  testFilter(input2, output2, test2);

  const input3 = [2, 4, 6];
  const test3 = (elem) => elem % 2 !== 0;
  const output3 = filter(input3, test3);
  testFilter(input3, output3, test3);
})()