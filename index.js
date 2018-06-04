'use strict';

const TREE_PARENT = 0;
const TREE_NEXT = 1;
const TREE_FIRST = 2;

const tree = (
  parent = 0, nextSibling = 0, firstChild = 0
) => new Uint32Array([parent, nextSibling, firstChild]);

const concat = (a, b) => {
  const c = new a.constructor(a.length + b.length);
  c.set(a);
  c.set(b, a.length);

  return c;
};

const insert = (node, value, parent = 0) => {
  if (!tree.map.size) {
    node[TREE_PARENT] = parent;
    node[TREE_NEXT] = tree.map.size + 2;
    node[TREE_FIRST] = tree.map.size + 1;
    tree.map.set(tree.map.size + 1, value);
  } else {
    const newNode = new Uint32Array([0, 0, 0]);
    newNode[TREE_PARENT] = parent;
    newNode[TREE_NEXT] = tree.map.size + 2;

    if (node[node.length - 3] === newNode[TREE_PARENT])
      for (let i = 0; i < node.length; i += 3) {
        if (node[i] === newNode[TREE_PARENT]) {
          newNode[TREE_FIRST] = node[i + 2];
          break;
        }
      }
    else
      newNode[TREE_FIRST] = tree.map.size + 1;

    tree.map.set(tree.map.size + 1, value);
    return tree.concat(node, newNode);
  }

  return node;
};

const get = (id) =>
  tree.map.get(id);

const searchByObj = (value) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    const string = JSON.stringify(value);
    for (const key of tree.map)
      if (JSON.stringify(key[1]) === string)
        return key[0];
  }
};

const map = new Map();
Object.assign(tree, { map, concat, insert, get, searchByObj });

let root = tree();
root = tree.insert(root, { name: 'n1' });
root = tree.insert(root, { name: 'n2' });
root = tree.insert(root, { name: 'n3' });

root = tree.insert(root, { name: 'n11' }, tree.searchByObj({ name: 'n1' }));
root = tree.insert(root, { name: 'n12' }, tree.searchByObj({ name: 'n1' }));
root = tree.insert(root, { name: 'n13' }, tree.searchByObj({ name: 'n1' }));

root = tree.insert(root, { name: 'n21' }, tree.searchByObj({ name: 'n2' }));
root = tree.insert(root, { name: 'n22' }, tree.searchByObj({ name: 'n2' }));
root = tree.insert(root, { name: 'n23' }, tree.searchByObj({ name: 'n2' }));

root = tree.insert(root, { name: 'n31' }, tree.searchByObj({ name: 'n3' }));
root = tree.insert(root, { name: 'n32' }, tree.searchByObj({ name: 'n3' }));
root = tree.insert(root, { name: 'n33' }, tree.searchByObj({ name: 'n3' }));

console.log('Tree: ');
console.dir({ root });

console.log('Tree elements: ');
console.dir(tree.map);

console.log('Search: ');
const id = tree.searchByObj({ name: 'n11' });
console.dir({ id });

console.log('Get: ');
console.dir(tree.get(id));
