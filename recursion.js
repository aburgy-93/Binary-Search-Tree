function sum(n) {
  if (n == 1) {
    return 1;
  } else {
    return n + sum(n - 1);
  }
}

// console.log(sum(3));

function power(n, m) {
  if (m === 0) {
    return 1;
  } else {
    return n * power(n, m - 1);
  }
}
// console.log(power(2, 4));

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

// console.log(factorial(5));

function fibIt(num) {
  const arr = [];
}

function fib(num) {
  if (num < 2) {
    return num;
  } else {
    return fib(num - 1) + fib(num - 2);
  }
}
// console.log(fib(8));

function productOfArray(arr) {
  if (arr.length == 0) {
    return 1;
  } else {
    return arr[0] * productOfArray(arr.slice(1));
  }
}

var six = productOfArray([1, 2, 3]);
var sixty = productOfArray([1, 2, 3, 10]);
// console.log(six, sixty);

function contains(obj, value) {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      return contains(obj[key], value);
    }
    if (obj[key] === value) {
      return true;
    }
  }
  return false;
}

var nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: "foo2",
          },
        },
      },
    },
  },
};

let hasIt = contains(nestedObject, 44); // true
let doesntHaveIt = contains(nestedObject, "foo");
// console.log(hasIt, doesntHaveIt);

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);
    return merge(mergeSort(leftArr), mergeSort(rightArr));
  }
}

function merge(leftArr, rightArr) {
  const sortedArr = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr.shift());
    } else {
      sortedArr.push(rightArr.shift());
    }
  }
  return [...sortedArr, ...leftArr, ...rightArr];
}

const arr = [8, 20, -2, 4, -6];
// console.log(mergeSort(arr));
