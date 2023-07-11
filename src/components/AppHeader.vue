<script>
import { store } from '../store.js'
export default {
    name: "AppHeader",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li>
                        <router-link :to="{ 'name': 'home' }" class="nav-link">
                            <img src="../assets/logo.png" height=50 alt="boolbnb logo">
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav gap-5">
                    <li class="nav-item px-5">
                        <router-link :to="{ 'name': 'apartments' }" class="nav-link">
                            <span class="">Ricerca Avanzata</span>
                        </router-link>
                    </li>
                    <li class="nav-item px-5">
                        <router-link :to="{ 'name': 'about' }" class="nav-link">
                            <span class="">Chi siamo</span>
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="btn btn-secondary" :href="store.server + store.admin">AREA PERSONALE</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped></style>