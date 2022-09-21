Document.prototype.querySelectorAllClone = function (query) {
  const elements = searchInDOM(this, query, matchesQuery);
  return elements;
};

const elementsById = document.querySelectorAllClone('#container');
console.log('Query by id: ', elementsById);
const elementsByClassName = document.querySelectorAllClone('.child-1');
console.log('Query by class: ', elementsByClassName);
const elementsByTagName = document.querySelectorAllClone('div');
console.log('Query by tag: ', elementsByTagName);

/**
 * DOM traversal
 * 
 * @param {*} document 
 * @returns 
 */

function searchInDOM(document, query, test) {
  const result = [];
  const traverse = (root) => {
    if (test(query, root)) {
      result.push(root);
    }

    const children = root.childNodes;

    if (!children) {
      return;
    }

    Array.from(children).forEach((child) => {
      traverse(child);
    });
  };

  traverse(document);

  return result;
}

/**
 * Helpers for finding matches
 */

function matchesQuery(query, node) {
  const classNameRegex = /^\.[a-zA-Z]+[a-zA-Z0-9_-]*$/;
  const tagNameRegex = /^\w+$/;
  const idRegex = /^#[a-zA-Z]+[a-zA-Z0-9_-]*$/;

  if (query === '*') {
    return true;
  } else if (classNameRegex.test(query)) {
    return matchesClassName(query.slice(1), node);
  } else if (tagNameRegex.test(query)) {
    return matchesTagName(query, node);
  } else if (idRegex.test(query)) {
    return matchesId(query.slice(1), node);
  }
}

function matchesClassName(query, node) {
  const className = node.className;
  return Boolean(className?.includes(query));
}

function matchesTagName(query, node) {
  const tagName = node.tagName;
  return Boolean(query.toLowerCase() === tagName?.toLowerCase());
}

function matchesId(query, node) {
  const id = node.id;
  return Boolean(query === id);
}
