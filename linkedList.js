/*

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    // this.prev = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  // 0(n)
  append(value) {
    const node = new ListNode(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      let prev = this.head;
      // traversing to last node. advance previous pointer as long as its next element is not null
      while (prev.next) {
        prev = prev.next;
      }
      // make previous node point to newly created node
      prev.next = node;
    }
    this.size++;
  }

  appendTail(value) {
    const node = new ListNode(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  prependWithTail(value) {
    const node = new ListNode(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  // 0(1)
  prepend(value) {
    const node = new ListNode(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      // this makes the new node's next value point at current head value
      node.next = this.head;
      // this changes the head value to the new node
      this.head = node;
    }
    this.size++;
  }

  insert(value, index) {
    if (index < 0 || index > this.size) return;
    if (index === 0) this.prepend(value);
    else {
      const node = new ListNode(value);
      // temporary value to keep track of previous value
      let prev = this.head;
      // traversing list and advance previous pointer until we reach desired index
      for (let i = 0; i < index - 1; i++) {
        // for loop exits when prev pointer is at previous node
        prev = prev.next;
      }
      // new node next pointer to previous node next pointer
      node.next = prev.next;
      // have previous node next pointer point to node
      prev.next = node;
      this.size++;
    }
  }

  removeFromFront() {
    if (this.isEmpty()) return null;
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    return value;
  }

  removeFromEnd() {
    if (this.isEmpty()) return null;
    const value = this.tail.value;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let prev = this.head;
      while (prev.next !== this.tail) {
        prev = prev.next;
      }
      prev.next = null;
      this.tail = prev;
    }
    this.size--;
    return value;
  }

  removeFrom(index) {
    if (index < 0 || index >= this.size) return null;
    let removeNode;
    if (index === 0) {
      removeNode = this.head;
      this.head = this.head.next;
    } else {
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next;
      }
      removeNode = prev.next;
      prev.next = removeNode.next;
    }
    this.size--;
    return removeNode.value;
  }

  removeValue(value) {
    if (this.isEmpty()) return null;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return value;
    } else {
      let prev = this.head;
      while (prev.next && prev.next.value !== value) {
        prev = prev.next;
      }
      if (prev.next) {
        let removeNode = prev.next;
        prev.next = removeNode.next;
        this.size--;
        return value;
      }
      return null;
    }
  }

  search(value) {
    if (this.isEmpty()) return -1;
    let i = 0;
    let curr = this.head;
    while (curr) {
      if (curr.value === value) {
        return i;
      }
      curr = curr.next;
      i++;
    }
    return -1;
  }

  reverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  print() {
    if (this.isEmpty()) {
      console.log("List is empty");
    } else {
      let curr = this.head;
      let listValues = "";
      while (curr) {
        listValues += `${curr.value} `;
        curr = curr.next;
      }
      console.log(listValues);
    }
  }
}

*/
/////////////////////////Linked List//////////////////////////////////////////////
class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.size = 0;
  }

  append(value) {
    let i = 0;
    // create new node with value
    const node = new Node(value);
    // if the head is empty, have head point to new node
    if (this.head == null) {
      this.head = node;
    } else {
      // point to the previous node and advance pointer to next node if it exists
      let prev = this.head;
      // while prev.next exists(not null), make prev equal to the next node
      while (prev.next) {
        prev = prev.next;
      }
      // when prev.next is null, exit and make prev.next equal to the new node
      prev.next = node;
    }
    this.size++;
  }

  preappend(value) {
    const node = new Node(value);

    if (this.head == null) {
      this.head = node;
    } else {
      let prev = this.head;
      this.head = node;
      this.head.next = prev;
    }
    this.size++;
  }

  size() {
    return this.size;
  }

  head() {
    return this.head;
  }

  tail() {
    if (this.head == null) {
      return console.log("List empty. Please add your data.");
    } else {
      let prev = this.head;
      while (prev.next) {
        prev = prev.next;
      }
    }
  }

  at(index) {
    let count = 0;
    let curr = this.head;
    if (this.head == null) {
      return -1;
    } else {
      while (curr.next) {
        if (count === index) {
          return curr.data;
        } else {
          curr = curr.next;
          count++;
        }
      }
    }
  }

  pop() {
    if (this.head == null) {
      return;
    } else {
      let curr = this.head;
      let prev = null;
      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }
      prev.next = curr.next;
    }
    this.size--;
  }

  contains(value) {
    let curr = this.head;
    if (this.head == null) {
      return -1;
    } else {
      while (curr) {
        if (value === curr.data) {
          return true;
        } else {
          curr = curr.next;
        }
      }
      return false;
    }
  }

  find(value) {
    let count = 0;
    let curr = this.head;
    if (this.head == null) {
      return -1;
    } else {
      while (curr) {
        if (value === curr.data) {
          return count;
        } else {
          curr = curr.next;
          count++;
        }
      }
    }
  }

  toString() {
    let curr = this.head;
    if (this.head == null) {
      return -1;
    } else {
      let listValues = " ";
      while (curr) {
        listValues += `(${curr.data}) -> `;
        curr = curr.next;
      }
      return (listValues += "null");
    }
  }

  ////////////////////////////EXTRA CREDIT//////////////////////////////////
  insertAt(value, index) {}

  removeAt(index) {}
}

class Node {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }
}

const list = new LinkedList();
list.append(4);
list.append(420);
list.append(69);
list.append(100);
list.append(2);
list.preappend(42069);
// console.log(list.at(4));
// console.log(list.contains(2));
// console.log(list.find(2));
// console.log(list);
// console.log(list.toString());
