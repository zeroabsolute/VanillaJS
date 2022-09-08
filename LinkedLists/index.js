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

  return values.join(' -> ');
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
