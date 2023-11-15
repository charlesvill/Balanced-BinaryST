import mergeSort from "@charlesvill/merge-sort";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const node = (value) => {
  const lChild = null;
  const rChild = null;
  return { value, lChild, rChild };
};

// upon initialization of factory tree, arrayPrepper function runs sorting and removing duplicates from array.

const tree = (arr) => {
  let root = null;
  let bstArr = arr;

  const removeDuplicates = (array = arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rChild !== null) {
      prettyPrint(node.rChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.lChild !== null) {
      prettyPrint(node.lChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const buildTree = (array = bstArr, start = 0, end = array.length - 1) => {
    if (start > end) {
      return null;
    }
    const midIndex = Math.floor((start + end) / 2);
    const rootNode = node(array[midIndex]);
    rootNode.lChild = buildTree(array, start, midIndex - 1);
    rootNode.rChild = buildTree(array, midIndex + 1, end);

    root = rootNode;
    return rootNode;
  };
  const findNode = (value, currNode = root, rtn = "node") => {
    // option to return the parent node incase of use for deleting nodes
    let nextNode;
    if (currNode === null) {
      console.error("Error: value not found");
      return null;
    }
    if (value < currNode.value) {
      nextNode = findNode(value, currNode.lChild, rtn);
      if (nextNode === null) {
        return null;
      }
      if (nextNode.value === value) {
        return rtn === "node" ? nextNode : currNode;
      }
    } else if (value > currNode.value) {
      nextNode = findNode(value, currNode.rChild, rtn);
      if (nextNode === null) {
        return null;
      }
      if (nextNode.value === value) {
        return rtn === "node" ? nextNode : currNode;
      }
    } else if (currNode.value === value) {
      return currNode;
    }
    // once final expression evaluated return the nextNode until stack clears
    return nextNode;
  };

  const insertNode = (value, currNode = root) => {
    if (currNode === null) {
      return null;
    }
    if (value < currNode.value) {
      const nextNode = insertNode(value, currNode.lChild);
      if (nextNode === null) {
        const newNode = node(value);
        currNode.lChild = newNode;
      }
    } else if (value > currNode.value) {
      const nextNode = insertNode(value, currNode.rChild);
      if (nextNode === null) {
        const newNode = node(value);
        currNode.rChild = newNode;
      }
    }
  };
  const deleteNode = (value, currNode = root) => {
    // should look for the value recursively and check if it has nodes on the children. for each active node that it does.
    // node will be areference to the child of the parent. so reassigning node will reassign the child node of the parent if
    // it has a parent.

    let oldNode = findNode(value);
    let parentNode = findNode(value, root, "parent");

    // three cases: if no children, if one child, if both children
    if (oldNode.rChild === null && oldNode.lChild === null) {
      if (parentNode !== oldNode) {
        if (parentNode.rChild === oldNode) {
          parentNode.rChild = null;
        } else if (parentNode.lChild === oldNode) {
          parentNode.lChild = null;
        }
      } else {
        root = null;
        return;
      }
      oldNode === null;
    } else if (
      (oldNode.rChild === null && oldNode.lChild !== null) ||
      (oldNode.rChild !== null && oldNode.lChild === null)
    ) {
      // swap the oldNode with the node that has the child
      let child;
      if (oldNode.rChild !== null) {
        child = oldNode.rChild;
      } else {
        child = oldNode.lChild;
      }
      if (parentNode.rChild === oldNode) {
        parentNode.rChild = child;
      } else {
        parentNode.lChild = child;
      }

      oldNode = null;
      return;
    } else if (oldNode.rChild !== null && oldNode.lChild !== null) {
      // assign a temp var for the node and find the min of the right child
      // swap the node with the min and reassign the children of the node to the r & l of the temp.
      let minNode = oldNode.rChild;
      // the above needs to be rafactred to consider which child the the node is in
      while (minNode.lChild !== null) {
        minNode = minNode.lChild;
      }
      minNode.lChild = oldNode.lChild;
      if (parentNode.value < oldNode.value) {
        parentNode.rChild = minNode;
      } else {
        parentNode.lChild = minNode;
      }

      oldNode = null;
      return;
    }
  };
  // below are helper functions
  const returnRoot = () => root;

  const arrayPrepper = () => {
    const uniqueArr = removeDuplicates(arr);
    bstArr = mergeSort(uniqueArr);
  };
  arrayPrepper(arr);

  return {
    buildTree,
    prettyPrint,
    findNode,
    insertNode,
    deleteNode,
    returnRoot,
  };
};

const ex = tree(arr);
ex.buildTree();
ex.deleteNode(4);
ex.prettyPrint(ex.returnRoot());
