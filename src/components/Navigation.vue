<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/saved">Saved</router-link>
  </div>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped>
#nav {
  padding: 5px;
}
#nav a {
  text-decoration: none;
  margin: 10px 5px;
}
a:visited {
  color: inherit;
}
a.router-link-active {
  color: rgb(255, 255, 255);
}
.router-link-exact-active {
  background: rgb(31, 20, 78);
  border-radius: 5px;
  color: red;
  padding: 5px;
}
</style>
