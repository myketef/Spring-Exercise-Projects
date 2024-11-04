/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;

    function sumHelper(node) {
      let total = node.val;

      // go through all the children for a Node
      for (let child of node.children) {
        // accumulate all values
        total += sumHelper(child); // Recursively sum values of the children
      }
      return total; // Return the accumulated total
    }
    return sumHelper(this.root); // Start recursion with the root node
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    function countEvensHelper(node) {
      let count = this.root.val % 2 === 0 ? 1 : 0; // Start with the current node

      // go through all the children for a Node
      for (let child of node.children) {
        count += countEvensHelper(child); // Recursively count even values of in children
      }
      return count; // Return the accumulated count
    }
    return countEvensHelper(this.root); // Start recursion with the root node
  }


  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    function countEvensHelper(node) {
      let count = node.val > lowerBound ? 1 : 0; // Start with the current node

      // go through all the children for a Node
      for (let child of node.children) {
        count += countEvensHelper(child);
      }
      return count;
    }
    return countEvensHelper(this.root);
  }
}

module.exports = { Tree, TreeNode };
