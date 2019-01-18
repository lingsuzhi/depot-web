function rowToTreeitem(item) {
  return {
    label: item.name,
    id: item.uuid,
    parentId: item.parentId,
    children: []
  }
}

function dataToTree(data) {
  let arr = [];

  if (!data) {
    return arr;
  }

  let diguiTree = function (arr, pid, data) {

    for (let item of data) {

      if (item.parentId == pid || (pid==undefined && item.parentId=='')) {
        let tree = rowToTreeitem(item);
        arr.push(tree);
        diguiTree(tree.children, tree.id, data);
      }
    }
  }
  diguiTree(arr, undefined, data);
  return arr;
}

function treeToRows(rows) {
  let data =dataToTree(rows);
  let diguiTree = function (arr, index, data) {
    for (let item of data) {

      let tree = {
        id: item.id
        , index: index
      }
      arr.push(tree);
      diguiTree(arr, index + 1, item.children);

    }
  }
  let arr = [];
  diguiTree(arr, 1, data);
  return arr;
}

export {
  dataToTree,treeToRows
}
