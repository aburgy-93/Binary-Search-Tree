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
// const BST = new bst([]);
// BST.insert(10);
// testTree.insert(15);
// console.log(testTree.root);
// console.log(testTree.find(15));
// testTree.delete(15);
