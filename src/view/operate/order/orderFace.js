export function newOrderNumber(vm, type, date) {
  let url = '/order/newOrderNumber';
  let param = {
    type: type,
    dateStr: vm.formatDate(date, "YYYY-MM-DD")
  };
  vm.$http.get(url, {params: param}).then(res => {
    if (!res.data.success) {
      vm.$message({
        showClose: true,
        message: res.data.message,
        type: 'error'
      });
      return
    }
    setOrder(vm);
    vm.$set(vm.from, 'uuid', res.data.data);
    vm.$set(vm.from, 'date', date);
  })
}

export function delOrder(vm) {
  let url = '/order/delByUuid';
  let param = {
    uuid: vm.from.uuid,
  };

  vm.$confirm('是否确认删除单据:' + param.uuid + '吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {

    vm.$http.get(url, {params: param}).then(res => {
      if (!res.data.success) {
        vm.$message({
          showClose: true,
          message: res.data.message,
          type: 'error'
        });
        return
      }

      let b = moveOrder(vm, 'leftOrder');
      b.then(function (e) {
        if (e !== true) {
          b = moveOrder(vm, 'rightOrder');
        }
      }).catch(function () {
          console.log("catch")
        }
      )

    }).catch(() => {

    });
  })
}

export async function moveOrder(vm, type) {
  let url = '/order/' + type;
  let param = {
    uuid: vm.from.uuid,
  };
  try {
    let res = await  vm.$http.get(url, {params: param});
    if (!res.data.success) {
      vm.$message({
        showClose: true,
        message: res.data.message,
        type: 'error'
      });
      return
    }

    if (res.data.data) {
      setOrder(vm, res.data.data);
      return true;
    } else {
      //没数据的情况
      vm.$message({
        showClose: true,
        message: "没有找到数据",
        type: 'info'
      });
    }
  } catch (err) {
    console.log(err);
  }


}

function setOrder(vm, order) {
  if (!order) {
    vm.$set(vm.from, 'uuid', '');
    vm.$set(vm.from, 'serialNumber', '');
    vm.$set(vm.from, 'discount', '');
    vm.$set(vm.from, 'dutyPerson', '');
    vm.$set(vm.from, 'remark', '');
    vm.tableData = [];
  } else {
    vm.from = order;
    delete vm.from.type;
    if (vm.from.data) {
      vm.tableData = JSON.parse(vm.from.data);
      delete vm.from.data;
    }
  }

}

export function findByDayMax(vm, type, date) {
  let url = '/order/findByDayMax';
  let param = {
    type: type,
    dateStr: vm.formatDate(date, "YYYY-MM-DD")
  };
  vm.$http.get(url, {params: param}).then(res => {
    if (!res.data.success) {
      vm.$message({
        showClose: true,
        message: res.data.message,
        type: 'error'
      });
      return
    }
    setOrder(vm, res.data.data)
  })
}

export function saveOrder(vm, fun) {

  let url = '/order/save';

  let param = Object.assign({}, vm.from);
  param.type = vm.type;
  param.date = vm.formatDate(param.date, "YYYY-MM-DD");
  param.data = JSON.stringify(vm.tableData);
  vm.frmLoadding = true;
  vm.$http.post(url, param).then(res => {
    vm.frmLoadding = false;
    if (!res.data.success) {
      vm.$message({
        showClose: true,
        message: res.data.message,
        type: 'error'
      });
      return
    }
    vm.from.uuid = res.data.data;
    if (fun) {
      fun(vm);
    }
  }).catch(() => vm.frmLoadding = false)
}
