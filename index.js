'use strict';

const TREE_PARENT = 0;
const TREE_NEXT = 1;
const TREE_FIRST = 2;

const tree = (
  parent = null, nextSibling = null, firstChild = null
) => new Uint32Array([parent, nextSibling, firstChild]);

const concat = (a, b) => {
  const c = new a.constructor(a.length + b.length);
  c.set(a);
  c.set(b, a.length);

  return c;
};

const insert = (node, value, parent = null) => {
  if (!tree.map.size) {
    node[TREE_PARENT] = parent;
    node[TREE_NEXT] = tree.map.size + 2;
    node[TREE_FIRST] = tree.map.size + 1;
    tree.map.set(tree.map.size + 1, value);
  } else {
    const newNode = new Uint32Array([null, null, null]);
    newNode[TREE_PARENT] = parent;
    newNode[TREE_NEXT] = tree.map.size + 2;
    for (let i = 0; i < node.length; i += 3) {
      if (node[i] === newNode[TREE_PARENT]) {
        newNode[TREE_FIRST] = node[i + 2];
        break;
      }
    }

    tree.map.set(tree.map.size + 1, value);
    return tree.concat(node, newNode);
  }

  return node;
};

const map = new Map();
Object.assign(tree, { map, concat, insert });

let root = tree();
root = tree.insert(root, { name: 'n1' });
root = tree.insert(root, { name: 'n2' });
root = tree.insert(root, { name: 'n3' });

console.log(root);
console.log(tree.map);
