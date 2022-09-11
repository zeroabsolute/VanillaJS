/**
 * Balanced parentheses.
 */

testBalancedParentheses();

function testBalancedParentheses() {
  console.log('|-----------------------------------------------------------------------------|');
  console.log('| BALANCED PARENTHESES                                                        |');
  console.log('|-----------------------------------------------------------------------------|');

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


/**
 * Next greater element.
 */

testNextGreaterElement();

function testNextGreaterElement() {
  console.log('|-----------------------------------------------------------------------------|');
  console.log('| NEXT GREATER ELEMENT                                                        |');
  console.log('|-----------------------------------------------------------------------------|');

  const input1 = [4, 5, 2, 25];
  const input2 = [13, 7, 6, 12];
  const input3 = [];
  const input4 = [1, 2, 3, 4, 5];
  const input5 = [5, 4, 3, 2, 1];

  console.log('Pairs for', input1, ': ', findNextGreaterElement(input1));
  console.log('Pairs for', input2, ': ', findNextGreaterElement(input2));
  console.log('Pairs for', input3, ': ', findNextGreaterElement(input3));
  console.log('Pairs for', input4, ': ', findNextGreaterElement(input4));
  console.log('Pairs for', input5, ': ', findNextGreaterElement(input5));
}

function findNextGreaterElement(input) {
  // Pairs will hold the next greater number for each input element
  const pairs = {};

  // Stack will be used to store all input elements which do not have a pair yet
  const stack = [];

  // We iterate on the input elements.
  // For each element, check the stack and see if there are smaller numbers there.
  // If yes, pop all the numbers that are smaller than the current and add them to the pairs map.
  // Finally, push the current element on the stack.
  input.forEach((currentNumber) => {
    while (stack.length && stack[stack.length - 1] < currentNumber) {
      const stackTop = stack.pop();
      pairs[stackTop] = currentNumber;
    }

    stack.push(currentNumber);
    pairs[currentNumber] = -1;
  });

  return pairs;
}
