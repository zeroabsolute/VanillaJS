/**
 * Definition of a doubly linked list.
 */

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
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
    const currentNodeRepresentation = {
      value: currentNode.value,
      prev: typeof (currentNode.prev?.value) === 'number' ? currentNode.prev.value : null,
      next: typeof (currentNode.next?.value) === 'number' ? currentNode.next.value : null,
    }

    values.push(`[${JSON.stringify(currentNodeRepresentation)}]`);
    currentNode = currentNode.next;
  }

  return values?.length ? values.join(' -> ') : null;
}


/**
 * Insert methods.
 * 
 * Prepend: O(1) time complexity, O(1) space complexity
 * Insert at: O(1) time complexity, O(1) space complexity
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

  if (head) {
    head.prev = newHead;
  }

  return newHead;
}

function insertAfter(head, refNode, newValue) {
  const newNode = new ListNode(newValue);

  newNode.next = refNode.next;
  refNode.next = newNode;
  newNode.prev = refNode;

  if (newNode.next) {
    newNode.next.prev = newNode;
  }

  return head;
}

function append(head, newValue) {
  const newNode = new ListNode(newValue);
  newNode.next = null;

  let currentNode = head;

  while (currentNode.next) {
    currentNode = currentNode.next;
  }

  currentNode.next = newNode;
  newNode.prev = currentNode;

  return head;
}


/**
 * Delete method.
 * 
 * O(1) time complexity, O(1) space complexity
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

  head = deleteNode(head, head);
  console.log('After deleting the head', display(head));

  head = deleteNode(head, head.next);
  console.log('After deleting a node in the middle', display(head));

  head = deleteNode(head, head.next.next);
  console.log('After deleting the tail', display(head));

  head = deleteNode(head, head.next);
  console.log('After deleting the tail again', display(head));

  head = deleteNode(head, head);
  console.log('After deleting the last node', display(head));
}

function deleteNode(head, node) {
  if (!(head || node)) {
    return null;
  }

  const isFirstNode = node.prev === null;
  const isLastNode = node.next === null;

  if (isFirstNode) {
    head = head.next;
  }

  if (!isLastNode) {
    node.next.prev = node.prev;
  }

  if (!isFirstNode) {
    node.prev.next = node.next;
  }

  return head;
}
