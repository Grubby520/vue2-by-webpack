function moneyFormatter(num) {
  num = +num;
  if (!isNaN(num)) {
    let [int, dec] = num.toString().split(".");
    const reg = /(-?\d+)(\d{3})/g;
    while (reg.test(int)) {
      int = int.replace(reg, "$1,$2");
    }
    return dec ? [int, dec].join(".") : int;
  } else {
    return "-";
  }
}

export default {
  install(Vue) {
    Vue.filter("SlMoneyFormatter", moneyFormatter);
  },
};
