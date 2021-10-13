import Vue from "vue";
// 通过使用事件中心，允许组件自由交流，无论组件处于组件树的哪一层。
// 由于 Vue 实例实现了一个事件分发接口，你可以通过实例化一个空的 Vue 实例来实现这个目的。
// $emit, $on, $off 分别完成 分发，监听，取消 事件监听器

// 补充：最初 v1.x 对 $dispatch 和 $broadcast 的升级方案
export const EventBus = new Vue();
