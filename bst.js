class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
    this.count = 1;
  }

  buildTree(arr) {
    const uniqArr = [...new Set(arr)];
    const n = uniqArr.length;
    const uniqSrtArr = this.mergeSort(uniqArr);
    const root = this.sortedArrToBTS(uniqSrtArr, 0, n - 1);
    return root;
  }

  mergeSort(arr) {
    if (arr.length < 2) {
      return arr;
    } else {
      const mid = Math.floor(arr.length / 2);
      const leftArr = arr.slice(0, mid);
      const rightArr = arr.slice(mid);
      return merge(this.mergeSort(leftArr), this.mergeSort(rightArr));
    }
  }

  // need to remove duplicates either in merge or mergeSort
  merge(leftArr, rightArr) {
    const sortedArr = [];
    while (leftArr.length && rightArr.length) {
      if (leftArr[0] <= rightArr[0]) {
        sortedArr.push(leftArr.shift());
      } else {
        sortedArr.push(rightArr.shift());
      }
    }

    const srtArr = [...sortedArr, ...leftArr, ...rightArr];
    return srtArr;
  }

  sortedArrToBTS(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.sortedArrToBTS(arr, start, mid - 1);
    node.right = this.sortedArrToBTS(arr, mid + 1, end);
    return node;
  }

  find(value) {
    let currNode = this.root;
    // if value == root, return root
    while (currNode) {
      if (currNode.data === null || currNode.data === value) {
        return true;
      }
      if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
    return false;
  }

  insert(value) {
    this.count++;

    let newNode = new Node(value);

    const searchTree = function (node) {
      // compare new node with current node, if less, go left
      if (value < node.data) {
        // if no left child, append node
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left);
        }
      } else if (value > node.data) {
        // if no right child, append node
        if (!node.right) {
          // append node
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      }
    };
    searchTree(this.root);
  }

  min(root) {
    if (!root.left) {
      return root.data;
    } else {
      return this.min(root.left);
    }
  }

  max(root) {
    if (!root.right) {
      return root.data;
    } else {
      return this.min(root.right);
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // leaf node, no child nodes
      if (!root.left && !root.right) {
        return null;
      }
      // parent node has one child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // With two child nodes
      // copy value of inorder successor
      root.data = this.min(root.right);
      // delete inorder succesor
      root.right = this.deleteNode(root.right, root.data);
    }
    return root;
  }

  levelOrder() {
    let result = [];
    let queue = [];
    if (this.root == null) return;

    // push the root into the queue
    queue.push(this.root);

    while (queue.length) {
      let currNode = queue.shift();
      result.push(currNode.data);

      if (currNode.left) {
        queue.push(currNode.left);
      }
      if (currNode.right) {
        queue.push(currNode.right);
      }
    }
    // contunue until all nodes have been visited [F, D, J, B, E, G, K, A, C, I, H]
    return result;
  }

  preOrder(node) {
    if (node == null) return;

    console.log(node.data);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  postOrder(node) {
    if (node == null) return;

    this.postOrder(node.left);
    this.postOrder(node.right);
    console.log(node.data);
  }

  inOrder(node) {
    if (node == null) return;

    this.inOrder(node.left);
    console.log(node.data);
    this.inOrder(node.right);
  }

  depth(node) {
    if (node == null) return 0;

    let leftTDepth = this.depth(node.left);
    let rightTDepth = this.depth(node.left);
    if (leftTDepth > rightTDepth) {
      return leftTDepth + 1;
    } else {
      return rightTDepth + 1;
    }
  }

  height(node) {
    if (node == null) return 0;
    let height = 0;

    let q = [];

    q.push(node);
    q.push(null);
    while (q.length > 0) {
      let temp = q.shift();

      if (temp == null) {
        height += 1;
      }

      if (temp != null) {
        if (temp.left) {
          q.push(temp.left);
        }
        if (temp.right) {
          q.push(temp.right);
        }
      } else if (q.length > 0) {
        q.push(null);
      }
    }
    return height;
  }

  isBalanced(node) {
    // check absolute difference between heights of left and right subtrees at any node < 1
    // for each node, its left subtree shoud be a balanced binary tree
    // for each node, its right subtree shoud be a balnaced binary tree
    if (node == null) return true;
    // check left subtree
    let leftSubtreeHeight = this.height(node.left);
    // check right subtree
    let rightSubtreeHeight = this.height(node.right);

    // check absolute heights of left/right subtrees, if greater than 1 return -1
    if (
      Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1 &&
      this.isBalanced(node.left) == true &&
      this.isBalanced(node.right) == true
    ) {
      return true;
    }
    return false;
  }

  rebalance(root) {
    let arr = [];
    this.balancedInOrder(root, arr);
    this.root = this.buildBalancedTree(arr);
  }

  balancedInOrder(root, arr) {
    if (root == null) return;

    this.balancedInOrder(root.left, arr);
    arr.push(root.data);
    this.balancedInOrder(root.right, arr);
  }

  buildBalancedTree(arr) {
    if (arr.length == 0) return null;

    let mid = Math.floor(arr.length / 2);
    let head = new Node(arr[mid]);

    let left = arr.slice(0, mid);
    let right = arr.slice(mid + 1);

    head.left = this.buildBalancedTree(left);
    head.right = this.buildBalancedTree(right);

    return head;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
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
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const randomArray = function (num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push(Math.round(Math.random() * 100 + 1));
  }

  return arr;
};

const testTree = new Tree(randomArray(100));
console.log(testTree);
console.log(testTree.isBalanced());
testTree.preOrder(testTree.root);
testTree.postOrder(testTree.root);
testTree.inOrder(testTree.root);
testTree.insert(420);
testTree.insert(500);
testTree.insert(102);
testTree.insert(320);
testTree.insert(301);
testTree.insert(302);
testTree.insert(303);
testTree.insert(304);
testTree.insert(305);
testTree.insert(306);
testTree.prettyPrint();
console.log(testTree.isBalanced(testTree.root));
testTree.rebalance(testTree.root);
console.log(testTree.isBalanced(testTree.root));
testTree.prettyPrint();
