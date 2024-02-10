<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { RouterView } from "vue-router";

export default {
  components: {
    AppHeader,
    RouterView,
    AppFooter,
  },
};
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<style lang="scss">
@use "./styles/general.scss";
body::-webkit-scrollbar {
  display: none;
}
</style>
