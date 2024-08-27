# Section 14 Exercises

## 14.2 let and const Exercise

```javascript
var PI = 3.14; // ES5 version
const PI = 3.14; // ES2015 version
```

1. What is the difference between var and let?

- var has function-level scope. It is available throughout the entire function it's declared in.
- let has block-level scope. It's only accessible within the block (like an if statement, for loop, or a pair of curly braces) where it's declared.

2. What is the difference between var and const?

- var variables can be reassigned new values after they are declared.
- const variables cannot be reassigned once a value is given to them. Their value remains constant throughout the code.

3. What is the difference between let and const?

- let variables can be reassigned new values after they are declared.
- const variables cannot be reassigned once a value is given to them. Their value remains constant throughout the code.

4. What is hoisting?

- Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their scope during the compilation phase. This means you can use a variable or function before it's declared in your code. However, the value of a var variable is undefined before it's assigned, while let and const variables are not initialized until their declaration. It's important to note that only variable and function declarations are hoisted, not their assignments or initializations.

## 14.3 Arrow Funciton Exercises

First exercise:

```javascript
const double = (arr) => arr.map((val) => val * 2);
```

Second exercise:

```javascript
const squareAndFindEvens = (numbers) => {
  const squares = numbers.map((num) => num ** 2);
  const evens = squares.filter((square) => square % 2 === 0);
  return evens;
};
```

Shorter version:

```javascript
const squareAndFindEvens = (numbers) =>
  numbers.map((num) => num ** 2).filter((square) => square % 2 === 0);
```

## 14.4 Rest and Spread Exercises

See rest-spread.js script file in this repository

## 14.5 Object Enhancements

Same keys and values:

```javascript
function createInstructor(firstName, lastName) {
  return {
    firstName,
    lastName,
  };
}
```

Computed property names:

```javascript
const instructor = {
    firstname: "Colt',
    [favoriteNumber]: "That is my favorite!"
}
```

Object methods:

```javascript
var instructor = {
  firstName: "Colt",
  sayHi() {
    return "Hi!";
  },
  sayBye() {
    return this.firstName + " says bye!";
  },
};
```

createAnimal function

```javascript
function createAnimal(species, verb, noise) {
  return {
    species,
    [verb]() {
      console.log(noise);
    },
  };
}
```

## 14.6 Destructuring

- Object Destructuring 1
  - 8
  - 1846
- Object Destructuring 2
  - { yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659 }
- Object Destructuring 3
  - "Your name is Alejandro and you like purple"
  - "Your name is Melissa and you like green"
  - "Your name is undefined and you like green"
- Array Destructuring 1
  - "Maya"
  - "Marissa"
  - "Chi"
- Array Destructuring 2
  - "Raindrops on roses"
  - "whiskers on kittens"
  - \["Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings" \]
- Array Destructuring 3
  - \[10, 30, 20 \]
- ES2015 Object Destructuring

```javascript
const obj = {
  numbers: {
    a: 1,
    b: 2,
  },
};

const { a, b } = obj.numbers;
```

- ES2015 One-line Array Swap

```javascript
let arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]];
```

- Race Results Function

```javascript
const raceResults = ([first, second, third, ...rest]) => ({
  first,
  second,
  third,
  rest,
});
```

## 14.7 Maps and Sets

- Quick Question 1
  - Set(4) \[1,2,3,4 \]
- Quick Question 2
  - 'ref'
- Quick Question 3
  - Map(2) {\[1,2,3] => true, \[1,2,3] => false}
- Has Duplicate

```javascript
const hasDuplicate = (arr) => new Set(arr).size !== arr.length;
```

- Vowel Count

```javascript
function vowelCount(str) {
  const vowelMap = new Map();

  for (let char of str) {
    let lowerCaseChar = char.toLowerCase();

    if (isVowel(lowerCaseChar)) {
      if (vowelMap.has(lowerCaseChar)) {
        vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1);
      } else {
        vowelMap.set(lowerCaseChar, 1);
      }
    }
  }
  return vowelMap;
}
```
