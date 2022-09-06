class SetClone {
  constructor() {
    this.items = [];
  }

  add(itemToAdd) {
    if (this.items.indexOf(itemToAdd) < 0) {
      this.items.push(itemToAdd);
    }
  }

  delete(itemToDelete) {
    this.items = this.items.filter(item => item !== itemToDelete);
  }

  has(item) {
    return this.items.indexOf(item) >= 0;
  }

  /**
   * @param {*} input (Array)
   */

  static from(input) {
    const set = new SetClone();

    for (const item of input) {
      set.add(item);
    }

    return set;
  }
}

class SetCloneIterator {
  constructor(set) {
    this.set = set;
    this.i = 0;
  }

  next() {
    if (this.i === this.set.items.length) {
      return { done: true };
    }

    const item = {
      value: this.set.items[this.i],
      done: false,
    };
    this.i = this.i + 1;

    return item;
  }
}

SetClone.prototype[Symbol.iterator] = function () {
  return new SetCloneIterator(this);
};

/**
 * Tests
 */

const inputArray = [1, 2, 3];
const setFromArray = SetClone.from(inputArray);

if (setFromArray.has(1) !== true) {
  throw new Error('Test failed');
}

setFromArray.delete(1);
setFromArray.delete(2);
setFromArray.add(3);
setFromArray.delete(3);

if (setFromArray.has(3)) {
  throw new Error('Test failed');
}

const newSet = new SetClone();
newSet.add(1);
newSet.add(2);
newSet.add(3);

const arrayFromNewSet = [];

for (let item of newSet) {
  arrayFromNewSet.push(item);
}

if (JSON.stringify(arrayFromNewSet) !== JSON.stringify([1, 2, 3])) {
  throw new Error('Test failed');
}