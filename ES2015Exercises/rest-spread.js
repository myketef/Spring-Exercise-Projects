/* Write an ES2015 Version */
/* Function that takes a variable number of arguments. */
const filterOutOdds = (...args) => args.filter(v => v % 2 === 0)

/* findMin. */
const findMin = (...args) => Math.min(...args)

findMin(121, -18, 112, 32, -12) // -3
findMin(21, 21) // -1
findMin(3, 1) // 1

/* mergeObjects. */
const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 })
mergeObjects({ a: 10, b: 20 }, { c: 30, d: 40 }) // {a:10, b:20, c:30, d:40}

/* doubleAndReturnArgs. */
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(v => v * 2)]
doubleAndReturnArgs([1, 2, 3], 4, 4) // [1,2,3,8,8]
doubleAndReturnArgs([2], 10, 4) // [2, 20, 8]

/* Slide and Dice. */
/* remove a random element in the items array and return a new array without that item. */
const removeRandom = items => {
      let idx = Math.floor(Math.random() * items.length);
      return [...items.slice(0, idx), ...items.slice(idx + 1)];
}

/* Return a new array with every item in array1 and array2. */
const extend = (array1, array2) => {
      return [...array1, ...array2];
}

/* Return a new object with all the keys and values from obj and a new key/value pair */
const addKeyVal = (obj, key, val) => {
      let newObj = { ...obj }
      newObj[key] = val;

      return newObj;
}

/* Return a new object with a key removed. */
const removeKey = (obj, key) => {
      let newObj = { ...obj }
      delete newObj[key]

      return newObj;
}

/* Combine two objects and return a new object. */
const combine = (obj1, obj2) => {
      return { ...obj1, ...obj2 };
}

/* Return a new object with a modified key and value. */
const update = (obj, key, val) => {
      let newObj = { ...obj }
      newObj[key] = val;

      return newObj;
}