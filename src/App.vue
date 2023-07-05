<script>
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router';

export default {
    components: {
    AppHeader,
    RouterView
}
}
</script>

<template>
    <AppHeader />
    <router-view></router-view>
</template>

<style lang="scss">
@use './styles/general.scss';
</style>
