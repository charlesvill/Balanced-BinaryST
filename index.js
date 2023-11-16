import mergeSort from "@charlesvill/merge-sort";


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
  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
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
 const levelOrder = (callbackfn, node = root, queue = []) => {
    if (node.rChild !== null) {
      queue.push(node.rChild);
    }
    if (node.lChild !== null) {
      queue.push(node.lChild);
    }
    if (queue.length > 0) {
      let temp = queue[0];
      queue.shift();
      callbackfn(node.value);
      levelOrder(callbackfn, temp, queue);
    } else {
      // if after checking for children there are no more left and the queue is empty, then probably return
      callbackfn(node.value);
      return;
    }
  };
  const inOrder = (callbackfn, node = root) => {
    if (node === null) {
      return;
    }
    inOrder(callbackfn, node.lChild);
    callbackfn(node.value);
    inOrder(callbackfn, node.rChild);
  };
  const preOrder = (callbackfn, node = root) => {
    if (node === null) {
      return;
    }
    callbackfn(node.value);
    preOrder(callbackfn, node.lChild);
    preOrder(callbackfn, node.rChild);
  };
  const postOrder = (callbackfn, node = root) => {
        if (node === null) {
      return;
    }
    postOrder(callbackfn, node.lChild);
    postOrder(callbackfn, node.rChild);
    callbackfn(node.value);
  };

  const height = (node) => {
    if(node === null){
      console.error("Error: no root found");
      return null;
    }
    let tmpNode = node;
    let lcount = 1;
    let rcount = 1;
    while(tmpNode !== null){
      if(tmpNode.lChild !== null){
        tmpNode = tmpNode.lChild;
        lcount++;
      }else if(tmpNode.rChild !== null){
        tmpNode = tmpNode.rChild;
        lcount++;
      }else if(tmpNode.lChild === null && tmpNode.rChild === null){
        break;
      }
    }
    tmpNode = node;
    while(tmpNode !== null){
      if(tmpNode.rChild !== null){
        tmpNode = tmpNode.rChild;
        rcount++;
      }else if(tmpNode.lChild !== null){
        tmpNode = tmpNode.lChild;
        rcount++;
      }else if(tmpNode.lChild === null && tmpNode.rChild === null){
        break;
      }
    }
    return lcount > rcount ? lcount : rcount;
  }
  const  depth = (node) => {
    let count = 0;
    let tmpNode = root;
    while(tmpNode !== node){
      if(node.value < tmpNode.value){
        tmpNode = tmpNode.lChild;
      } else if(node.value > tmpNode.value){
        tmpNode = tmpNode.rChild;
      } else if(tmpNode.rChild === null && tmpNode.lChild === null){
        console.error("Error: node not found!");
        return null;
      }
      count ++;
    }
    return count;
  }
  const isBalanced = () => {
    const rightH = height(root.rChild);
    const leftH =  height(root.lChild);
    return Math.abs(rightH - leftH) > 1 ? false : true;
  }
  const rebalance = () => {
    let arr = [];
    inOrder(value => arr.push(value));
    buildTree(arr);
  }

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
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
    returnRoot,
  };
};


// driver scripts: 
// first initialize the tree object and build the buildTree

// build random array num < 100 and rebuild the tree
const ranArrayBuilder = (n, range) => {
  let array = [];
  for(let i = 0; i < n; i++){
    array.push(Math.floor(Math.random() * (range + 1)));
    console.log("some shit is going on");
  }
  return array;
}
let ranArray = ranArrayBuilder(30, 100);
const ranTree = tree(ranArray);
ranTree.buildTree();
ranTree.prettyPrint();
console.log(`tree is balanced: ${ranTree.isBalanced()}`);

// print out level, in, pre, and post order
console.log("Level Order traversal: ");
ranTree.levelOrder(value => console.log(value));
console.log("Inorder traversal: ");
ranTree.inOrder(value => console.log(value));
console.log("Preorder traversal: ");
ranTree.preOrder(value => console.log(value));
console.log("Postorder traversal: ");
ranTree.postOrder(value => console.log(value));

// unbalance the tree and print rew tree with balance report
for(let i = 1; i < 15; i++){
  ranTree.insertNode(100 + i);
}
ranTree.prettyPrint();
console.log(`tree is balanced: ${ranTree.isBalanced()}`);

// rebalance the tree and confirm by printing tree, run balance report 
ranTree.rebalance();
ranTree.prettyPrint();
console.log(`tree is balanced: ${ranTree.isBalanced()}`);

// print out all traversals once rebalanced
console.log("Level Order traversal: ");
ranTree.levelOrder(value => console.log(value));
console.log("Inorder traversal: ");
ranTree.inOrder(value => console.log(value));
console.log("Preorder traversal: ");
ranTree.preOrder(value => console.log(value));
console.log("Postorder traversal: ");
ranTree.postOrder(value => console.log(value));
