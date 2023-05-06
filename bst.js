class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(data) {
    this.root = this.buildTree(data);
    console.log(this.root);
  }

  buildTree(array) {
    const sortedArray = this.sortedArray(array);
    const deleteDupes = this.removeDuplicates(sortedArray);
    let n = deleteDupes.length;
    const root = this.sortedArrToBST(deleteDupes, 0, n - 1);

    this.prettyPrint(root);

    return root;
  }

  sortedArray(arr) {
    arr.sort(function (a, b) {
      return a - b;
    });
    return arr;
  }

  removeDuplicates(arr) {
    let uniquArr = [...new Set(arr)];
    return uniquArr;
  }

  sortedArrToBST(arr, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    let node = new BSTNode(arr[mid]);
    // [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

    node.left = this.sortedArrToBST(arr, start, mid - 1);
    node.right = this.sortedArrToBST(arr, mid + 1, end);
    return node;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  isEmpty() {
    return this.root === null;
  }

  insert(value) {
    const newNode = new BSTNode(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
    this.prettyPrint(root);
  }

  search(root, value) {
    // break clause, if no root, return false
    if (!root) {
      return false;
      // if there is a root, see if it is the value, then return is
    } else {
      if (root.value === value) {
        return true;
        // if value is less than root value, recursively search left side
      } else if (value < root.value) {
        return this.search(root.left, value);
        // if value is greater than root value, recursively search right side
      } else {
        return this.search(root.right, value);
      }
    }
  }

  dfsPreorder(root) {
    if (root) {
      console.log(root.value);
      this.dfsPreorder(root.left);
      this.dfsPreorder(root.right);
    }
  }

  dfsInorder(root) {
    if (root) {
      this.dfsInorder(root.left);
      console.log(root.value);
      this.dfsInorder(root.right);
    }
  }

  dfsPostorder(root) {
    if (root) {
      this.dfsInorder(root.left);
      this.dfsInorder(root.right);
      console.log(root.value);
    }
  }

  bfsLevelOrder() {
    // Use optomised queue implementation from linkedList
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      let curr = queue.shift();
      console.log(curr.value);
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
  }

  min(root) {
    if (!root.left) {
      return root.value;
    } else {
      return this.min(root.left);
    }
  }

  max(root) {
    if (!root.right) {
      return root.value;
    } else {
      return this.min(root.right);
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
    // No child nodes
    // One child, remove node, replace with child
    // Two child nodes, copy the value of inorder successor to node, and delete indorder successor (the inorder successor of a node (in BST) is the next node in the inorder traversal sequence). In BST the inorder successor is the node with the least value in its right subtree
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      root.value = this.min(root.right);
      root.right = this.deleteNode(root.right, root.value);
    }
    return root;
  }

  depth(root) {
    if (!root) return 0;
    return 1 + Math.max(this.depth(root.right), this.depth(root.left));
  }

  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }
    let leftHeight = this.depth(root.left);
    let rightHeight = this.depth(root.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) === true &&
      this.isBalanced(root.right) === true
    ) {
      return true;
    }
    return false;
  }

  rebalance(root = this.root) {
    let arr = this.bfsLevelOrder([], [], root);
    arr.sort((a, b) => a - b);
    return (this.root = this.buildTree(arr));
  }
}

const bstArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst2 = new BST(bstArr);
// bst2.insert(25);
// bst2.insert(0);
// console.log(bst2.search(bst2.root, 7));
// bst2.dfsPreorder(bst2.root);
// bst2.dfsInorder(bst2.root);
// bst2.dfsPostorder(bst2.root);
bst2.bfsLevelOrder();
bst2.delete(3);
bst2.bfsLevelOrder();
console.log(bst2.depth(bst2.root));
console.log(bst2.isBalanced(bst2.root));

///////////////////////////////////////BST TOP////////////////////////////////////
/*
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class bst {
  constructor(data) {
    this.root = this.buildTree(data);
  }

  buildTree(arr) {
    const sortedArr = this.sortArray(arr);
    const uniquArr = this.deleteDupes(sortedArr);
    const n = uniquArr.length;
    const root = this.sortedArrToBST(uniquArr, 0, n - 1);

    return root;
  }

  // sort array
  sortArray(array) {
    array.sort(function (a, b) {
      return a - b;
    });
    return array;
  }

  // delete duplicates
  deleteDupes(array) {
    let uniqueArr = [...new Set(array)];
    return uniqueArr;
  }

  sortedArrToBST(arr, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);
    // [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

    node.left = this.sortedArrToBST(arr, start, mid - 1);
    node.right = this.sortedArrToBST(arr, mid + 1, end);
    return node;
  }

  insert(value) {
    let newNode = new Node(value);

    const searchTree = (node) => {
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left);
        }
      } else if (value > node.value) {
        if (!node.right) {
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      }
    };
    searchTree(this.root);
  }

  delete(root, key) {
    if (root === null) return root;
    // delete a leaf
    if (key < root.key) {
      root.left = this.delete(root.left, key);
    } else if (key > root.key) {
      root.right = this.delete(root.right, key);
    } else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;

      // node with two children: get the inorder successor (smallest in the right subtree)
      root.key = minValue(root.right);

      // Delete the inorder successor
      root.right = this.delete(root.right);
    }
    return root;
    // delete node with one child
    // delete node with two children
    // --find the thing in the tree that is next biggest (right subtree and furthest left in subtree, this replaces with is being deleted)
  }

  minValue(root) {
    let minv = root.key;
    while (root.left != null) {
      minv = root.left.key;
      root = root.left;
    }
    return minv;
  }

  find(value) {
    let currNode = this.root;

    while (currNode) {
      if (value === currNode.value) {
        return true;
      }
      if (value < currNode.value) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }

    return false;
  }

  levelOrder() {}

  dfsInOrder() {}

  dfsPreOrder() {}

  dfsPostOrder() {}

  height() {}

  depth() {}

  isBalanced() {}

  rebalance() {}
}

const testTree = new bst([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(testTree);
// const BST = new bst([]);
// BST.insert(10);
// testTree.insert(15);
// console.log(testTree.root);
// console.log(testTree.find(15));
// testTree.delete(15);
*/
