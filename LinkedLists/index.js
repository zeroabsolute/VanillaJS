/**
 * Definition of a linked list.
 */

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/**
 * Display method.
 * 
 * Time complexity: O(n)
 * Space complexity: O(1)
 */

function display(head) {
  const values = [];
  let currentNode = head;

  while (currentNode) {
    values.push(`[${currentNode.value}]`);
    currentNode = currentNode.next;
  }

  return values?.length ? values.join(' -> ') : null;
}


/**
 * Insert methods.
 * 
 * Prepend: O(1) time complexity, O(1) space complexity
 * Insert at: O(n) time complexity, O(1) space complexity
 * Append: O(n) time complexity, O(1) space complexity
 */

testInsert();

function testInsert() {
  console.log('|-----------------------------------------------------------------------------|');
  console.log('| INSERTION METHODS                                                           |');
  console.log('|-----------------------------------------------------------------------------|');

  let head = new ListNode(1);
  console.log('Initial:', display(head));

  head = prepend(head, 2);
  console.log('After prepending:', display(head));

  head = insertAfter(head, head.next, 0);
  console.log('After inserting next to the second node:', display(head));

  head = append(head, -1);
  console.log('After appending:', display(head));
}

function prepend(head, newValue) {
  const newHead = new ListNode(newValue);

  newHead.next = head;

  return newHead;
}

function insertAfter(head, refNode, newValue) {
  let currentNode = head;

  while (currentNode !== refNode) {
    currentNode = currentNode.next;
  }

  const newNode = new ListNode(newValue);

  newNode.next = currentNode.next;
  currentNode.next = newNode;

  return head;
}

function append(head, newValue) {
  let currentNode = head;

  while (currentNode.next) {
    currentNode = currentNode.next;
  }

  const newNode = new ListNode(newValue);

  newNode.next = null;
  currentNode.next = newNode;

  return head;
}


/**
 * Delete methods.
 * 
 * First value occurrence: O(n) time complexity, O(1) space complexity
 * By index: O(n) time complexity, O(1) space complexity
 */

testDelete();

function testDelete() {
  console.log('|-----------------------------------------------------------------------------|');
  console.log('| DELETION METHODS                                                            |');
  console.log('|-----------------------------------------------------------------------------|');

  let head = new ListNode(1);
  append(head, 2);
  append(head, 3);
  append(head, 4);
  append(head, 5);
  console.log('Before delete', display(head));

  deleteFirstOccurrence(head, 5);
  console.log('After deleting the last node', display(head));

  head = deleteFirstOccurrence(head, 1);
  console.log('After deleting the first node', display(head));

  deleteFirstOccurrence(head, 3);
  console.log('After deleting the middle node', display(head));

  deleteFirstOccurrence(head, 10);
  console.log('After trying to delete an non-existing node', display(head));

  deleteByIndex(head, 10);
  console.log('After trying to delete an non-existing node by index', display(head));

  deleteByIndex(head, 1);
  console.log('After deleting the last node by index', display(head));

  head = deleteByIndex(head, 0);
  console.log('After deleting the first node by index', display(head));
}

function deleteFirstOccurrence(head, value) {
  if (head.value === value) {
    head = head.next;

    return head;
  }

  let currentNode = head;

  while (currentNode.next && currentNode.next.value !== value) {
    currentNode = currentNode.next;
  }

  if (currentNode) {
    currentNode.next = currentNode.next?.next || null;
  }

  return currentNode;
}

function deleteByIndex(head, indexToDelete) {
  let index = 0;

  if (indexToDelete === 0) {
    head = head.next;

    return head;
  }

  let currentNode = head;

  while (currentNode) {
    if (index === indexToDelete - 1) {
      currentNode.next = currentNode.next?.next;
    }

    currentNode = currentNode.next;
    index++;
  }

  return head;
}


/**
 * List length methods.
 * 
 * Iterative solution: O(n) time complexity, O(1) space complexity
 * Recursive solution: O(n) time complexity, O(n) space complexity
 */

testLength();

