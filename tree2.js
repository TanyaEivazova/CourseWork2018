'use strict';

const insert = (root, key, value) => root[key] = value;
const search = (root, key) => {
  for (let key1 in root)
    if (key === key1) 
      return root[key];
    else
      if (root[key1] !== undefined) {
        let a = tree.search(root[key1], key);
        if (a !== undefined)
          return a;
      }
};

const forEach = (node, callback) => {
  for (let i = 0; i < node.length; i++)
    callback(node[i], i, node);  
};

const tree = (value = null) => new Int8Array([value]);
Object.assign(tree, { insert, search, forEach });

const root = tree();
tree.insert(root, 'n1', new Int8Array([1]));
tree.insert(root, 'n2', new Int8Array([2]));
tree.insert(root, 'n3', new Int8Array([3]));

tree.insert(root.n1, 'n11', new Int8Array([1, 1]));
tree.insert(root.n1, 'n12', new Int8Array([1, 2]));
tree.insert(root.n1, 'n13', new Int8Array([1, 3]));

tree.insert(root.n2, 'n21', new Int8Array([2, 1]));
tree.insert(root.n2, 'n22', new Int8Array([2, 2]));
tree.insert(root.n2, 'n23', new Int8Array([2, 3]));

tree.insert(root.n3, 'n31', new Int8Array([3, 1]));
tree.insert(root.n3, 'n32', new Int8Array([3, 2]));
tree.insert(root.n3, 'n33', new Int8Array([3, 3]));

console.log('Tree: ');
console.log(root);
console.log();
console.log('n1 node: ');
console.log(tree.search(root, 'n1'));
console.log();
console.log('forEach n11: ');
tree.forEach(tree.search(root, 'n11'), (el) => console.log(el));
