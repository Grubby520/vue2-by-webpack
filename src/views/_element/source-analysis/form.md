### form

1. form 是一个空壳，所有内容通过 slot 插槽的方式进行填充；
2. 监听 rules，校验规则一旦改变，所有 fields 都会移除校验事件，再重新添加校验事件；同时用一个 prop validateOnRuleChange，来控制是否自动触发校验；

3. fields 数组，收集需要校验的 field 字段；
   通过 $on 监听实例上的自定义事件：
   一个收集依赖，一个移除依赖；

4. form 上暴露的几个方法（这里只能通过 $refs 的方式，通过获取实例，从而调用内部定义的方法）；

resetFields()
clearValidate()
validate()
validateField()

本质上都是调用 field 实例上对应的方法，支持多传一个 cb 回调函数！

5. 亮点，就是把整个实例传给后代组件

```javascript
provide() {
  return {
    elForm: this
  }
}
```

### form-item

1. 通过在顶层 div 上添加与状态相关的样式（is-success, is-error, is-required ...）;
2. 内容还是 slot；
3. error 区域，通过内置组件 transition 包裹，实现简单的 animation；
4. 重点是看主要的prop和方法内部逻辑：

```javascript
provide() {
    return {
      elFormItem: this,
    };
  },

  inject: ["elForm"]
```
通常情况下，form 和 elForm 是同一个值；




### label-wrap
