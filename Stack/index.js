/**
 * Balanced parentheses.
 */

testBalancedParentheses();

function testBalancedParentheses() {
  const input1 = '[()]{}{[()()]()}';
  const input2 = '[(])';
  const input3 = '';
  const input4 = '{';

  const input1IsBalanced = checkForBalancedParentheses(input1);
  const input2IsBalanced = checkForBalancedParentheses(input2);
  const input3IsBalanced = checkForBalancedParentheses(input3);
  const input4IsBalanced = checkForBalancedParentheses(input4);

  console.log('Input 1: ', input1, '-> Balanced: ', input1IsBalanced);
  console.log('Input 2: ', input2, '-> Balanced: ', input2IsBalanced);
  console.log('Input 3: ', input3, '-> Balanced: ', input3IsBalanced);
  console.log('Input 4: ', input4, '-> Balanced: ', input4IsBalanced);
}

function checkForBalancedParentheses(input) {
  const matches = {
    '{': '}',
    '[': ']',
    '(': ')',
  };
  const stack = [];

  for (char of input) {
    const stackTop = stack[stack.length - 1];
    const correspondingMatchForStackTop = matches[stackTop];

    if (char === correspondingMatchForStackTop) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  if (!stack.length) {
    return true;
  }

  return false;
}