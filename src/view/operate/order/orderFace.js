export function newOrderNumber(vm, type, date) {
  let url = '/order/newOrderNumber';
  let param = {
    type: type,
    dateStr:  vm.formatDate(date, "YYYY-MM-DD")
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
    vm.$set(vm.from, 'number', res.data.data)
    vm.$set(vm.from, 'date', date)
    setOrder(vm);
  })
}

function setOrder(vm, order) {
  if (!order){
    vm.$set(vm.from,'uuid','')
    vm.$set(vm.from,'serialNumber','')
    vm.$set(vm.from,'discount','')
    vm.$set(vm.from,'dutyPerson','')
    vm.$set(vm.from,'remark','')
    vm.tableData = [];
    return
  }
  vm.from = order;
  delete vm.from.type;
  if (vm.from.data) {
    vm.tableData = JSON.parse(vm.from.data)
    delete vm.from.data;
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

  let param = Object.assign({}, vm.from)
  param.type = vm.type;
  param.date = vm.formatDate(param.date, "YYYY-MM-DD");
  param.data = JSON.stringify(vm.tableData);
  vm.$http.post(url, param).then(res => {
    if (!res.data.success) {
      vm.$message({
        showClose: true,
        message: res.data.message,
        type: 'error'
      });
      return
    }

    if (fun) {
      fun(vm);
    }
  })
}
