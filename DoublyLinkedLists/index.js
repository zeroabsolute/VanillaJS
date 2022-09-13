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
