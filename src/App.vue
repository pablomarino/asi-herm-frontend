<template>
  <div id="app">
    <NavBar/>

    <main>
      <!-- Where the current route component will be rendered -->
      <router-view></router-view>
    </main>

    <footer>
      <!-- Your footer content -->
    </footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
