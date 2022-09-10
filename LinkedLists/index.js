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