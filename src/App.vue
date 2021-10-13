<template>
  <div id="app">
    <div class="flex">
      <div id="nav">
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li>
            <router-link to="/lifecycle">Lifecycle</router-link>
          </li>
          <li>
            <router-link to="/slot">Slot</router-link>
          </li>
          <li>
            <router-link to="/boundary">Boundary</router-link>
          </li>
          <li>
            <router-link to="/nestRouter">NestRouter</router-link>
          </li>
          <li>
            <router-link to="/unitTest">UnitTest</router-link>
          </li>
          <li>
            <router-link to="/reactive">Reactive</router-link>
          </li>
          <li>
            <router-link to="/elementUi">elementUi</router-link>
          </li>
          <li>
            <router-link to="/sl-ui">sl-ui</router-link>
          </li>
        </ul>
      </div>
      <div id="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./common.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  min-height: 100vh;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.flex {
  display: flex;
  #nav {
    width: 250px;
    padding-right: 10px;
    border-right: 1px darkolivegreen dotted;
  }
  #container {
    padding: 15px;
    width: 100%;
  }
}
</style>
