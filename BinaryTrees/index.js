/**
 * Node definition
 */

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = this.right = null;
  }
}

/**
 * Binary tree definition
 */

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Tree height
  getHeight() {
    const height = (currentNode) => {
      if (!currentNode) {
        return 0;
      }

      const leftSubtreeHeight = height(currentNode.left);
      const rightSubtreeHeight = height(currentNode.right);

      if (leftSubtreeHeight > rightSubtreeHeight) {
        return 1 + leftSubtreeHeight;
      }

      return 1 + rightSubtreeHeight;
    };

    return height(this.root);
  }

  // Inorder traversal: LEFT -> ROOT -> RIGHT
  printInorder() {
    const output = [];

    const inorder = (currentNode) => {
      if (!currentNode) {
        return;
      }

      inorder(currentNode.left);
      output.push(currentNode.value);
      inorder(currentNode.right);
    };

    inorder(this.root);
    return output;
  }

  // Preorder traversal: ROOT -> LEFT -> RIGHT
  printPreorder() {
    const output = [];

    const preorder = (currentNode) => {
      if (!currentNode) {
        return;
      }

      output.push(currentNode.value);
      preorder(currentNode.left);
      preorder(currentNode.right);
    };

    preorder(this.root);
    return output;
  }

  // Postorder traversal: LEFT -> RIGHT -> ROOT
  printPostorder() {
    const output = [];

    const postorder = (currentNode) => {
      if (!currentNode) {
        return;
      }

      postorder(currentNode.left);
      postorder(currentNode.right);
      output.push(currentNode.value);
    };

    postorder(this.root);
    return output;
  }

  // Level order traversal
  printLevelOrder() {
    const output = [];

    const levelOrder = (currentNode, level) => {
      if (!currentNode) {
        return;
      }

      if (level === 1) {
        output.push(currentNode.value);
      }

      levelOrder(currentNode.left, level - 1);
      levelOrder(currentNode.right, level - 1);
    };

    const treeHeight = this.getHeight();

    for (let level = 1; level <= treeHeight; level++) {
      levelOrder(this.root, level);
    }

    return output;
  }
}

/**
 * Tests for tree traversal.
 * 
 *       0
 *   1       2
 * 3   4   5   6
 */

testTraversal();

function testTraversal() {
  const tree1 = new BinaryTree();
  const tree1Root = new TreeNode(0);
  const tree1LeftChild = new TreeNode(1);
  const tree1RightChild = new TreeNode(2);
  const tree1LeftChildOfLeftChild = new TreeNode(3);
  const tree1RightChildOfLeftChild = new TreeNode(4);
  const tree1LeftChildOfRightChild = new TreeNode(5);
  const tree1RightChildOfRightChild = new TreeNode(6);
  tree1.root = tree1Root;
  tree1Root.left = tree1LeftChild;
  tree1Root.right = tree1RightChild;
  tree1LeftChild.left = tree1LeftChildOfLeftChild;
  tree1LeftChild.right = tree1RightChildOfLeftChild;
  tree1RightChild.left = tree1LeftChildOfRightChild;
  tree1RightChild.right = tree1RightChildOfRightChild;

  console.log('|-----------------------------------------------------------------------------|');
  console.log('| TREE HEIGHT                                                                 |');
  console.log('|-----------------------------------------------------------------------------|');

  console.log(`\nHeight of the tree is ${tree1.getHeight()}\n\n`);


  console.log('|-----------------------------------------------------------------------------|');
  console.log('| TRAVERSAL METHODS                                                           |');
  console.log('|-----------------------------------------------------------------------------|');

  const inorderDisplay = tree1.printInorder();
  console.log('\nInorder representation', inorderDisplay);

  const preorderDisplay = tree1.printPreorder();
  console.log('\nPreorder representation', preorderDisplay);

  const postorderDisplay = tree1.printPostorder();
  console.log('\nPostorder representation', postorderDisplay);

  const levelOrderDisplay = tree1.printLevelOrder();
  console.log('\nLevel order representation', levelOrderDisplay);
}
