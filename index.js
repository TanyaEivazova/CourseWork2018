'use strict';

const insert = (root, key, value) => {
  root[key] = value;
};

const tree = (value = null) => new Int8Array([value]);
Object.assign(tree, { insert });

const root = tree();
tree.insert(root, 'n1', new Int8Array([1]));
tree.insert(root, 'n2', new Int8Array([2]));
tree.insert(root, 'n3', new Int8Array([3]));

tree.insert(root.n1, 'n1', new Int8Array([1, 1]));
tree.insert(root.n1, 'n2', new Int8Array([1, 2]));
tree.insert(root.n1, 'n3', new Int8Array([1, 3]));

console.log(root);
