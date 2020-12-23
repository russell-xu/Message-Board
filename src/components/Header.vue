<template>
  <header>
    <div id="nav">
      <router-link class="router-link" to="/">Home</router-link>
      <router-link class="router-link" to="/management">Management</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  background: #333;
  #nav {
    padding: 30px;
    text-align: center;
    .router-link {
      margin-right: 20px;
      text-decoration: none;
      font-weight: bold;
      color: #fff;
      &:last-child {
        margin-right: 0;
      }
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>