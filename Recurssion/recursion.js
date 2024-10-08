function product(nums, idx = 0) {
  if (idx === nums.length) return 1

  return nums[idx] * product(nums, idx + 1)
}

function longest(words, idx = 0, longestSoFar = 0) {
  if (idx === words.length) return longestSoFar

  longestSoFar = Math.max(words[idx].length, longestSoFar)

  return longest(words, idx + 1, longestSoFar)
}

function everyOther(str, idx = 0, newStr = "") {
  if (idx >= str.length) return newStr

  newStr += str[idx]

  return everyOther(str, idx + 2, newStr)
}

function isPalindrome(str, idx = 0) {
  let leftIdx = idx
  let rightIdx = str.length - idx - 1
  if (leftIdx >= rightIdx) return true
  if (str[leftIdx] !== str[rightIdx]) return false
  return isPalindrome(str, idx + 1)
}

function findIndex(arr, val, idx = 0) {
  if (idx === arr.length) return -1
  if (arr[idx] === val) return idx
  return findIndex(arr, val, idx + 1)
}

function revString(str, idx = 0, newStr = "") {
  if (newStr.length === str.length) return newStr
  newStr += str[str.length - 1 - idx]
  return revString(str, idx + 1, newStr)
}

function gatherStrings(obj) {
  let stringArr = []
  for (let key in obj) {
    if (typeof obj[key] === "string") stringArr.push(obj[key])
    if (typeof obj[key] === "object") stringArr.push(...gatherStrings(obj[key]))
  }

  return stringArr
}

function binarySearch(arr, val, left = 0, right = arr.length) {
  if (left > right) {
    return -1
  }
  let middle = Math.floor((right + left) / 2)
  if (arr[middle] === val) {
    return middle
  }
  if (arr[middle] > val) {
    return binarySearch(arr, val, left, middle - 1)
  }

  return binarySearch(arr, val, middle + 1, right)
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
}
