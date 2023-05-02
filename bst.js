class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

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
      // point new node next pointer to previous node next pointer
      node.next = prev.next;
      // have previous node next pointer point to node
      prev.next = node;
      this.size++;
    }
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

const list = new LinkedList();
console.log("List is empty", list.isEmpty());
console.log("List size", list.getSize());
list.print();

list.insert(10, 0);
list.print();

list.insert(20, 0);
list.print();

list.insert(30, 1);
list.print();

list.insert(40, 2);
list.print();
console.log(list.getSize());
