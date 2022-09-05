/**
 * Deep equals: Deep comparison between objects
 * 
 * @param {*} obj1 
 * @param {*} obj2 
 */

function deepEquals(obj1, obj2) {
  let state = true;

  Object.keys(obj1).forEach((key) => {
    if (typeof (obj1[key]) !== 'object' || !obj1[key]) {
      state &&= obj1[key] === obj2[key];
    } else {
      state &&= deepEquals(obj1[key], obj2[key]);
    }
  });

  return state;
}

function testDeepEquals(actual, expected) {
  if (actual !== expected) {
    throw new Error('Test failed');
  }
}

(function () {
  const input1 = { a: 1, b: 2 };
  const output1 = deepEquals(input1, { a: 1, b: 2 });
  testDeepEquals(output1, true);

  const input2 = {};
  const output2 = deepEquals(input2, {});
  testDeepEquals(output2, true);

  const input3 = { foo: null, bar: 1 };
  const output3 = deepEquals(input3, input3);
  testDeepEquals(output3, true);

  const input4 = { a: 1 };
  const output4 = deepEquals(input4, { b: 1 });
  testDeepEquals(output4, false);
})();