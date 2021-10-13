const formatNumber = {};
formatNumber.install = (Vue) => {
  /**
   * // 根据需求不断扩展
   * value格式：v-="{ type: "integer", includeZero: true, minus: false }"
   *
   * type: 格式化方式，integer（正整数）、decimals（小数）
   * includeZero：type为integer时（可选 包含0），type为decimals时（表示是否自动补位）
   * minus: 是否允许输入负数 (integer)
   */
  Vue.directive("slFormatNumber", {
    bind(el, binding) {
      const validate = {
        init: function (param) {
          switch (param.type) {
            case "integer":
              this.setInteger(param);
              break;
            case "decimals":
              this.setDecimals(param);
              break;
            default:
              console.log("暂不支持此格式化方式");
              break;
          }
        },
        setInteger: function (param) {
          const input$ = el.getElementsByTagName("input")[0];
          const onInput = () => {
            const valuePrev = input$.value;
            // fix 当取最大值和最小值时，valueNext数据类型变成number
            let valueNext = formatInteger(valuePrev, param);
            if (valueNext !== "-") {
              valueNext = compare(param, valueNext);
            }
            if (String(valueNext) !== valuePrev) {
              input$.value = valueNext;
              input$.dispatchEvent(new Event("compositionend"));
              input$.dispatchEvent(new Event("input"));
            }
          };
          const onChange = () => {
            const valuePrev = input$.value;
            let valueNext = formatInteger(valuePrev, param);
            if (valueNext !== "-") {
              valueNext = compare(param, valueNext);
            } else {
              valueNext = "";
            }
            if (String(valueNext) !== valuePrev) {
              input$.value = valueNext;
              input$.dispatchEvent(new Event("compositionend"));
              input$.dispatchEvent(new Event("input"));
            }
          };
          validate.addEvent(input$, ["input"], onInput);
          validate.addEvent(input$, ["change"], onChange);
        },
        setDecimals: function (param) {
          const input$ = el.getElementsByTagName("input")[0];
          const onInput = () => {
            const valuePrev = input$.value;
            const valueNext = compare(
              param,
              decimalsChange(input$.value, param.decimalPlaces || 2)
            );
            if (String(valueNext) !== valuePrev) {
              input$.value = valueNext;
              input$.dispatchEvent(new Event("compositionend"));
              input$.dispatchEvent(new Event("input"));
            }
          };
          const onChange = () => {
            const valuePrev = input$.value;
            const valueNext = compare(
              param,
              decimalsBlur(input$.value, param.includeZero)
            );
            if (String(valueNext) !== valuePrev) {
              input$.value = valueNext;
              input$.dispatchEvent(new Event("compositionend"));
              input$.dispatchEvent(new Event("input"));
            }
          };
          validate.addEvent(input$, ["input"], onInput);
          validate.addEvent(input$, ["change"], onChange);
        },
        addEvent(el, eventName, eventFn) {
          eventName.forEach(() => {
            el.addEventListener(eventName, eventFn);
          });
        },
      };
      validate.init(binding.value);
    },
  });
};

function formatInteger(value, param) {
  const reg = /[^\d]/g;
  const regMinus = /^-/;
  if (param.minus && regMinus.test(value)) {
    value = value.replace(regMinus, "8").replace(reg, "").replace(/^8/, "-");
  } else {
    value = value.replace(reg, "");
  }
  if (value === "-") return value;
  value = parseInt(value);
  value = value ? value : param.includeZero && value === 0 ? value : "";
  return value.toString();
}
function decimalsChange(v, decimalPlaces = 2) {
  v = v.indexOf(".") === 0 ? "0" + v : v;
  let newValue = v.toString();
  let decimalPlacesReg = "^(-)*(\\d+)\\.(";
  for (let index = 0; index < decimalPlaces; index++) {
    decimalPlacesReg += "\\d";
  }
  decimalPlacesReg += ").*$";
  decimalPlacesReg = new RegExp(decimalPlacesReg);
  newValue = v
    .replace(/[^\d.]/g, "")
    .replace(/\.{2,}/g, ".")
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".")
    .replace(decimalPlacesReg, "$1$2.$3")
    .replace(/[-|+]/g, "");
  if (
    newValue.length > 1 &&
    newValue.indexOf(".") !== 1 &&
    newValue.indexOf("0") === 0
  ) {
    newValue = newValue.toString().substring(1);
  }

  return newValue;
}
function decimalsBlur(v, includeZero) {
  let nv = v.replace(/\.$/, "");
  if (!includeZero) {
    return nv;
  } else {
    if (nv.indexOf(".") === -1) {
      return nv + ".00";
    } else {
      return nv.split(".")[1].length === 1 ? nv + "0" : nv;
    }
  }
}
function compare(param, value) {
  let result = value;
  if (!isNull(param.max) && compareMax(value, param.max)) {
    if (param.compareLength) result = generateValue(value, param.max);
    else result = param.max;
  } else if (!isNull(param.min) && compareMin(value, param.min)) {
    result = param.min;
  }
  return result;
}
function generateValue(value, maxValue) {
  const _origin = parseInt(value).toString();
  const maxLength = maxValue.toString().length;
  if (_origin.length > maxLength) {
    return _origin.substr(0, maxLength);
  }
  return _origin;
}
function compareMax(origin, dest) {
  const _origin = parseInt(origin);
  return _origin >= dest;
}
function compareMin(origin, dest) {
  const _origin = parseInt(origin);
  return _origin <= dest;
}
function isNull(val) {
  return val === undefined || val === null;
}

export default formatNumber;
