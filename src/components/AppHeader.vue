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
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>
            <img class="animated-img d-lg-none d-md-none d-sm-flex" src="../assets/logo.png" height=50 width=110
                alt="boolbnb logo">
            <div class="collapse navbar-collapse justify-content-between align-content-center" id="navbarSupportedContent">
                <ul class="navbar-nav d-lg-flex d-md-flex d-none">
                    <li>
                        <router-link :to="{ 'name': 'home' }" class="nav-link">
                            <img class="animated-img" src="../assets/logo.png" height=50 width=110 alt="boolbnb logo">
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav gap-md-5">
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'apartments' }" class="nav-link">
                            <span class="animated-span">Appartamenti</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ 'name': 'about' }" class="nav-link">
                            <span class="animated-span">Chi siamo</span>
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="animated-span" :href="store.server + store.admin"><i class="fa-solid fa-user-gear"></i>
                            Area Personale</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>