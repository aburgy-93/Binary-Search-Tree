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

// const list = new LinkedList();
// console.log("List is empty", list.isEmpty());
// console.log("List size", list.getSize());
// list.print();

// list.appendTail(1);
// list.appendTail(2);
// list.appendTail(3);
// list.prependWithTail(0);
// list.print();
// console.log("List size", list.getSize());

// list.removeFromFront();
// list.removeFromEnd();
// list.print();
