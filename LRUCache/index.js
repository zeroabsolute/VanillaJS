/**
 * Requirements:
 * 
 * 1) Limited capacity.
 * 2) FIFO replacing.
 * 3) O(1) read access.
 * 4) O(1) write access.
 * 
 * Solution:
 * 1) Queue implementation using a doubly linked list. Least recently used items will be placed at the tail.
 * 2) HashMap for storing addresses of the queue nodes.
 */

class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  display() {
    const values = [];
    let currentNode = this.head;

    while (currentNode) {
      const currentNodeRepresentation = {
        value: currentNode.value,
        prev: typeof (currentNode.prev?.value) !== 'undefined' ? currentNode.prev.value : null,
        next: typeof (currentNode.next?.value) !== 'undefined' ? currentNode.next.value : null,
      }

      values.push(`[${JSON.stringify(currentNodeRepresentation)}]`);
      currentNode = currentNode.next;
    }

    return values?.length ? values.join(' -> ') : `[]`;
  }

  prepend(key, value) {
    const newNode = new ListNode(key, value);
    const listIsEmpty = this.size === 0;


    if (listIsEmpty) {
      this.head = this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.size++;

    return newNode;
  }

  deleteNode(node) {
    const isListHead = node.prev === null;
    const isListTail = node.next === null;

    if (!(this.head || node)) {
      return;
    }

    if (isListHead) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }

    if (isListTail) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }

    this.size--;
  }
}


class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.addresses = new Map(); // Hashmap with cache addresses
    this.data = new DoublyLinkedList(); // Queue with cache data
  }

  get(address) {
    const node = this.addresses.get(address);

    if (!node) {
      return -1;
    }

    this.remove(node);
    this.insert(node.key, node.value);

    return node.value;
  }

  put(address, value) {
    const itemExistsInCache = this.addresses.has(address);

    if (itemExistsInCache) {
      const dataNode = this.addresses.get(address);
      this.remove(dataNode);
      this.insert(address, value);
    } else {
      const currentCacheSize = this.data.size;
      const cacheIsFull = currentCacheSize === this.capacity;

      if (cacheIsFull) {
        this.removeLRU();
      }

      this.insert(address, value);
    }
  }

  insert(address, value) {
    const newDataNode = this.data.prepend(address, value);
    this.addresses.set(address, newDataNode);
  }

  remove(node) {
    this.data.deleteNode(node);
    this.addresses.delete(node.key);
  }

  removeLRU() {
    const tail = this.data.tail;
    this.remove(tail);
  }

  display() {
    console.log('Capacity:', this.capacity);
    console.log('Addresses', this.addresses);
    console.log('Data', this.data.display());
  }
}


/**
 * Tests
 */

const cache = new LRUCache(5);
console.log('Cache initial state');
cache.display();

const address0 = 'addr-0';
const aValueThatDoesntExist = cache.get(address0);
console.log(`\nTrying to fetch a value that doesn't exist: get(${address0}) => `, aValueThatDoesntExist);

const address1 = 'addr-1';
const value1 = 'val-1';
cache.put(address1, value1);
console.log(`\nCache after adding a new entry : put(${address1}, ${value1})`);
cache.display();

const address2 = 'addr-2';
const value2 = 'val-2';
cache.put(address2, value2);
console.log(`\nCache after adding a new entry : put(${address2}, ${value2})`);
cache.display();

const updatedValue2 = 'val-2 [updated]';
cache.put(address2, updatedValue2);
console.log(`\nCache after updating an existing entry : put(${address2}, ${updatedValue2})`);
cache.display();

const address3 = 'addr-3';
const value3 = 'val-3';
cache.put(address3, value3);
const address4 = 'addr-4';
const value4 = 'val-4';
cache.put(address4, value4);
const address5 = 'addr-5';
const value5 = 'val-5';
cache.put(address5, value5);
console.log(`\nCache at full capacity`);
cache.display();

const valueAtAddress2 = cache.get(address2);
console.log(`\nTrying to fetch a value that exists: get(${address2}) => `, valueAtAddress2);
console.log(`\nCache after the last fetch:`);
cache.display();

const address6 = 'addr-6';
const value6 = 'val-6';
cache.put(address6, value6);
console.log(`\nCache after adding a new entry at full capacity : put(${address6}, ${value6})`);
cache.display();