function testLength() {
  console.log('|-----------------------------------------------------------------------------|');
  console.log('| LENGTH METHODS                                                              |');
  console.log('|-----------------------------------------------------------------------------|');

  const head1 = new ListNode(1);
  append(head1, 2);
  append(head1, 3);
  append(head1, 4);
  append(head1, 5);
  console.log('Input list with 5 nodes', display(head1));

  const head2 = new ListNode(1);
  console.log('Input list with 1 node', display(head2));

  let list1Length = lengthIterative(head1);
  console.log('List 1 length iterative: ', list1Length);
  list1Length = lengthRecursive(head1);
  console.log('List 1 length recursive: ', list1Length);

  let list2Length = lengthIterative(head2);
  console.log('List 2 length iterative: ', list2Length);
  list2Length = lengthRecursive(head2);
  console.log('List 2 length recursive: ', list2Length);

  let list3Length = lengthIterative(null);
  console.log('Empty list length iterative: ', list3Length);
  list3Length = lengthRecursive(null);
  console.log('Empty list length recursive: ', list3Length);
}

function lengthIterative(head) {
  let length = 0;

  while (head) {
    length++;
    head = head.next;
  }

  return length;
}

function lengthRecursive(head) {
  if (!head) {
    return 0;
  }

  return 1 + lengthRecursive(head.next);
}


/**
 * Detecting loops.
 * 
 * Using a set: O(n) time complexity, O(n) space complexity
 * Using two pointers: O(n) time complexity, O(1) space complexity
 * Using a helper node: O(n) time complexity, O(1) space complexity
 */

testLoopDetection();

function testLoopDetection() {
  console.log('|-----------------------------------------------------------------------------|');
  console.log('| LOOP DETECTION METHODS                                                      |');
  console.log('|-----------------------------------------------------------------------------|');

  const node11 = new ListNode(1);
  const node12 = new ListNode(2);
  const node13 = new ListNode(3);
  const node14 = new ListNode(4);
  const node15 = new ListNode(5);
  node11.next = node12;
  node12.next = node13;
  node13.next = node14;
  node14.next = node15;
  node15.next = node13;

  const head2 = new ListNode(1);
  append(head2, 2);
  append(head2, 3);
  append(head2, 4);
  append(head2, 5);
  console.log('Input list', display(head2));

  let list1HasLoop = detectLoopUsingSet(node11);
  let list2HasLoop = detectLoopUsingSet(head2);

  console.log(`Detect loop using a set: List 1 ${list1HasLoop ? 'has' : 'does not have'} a loop`);
  console.log(`Detect loop using a set: List 2 ${list2HasLoop ? 'has' : 'does not have'} a loop`);

  list1HasLoop = detectLoopUsingTwoPointers(node11);
  list2HasLoop = detectLoopUsingTwoPointers(head2);

  console.log(`Detect loop using two pointers: List 1 ${list1HasLoop ? 'has' : 'does not have'} a loop`);
  console.log(`Detect loop using two pointers: List 2 ${list2HasLoop ? 'has' : 'does not have'} a loop`);

  list1HasLoop = detectLoopUsingExtraNode(node11);
  list2HasLoop = detectLoopUsingExtraNode(head2);

  console.log(`Detect loop using an extra node: List 1 ${list1HasLoop ? 'has' : 'does not have'} a loop`);
  console.log(`Detect loop using an extra node: List 2 ${list2HasLoop ? 'has' : 'does not have'} a loop`);
}

function detectLoopUsingSet(head) {
  const set = new Set();

  while (head) {
    if (set.has(head.value)) {
      return true;
    }

    set.add(head.value);
    head = head.next;
  }

  return false;
}

function detectLoopUsingTwoPointers(head) {
  let p1 = head; // will move with a step of 1 node at a time
  let p2 = head; // will move with a step of 2 nodes at a time

  while (head) {
    p1 = p1?.next;
    p2 = p2?.next?.next;
    head = head.next;

    // By going at different speeds, if there is a loop the two pointers will meet at some point
    if (p1 === p2) {
      return true;
    }
  }

  return false;
}

function detectLoopUsingExtraNode(head) {
  let temp = new ListNode(0);

  // We will update each list node pointer to point to the temp node.
  // While iterating, we will check if a pointer is already pointing to this node.
  // If yes, we have visited the current node before, so we have a loop.

  while (head) {
    if (head.next === temp) {
      return true;
    }

    let next = head.next;
    head.next = temp;
    head = next;
  }

  return false;
}
